import { db } from '../db.js'

// เพิ่มประเภnสินค้า
export const addCategory = async (req, res) => {

    const { category_name, status, createBy } = req.body
    try {
        const category_image = `/uploads/${req.file.filename}`

        const [checkCategory] = await db.query(
            `select * from Category where category_name = ?`,[category_name]
        )

        if(checkCategory[0]){
            return res.status(401).json({message:"มีหมวดหมู่นี้อยู่ในระบบแล้ว"})
        }

        await db.query(
            `INSERT INTO Category (category_name, category_image, status, add_dateTime, createBy)
            VALUES (?, ?, ?, NOW(), ?)`,
            [category_name, category_image, status, createBy]
        )

        res.status(201).json({ message: `เพิ่ม ${category_name} เสร็จเรียบร้อย`})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//โชว์ ประเภท สินค้าทั้งหมก
export const listCategory = async (req, res) => {

    try {
        const [category] = await db.query(
            `select * from Category`
        )
        res.status(201).json({category})
        console.log({category:category})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

export const editCategory = async (req, res) => {

    try {
        const [category] = await db.query(
            `select * from Category`
        )
        res.status(201).json({category})
        console.log({category:category})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

export const deleteCategory = async (req, res) => {

    try {
        //console.log(req.params.id)
        const { id } = req.params
        console.log(id)
        res.send('delete category')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

