import { db } from '../db.js'

// เพิ่มหมวดหมู่สินค้า
export const addCategory = async (req, res) => {

    const { category_name, status, createBy } = req.body
    try {
        const category_image = `/uploads/${req.file.filename}`

        const [checkCategory] = await db.query(
            `select * from Category where category_name = ?`, [category_name]
        )

        if (checkCategory[0]) {
            return res.status(401).json({ message: "มีหมวดหมู่นี้อยู่ในระบบแล้ว" })
        }

        await db.query(
            `INSERT INTO Category (category_name, category_image, status, add_dateTime, createBy)
            VALUES (?, ?, ?, NOW(), ?)`,
            [category_name, category_image, status, createBy]
        )

        res.status(201).json({ message: `เพิ่ม ${category_name} เสร็จเรียบร้อย` })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//โชว์ หมวดหมู่ สินค้าทั้งหมก
export const listCategory = async (req, res) => {

    try {
        const [category] = await db.query(
            `select * from Category`
        )
        res.status(201).json({ category })
        console.log({ category: category })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

export const editCategory = async (req, res) => {
    const { category_id, category_name, employee_id, status } = req.body
    try {

        await db.beginTransaction()

        //const category_image = `/uploads/${req.file.filename}`

        //เอา category เดิม
        const [result] = await db.query(
            `
            select * from Category where category_id = ?
            `, [category_id]
        )

        const old = result[0]

        // ถ้าไม่มีไฟล์ใหม่ -> ใช้รูปเดิม
        let category_image = old.category_image
        if (req.file) {
            category_image = `/uploads/${req.file.filename}`
        }

        //insert to history
        await db.query(
            `
            insert into History_edit_category
            (category_id, editBy , category_name, category_image, status , edit_dateTime)
            values (?,?,?,?,?, now())
            `, [old.category_id, employee_id, old.category_name, old.category_image, old.status]
        )

        //เช็ค category
        const [check] = await db.query(
            `
            select *
            from Category
            where (category_name = ? or category_image = ?) and category_id != ?
            `, [category_name, category_image, category_id]
        )

        if (check.length > 0) {
            if (check[0].category_name === category_name) {
                return res.status(400).json({ message: "ชื่อหมวดหมู่นี้ ถูกใช้งานในระบบแล้ว" })
            } else if (check[0].category_image === category_image) {
                return res.status(400).json({ message: "รูปหมวดหมู่นี้ ถูกใช้งานในระบบแล้ว" })
            }
        }

        //update category
        await db.query(
            `
            update Category
            set
                category_name = ?,
                category_image = ?,
                status = ?
            where category_id = ?
            `, [category_name, category_image, status, category_id]
        )



        await db.commit()
        res.status(201).json({ message: "แก้ไขหมวดหมู่เรียบร้อยแล้ว" })
    } catch (err) {
        await db.rollback()
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}


