import { db } from '../db.js'

//customer
//ลูกค้าสั่งซื้อ
export const addOrder = async (req, res) => {
    try {
        const { customer_id, address_id, cart, accessories } = req.body

        await db.beginTransaction()

        if (cart.length === 0) {
            return res.status(400).json({ message: "ไม่พบสินค้าในตะกร้า" })
        }

        //insert to Order
        const [order] = await db.query(
            `insert into Orders
            (order_status , payment_dateTime, customer_id,create_dateTime,address_id) 
            values ("Pending",now(),?,now(),?)
            `, [customer_id, address_id]
        )

        const order_id = order.insertId

        const order_product = cart.map((item) => [
            order_id,
            item.product_id,
            item.quantity,
            item.unit_price,
        ])
        console.log("order_product : ", order_product)

        //insert order_product
        if (order_product.length > 0) {
            await db.query(
                `insert into Order_Product
                (order_id , product_id , order_product_qty, unit_price)
                values ?
                `, [order_product]
            )
        }

        const order_accessories = accessories.map((acc) => [
            order_id,
            acc.name,
            acc.qty
        ])


        //insert to order_accessories
        if (order_accessories.length > 0) {
            await db.query(
                `insert into Order_Accessories
                (order_id , accessories_name , order_access_qty)
                values ?
                ` , [order_accessories]
            )
        }


        //ตัด stock product
        for (const product of cart) {
            const [result] = await db.query(
                `
                update Product
                set stock_qty_product = stock_qty_product - ?
                where product_id = ? and stock_qty_product >= ?
                `
                , [product.quantity, product.product_id, product.quantity]
            )

            if (result.affectedRows === 0) {
                throw new Error(`Product ${product.product_name} สต็อกไม่เพียงพอ`)
            }

            const [checkStockProduct] = await db.query(
                `
                select stock_qty_product
                from Product
                where product_id = ?
                `, [product.product_id]
            )

            if (checkStockProduct.length > 0 && checkStockProduct[0].stock_qty_product === 0) {
                await db.query(
                    `
                    update Product
                    set status = "InActive"
                    where product_id = ?
                    `, [product.product_id]
                )
            }
        }

        //ตัด  stock accessories
        for (const [order_id, name, qty] of order_accessories) {

            const [result] = await db.query(
                `
                update Accessories
                set stock_qty_accessories = stock_qty_accessories - ?
                where accessories_name = ? and stock_qty_accessories >= ?
                `
                , [qty, name, qty]
            )

            if (result.affectedRows === 0) {
                throw new Error(`Accessories ${name} สต็อกไม่เพียงพอ`)
            }
        }

        await db.commit()
        res.status(201).json({ message: "สั่งซื้อสินค้าเรียบร้อย" })

    } catch (err) {
        await db.rollback()
        res.status(500).json({ message: "server error" })
    }
}

