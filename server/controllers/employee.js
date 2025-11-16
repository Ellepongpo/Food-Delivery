import { db } from '../db.js'

export const listEmployee = async (req, res) => {
    try {
        const [employee] = await db.query(
            `
            select * from Employee
            `
        )

        res.status(201).json({ employee: employee })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

export const editEmployee = async (req, res) => {
    const { employee_id, first_name, last_name, email, password, phone,
        house_no, sub_district, district, province, zip_code, position, editBy
    } = req.body

    try {
        await db.beginTransaction()
        //ดึงข้อมูลเก่า
        const [result] = await db.query(
            `select * from Employee where employee_id = ?`, [employee_id]
        )

        const old = result[0]

        //insert to history
        await db.query(
            `
            insert into History_edit_employee
            (employee_id, first_name, last_name, email, password, phone, house_no, 
            sub_district, district, province, zip_code, position, editBy, edit_dateTime)
            values
            (?,?,?,?,?,?,?,?,?,?,?,?,?, now())
            `,
            [old.employee_id, old.first_name, old.last_name, old.email, old.password, old.phone, old.house_no,
            old.sub_district, old.district, old.province, old.zip_code, old.position, editBy]
        )

        //check email กับ phone
        const [check] = await db.query(
            `
            select *
            from Employee
            where (email = ? or phone = ?) and employee_id != ?
            `,[email , password , employee_id]
        )

        if(check.length > 0){
            if(check[0].email === email && check[0].phone === phone){
                return res.status(400).json({message: "อีเมล์และเบอร์โทรนี้มีผู้ใช้งานแล้ว"})
            }else if(check[0].email === email){
                return res.status(400).json({message: "อีเมล์นี้มีผู้ใช้งานแล้ว"})
            }else if(check[0].phone === phone){
                return res.status(400).json({message: "เบอร์โทรนี้มีผู้ใช้งานแล้ว"})
            }
        }

        //update employee
        await db.query(
            `
            update Employee
            set
                first_name = ? , last_name = ?, email = ?,
                password = ?, phone = ?, house_no = ?, sub_district = ?,
                district = ?, province = ?, zip_code = ?, position = ?
            where employee_id = ?
            `,[first_name, last_name, email, password, phone, house_no, sub_district, district, province,
                zip_code, position, employee_id]
        )

        await db.commit()
        res.status(201).json({message: "แก้ไขข้อมูลพนักงานเรียบร้อยแล้ว"})
    } catch (err) {
        await db.rollback()
        console.log(err)
        res.status(500).json({ message: "server error" })
    }

}