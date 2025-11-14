import { db } from '../db.js'

//เพิ่มที่อยู่จัดส่ง
export const addAddress = async (req, res) => {
    const { house_no, sub_district, district,
        province, zip_code, phone, customer_id } = req.body

    try {
        await db.query(
            `insert into Address_Delivery 
            (house_no,sub_district,district,province,zip_code,phone,customer_id,add_dateTime)
            values (?,?,?,?,?,?,?,now())`
            , [house_no, sub_district, district, province, zip_code, phone, customer_id]
        )

        res.status(201).json({ message: "เพิ่มที่อยู่จัดส่งเรียบร้อย" })

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//โชว์ที่อยู่จัดส่งทั้งหมด
export const listAddress = async (req, res) => {
    const { customer_id } = req.body
    //console.log(customer_id)
    try {
        const [address] = await db.query(
            `select * from Address_Delivery where customer_id = ?`, [customer_id]
        )

        res.status(201).json({ address: address })

    } catch (err) {
        res.status(500).jsob({ message: "server error" })
    }
}

//เลือกที่อยู่ ให้เป็นที่อยู่หลักในการจัดส่ง
export const addDefaultAddress = async (req, res) => {
    const { address_id, customer_id } = req.body

    try {

        //เครียค่าเดิม
        await db.query(
            `update Customer
            set is_default = 0 , isDefault_dateTime = null , address_id = null
            where customer_id = ? `, [customer_id]
        )

        //เพิ่มค่าใหม่
        await db.query(
            `update Customer
            set is_default = ? , isDefault_dateTime = now() , address_id = ?
            where customer_id = ? `, [1, address_id, customer_id]
        )

        res.status(201).json({ message: "ตั้งเป็นที่อยู่หลักเรียบร้อย" })

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//โชว์ ที่อยู่หลัก หน้า profile
export const defaultAddress = async (req, res) => {
    const { customer_id } = req.body

    try {
        const [defaultAddress] = await db.query(
        `SELECT 
            c.address_id,
            ad.house_no,
            ad.sub_district,
            ad.district,
            ad.province,
            ad.zip_code,
            ad.phone
        FROM Customer c
        LEFT JOIN Address_Delivery ad ON c.address_id = ad.address_id
        WHERE c.customer_id = ?` ,[customer_id]
        )

        res.status(201).json({defaultAddress:defaultAddress})

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}