//โชว์ order ตาม customer_id
export const listOrders = async (req, res) => {
    const { customer_id } = req.body
    try {
        const [orders] = await db.query(
            `SELECT  
                o.order_id,o.order_status,o.create_dateTime,ad.address_id,ad.house_no,
                ad.sub_district,ad.district,ad.province,ad.zip_code,ad.phone,
                ot.sub_total,
	            o.delivery_cost,
                ROUND(ot.sub_total * 0.07, 2) AS vat_amount,
                ROUND(ot.sub_total + ot.sub_total * 0.07 + o.delivery_cost, 2) AS total_amount
            FROM Orders o
            JOIN Address_Delivery ad ON o.address_id = ad.address_id
            JOIN (
                SELECT 
                    order_id,
                    SUM(order_product_qty * unit_price) AS sub_total
                FROM Order_Product
                GROUP BY order_id
            ) AS ot ON o.order_id = ot.order_id

            WHERE o.customer_id = ?
            ORDER BY o.order_status ASC;
            `, [customer_id]
        )

        res.status(201).json({ orders: orders })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//customer เลือกดูรายละเอียดแต่ละ order ที่สั่ง
export const getOrderById = async (req, res) => {
    const { order_id } = req.params
    try {

        //ดึง product
        const [products] = await db.query(
            `
            select
	            o.order_id ,
                op.product_id ,op.order_product_qty,
                (op.order_product_qty * op.unit_price) as line_total,
                p.product_name, p.product_image
            from Orders o
            join Order_Product op on o.order_id = op.order_id
            join Product p on op.product_id = p.product_id
            where o.order_id = ?
            `, [order_id]
        )

        //ดึง accessories
        const [accessories] = await db.query(
            `
            select 
                o.order_id , oa.accessories_name , oa.order_access_qty
            from Orders o 
            join Order_Accessories oa on o.order_id = oa.order_id
            where o.order_id = ?
            `, [order_id]
        )

        //ดึง customer and address
        const [customer] = await db.query(
            `
            select 
                concat(c.first_name," ", c.last_name) as full_name,
                ad.house_no,
                ad.sub_district,
                ad.district,
                ad.province,
                ad.zip_code,
                ad.phone
            from orders o
            join customer c on o.customer_id = c.customer_id
            join Address_Delivery ad on o.address_id = ad.address_id
            where o.order_id = ?
            `, [order_id]
        )

        //ดึง rider
        const [rider] = await db.query(
            `
            select 
	            concat (e.first_name," ",e.last_name) as full_name,
                e.position
            from Orders o
            join Employee e on o.deliveryBy = e.employee_id
            where order_id = ?
            `,[order_id]
        )

        res.status(201).json({
            products: products, accessories: accessories, customer: customer , rider:rider
        })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//customer ยกเลิก order
export const requestedCancel = async (req, res) => {
    const { order_id } = req.body

    try {
        await db.query(
            `
            update Orders
            set
                order_status = "Requested_Canceled",
                cancel_dateTime = now()
            where order_id = ?
            `, [order_id]
        )

        res.status(201).json({ message: "ยกเลิกคำสั่งซื้อเรียบร้อยแล้ว" })
    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//employee
//โชว์ order ทั้งหมด
export const orders = async (req, res) => {
    const { order_status } = req.body

    try {

        const [orders] = await db.query(
            `
            select 
                o.order_id,
                o.order_status,
                o.create_dateTime,
                concat(c.first_name," ",c.last_name) AS customer_name,
                ot.sub_total, o.delivery_cost,
                ROUND(ot.sub_total * 0.07, 2) AS vat_amount,
                ROUND(ot.sub_total + ot.sub_total * 0.07 + o.delivery_cost, 2) AS total_amount
            from Orders o
            join Customer c on o.customer_id = c.customer_id
            join (
                select 
                order_id,
                SUM(order_product_qty * unit_price) as sub_total
                from Order_Product
                group by order_id
            ) as ot on o.order_id = ot.order_id
            where o.order_status = ? 
            order by o.create_dateTime ASC;
            `, [order_status]
        )

        res.status(200).json({ orders: orders })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

// อัพเดต order
export const updateOrderStatus = async (req, res) => {
    const { order_id, order_status, employee_id } = req.body;

    console.log(order_id, order_status, employee_id);

    try {
        await db.beginTransaction();

        switch (order_status) {
            //manager
            case "Canceled_Refunded":
                await db.query(
                    `
                    update Orders
                    set 
                        approveCancelBy = ?,
                        approve_dateTime = now(),
                        order_status = ?
                    where order_id = ?
                    `,
                    [employee_id, order_status, order_id]
                )
                break
            //rider
            case "Delivery":
                await db.query(
                    `
                    update Orders
                    set 
                        deliveryBy = ?,
                        delivery_dateTime = now(),
                        order_status = ?
                    where order_id = ?
                    `,
                    [employee_id, order_status, order_id]
                )
                break

            case "Completed":
                await db.query(
                    `
                    update Orders
                    set 
                        complete_dateTime = now(),
                        order_status = ?
                    where order_id = ?
                    `,
                    [order_status, order_id]
                )
                break

            //staff 
            case "Accepted":
            case "Cooking":
            case "Ready_for_Delivery":

                const columnMap = {
                    "Accepted": "accepted_dateTime",
                    "Cooking": "cooking_dateTime",
                    "Ready_for_Delivery": "readyForDelivery_dateTime"
                }

                const dateTimeColumn = columnMap[order_status];

                await db.query(
                    `
                    update Orders
                    set 
                        order_status = ?,
                        updateStatusBy = ?,
                        ${dateTimeColumn} = now()
                    where order_id = ?
                    `,
                    [order_status, employee_id, order_id]
                )
                break

            default:
                await db.rollback()
                res.status(400).json({ message: "สถานะคำสั่งซื้อไม่ถูกต้อง" })
        }

        await db.commit()
        res.status(200).json({ message: "อัพเดตสถานะเรียบร้อยแล้ว" })

    } catch (err) {
        await db.rollback()
        console.error(err)
        res.status(500).json({ message: "server error" })
    }
}

