import { db } from '../db.js'

//เพิ่มสินค้า
export const addProduct = async (req, res) => {
    const { product_name, description, product_price,
        stock_qty_product, category_id, status, createBy } = req.body
    try {
        await db.beginTransaction()

        //รับรูป
        const product_image = `/uploads/${req.file.filename}`

        //เช็คก่อน insert
        const [checkProduct] = await db.query(
            `select * from Product where product_name = ?`
            , [product_name]
        )

        if (checkProduct[0]) {
            return res.status(401).json({ message: "มีสินค้านี้ในระบบแล้ว" })
        }

        //insert to product
        const [result] = await db.query(
            `insert into Product
            (product_name,description,product_price,stock_qty_product,category_id,status,product_image,createBy,add_dateTime) 
                values (?,?,?,?,?,?,?,?,now())`
            , [product_name, description, product_price, stock_qty_product, category_id, status, product_image, createBy]
        )

        const product_id = result.insertId


        const accessories = req.body.accessories_name
        let accessories_name = []

        if (accessories) {
            accessories_name = accessories.split(",").map((item) => item.trim())
        }
        console.log(accessories_name)

        if (accessories_name.length > 0) {
            const values = accessories_name.map(name => [product_id, name]);
            await db.query(
                `INSERT INTO Product_Accessories (product_id, accessories_name)
                VALUES ?`,
                [values]
            )
        }

        await db.commit()
        res.status(201).json({ message: "เพิ่มสินค้าเรียบร้อย" })
    } catch (err) {
        await db.rollback()
        res.status(500).json({ message: "server error" })
    }
}

//โชว์สินค้าทั้งหมด
export const listProduct = async (req, res) => {
    try {
        const [product] = await db.query(
            `SELECT 
                p.product_id,
                p.product_name,
                p.description,
                p.product_price,
                p.stock_qty_product,
                p.status,
                p.product_image,
                c.category_name,
                c.category_id,
                GROUP_CONCAT(pa.accessories_name SEPARATOR ',') as accessories
            FROM Product p
            JOIN Category c ON p.category_id = c.category_id
            LEFT JOIN Product_Accessories pa ON p.product_id = pa.product_id
            GROUP BY p.product_id`
        )
        res.status(201).json({ product: product })

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//โชว์สินค้าตามประเภทของสินค้า ไว้ใช้ในหน้า menu
export const searchProduct = async (req, res) => {
    const { id } = req.params
    try {
        //console.log(selectCategory)
        if (id === "All") {
            const [result] = await db.query(
                `SELECT 
                    p.product_id, p.product_name, p.description, p.product_price,
                    p.stock_qty_product, p.status, p.product_image, p.category_id ,p.status,
                    GROUP_CONCAT(ps.accessories_name SEPARATOR ',') AS accessories
                FROM Product p
                LEFT JOIN Product_Accessories ps ON p.product_id = ps.product_id
                WHERE p.status = 'IsActive'
                GROUP BY p.product_id`
            )
            res.status(201).json({ product: result })
        } else {
            const [result] = await db.query(
                `SELECT 
                    p.product_id, p.product_name, p.description, p.product_price,
                    p.stock_qty_product, p.status, p.product_image, p.category_id ,p.status,
                    GROUP_CONCAT(ps.accessories_name SEPARATOR ',') AS accessories
                FROM Product p
                LEFT JOIN Product_Accessories ps ON p.product_id = ps.product_id
                WHERE p.category_id = ? AND p.status = 'IsActive'
                GROUP BY p.product_id`
                , [id]
            )
            res.status(201).json({ product: result })
        }

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }

}


// edit product
export const editProduct = async (req, res) => {
    const { product_id, product_name, description, product_price,
        stock_qty_product, status, category_id, employee_id
    } = req.body

    try {
        await db.beginTransaction()
        //ดึงข้อมูลเดิม
        const [result] = await db.query(
            `
            select 
                p.product_id,
                p.product_name,
                p.description,
                p.product_price,
                p.stock_qty_product,
                p.status,
                p.product_image,
                p.category_id,
                GROUP_CONCAT(pa.accessories_name SEPARATOR ',') as accessories
            from Product p
            left join Product_Accessories pa on p.product_id = pa.product_id
            where p.product_id = ?
            `, [product_id]
        )

        const old = result[0]
        let product_image = old.product_image
        if (req.file) {
            product_image = `/uploads/${req.file.filename} `
        }

        //insert to history
        await db.query(
            `
            insert into History_edit_product

            (product_name, description, product_price, stock_qty_product, status, product_image, 
            category_id, accessories_name, product_id, editBy, edit_dateTime) 

            values (?,?,?,?,?,?,?,?,?,?, now())
            `
            ,[old.product_name, old.description, old.product_price, old.stock_qty_product, old.status, old.product_image,
            old.category_id, old.accessories, old.product_id, employee_id]
        )

        //access ที่รับมา
        const accessories = req.body.accessories_name
        let accessories_name = []

        if (accessories) {
            accessories_name = accessories.split(",").map((item) => item.trim())
        }
        //console.log(accessories_name)

        //ลบ product_access เดิมออก
        await db.query(
            `delete from Product_Accessories where product_id = ?`, [product_id]
        )
        //insert อันใหม่
        if(accessories_name.length > 0){
            for(const access of accessories_name){
                await db.query(
                    `insert into Product_Accessories
                    (product_id , accessories_name) values (?,?)`,[product_id, access]
                )
            }
        }


        //update product
        await db.query(
            `
            update Product
            set
                product_name = ? , description = ? , product_price = ?,
                stock_qty_product = ? , status = ? , product_image = ?,
                category_id = ?
            where product_id = ?
            `,[product_name, description, product_price, stock_qty_product, status, product_image, category_id, product_id]
        )


        await db.commit()
        res.status(201).json({ message: "แก้ไขข้อมูลสินค้าเรียบร้อย" })
    } catch (err) {
        await db.rollback()
        console.log(err)
        res.status(500).json({ message: "server error" })
    }

}