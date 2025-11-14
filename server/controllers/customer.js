import {db} from '../db.js'

export const editCustomer = async (req , res) => {
    const {first_name , last_name , email ,password,
        phone, house_no,sub_district, district,province,zip_code,
        customer_id} = req.body
        console.log(house_no)
    try{

        await db.beginTransaction()
        //query เอา ข้อมูลเดิม
        const [result] = await db.query(
            `select * 
            from Customer 
            where customer_id = ?`
            ,[customer_id]
        )

        //เอาข้อมูลเดิม insert to history
        const old = result[0]
        await db.query(
            `
            insert into History_edit_customer
            (customer_id, edit_dateTime, first_name, last_name, email, password, phone,
            house_no, sub_district, district, province, zip_code)
            values  (?, now() , ?,?,?,?,?,?,?,?,?,?)
            `,
            [old.customer_id, old.first_name, old.last_name, old.email, old.password, old.phone,
            old.house_no, old.sub_district, old.district, old.province, old.zip_code
            ]
        )

        //เช็คว่า email กับ phone ซ้ำไหม
        const [check] = await db.query(
            `select *
            from Customer
            where (email = ? or phone = ?) and customer_id != ?
            `,[email,phone,customer_id]

        )

        if(check.length > 0){
            if(check[0].email === email && check[0].phone === phone){
                return res.status(400).json({message: "อีเมล์และเบอร์โทรนี้ มีผู้ใช้งานแล้ว"})
            }else if(check[0].email === email){
                return res.status(400).json({message: "อีเมล์นี้ มีผู้ใช้งานแล้ว"})
            }else if(check[0].phone === phone){
                return res.status(400).json({message: "เบอร์โททรนี้มีผู้ใช้งานแล้ว"})
            }
        }

        //update customer
        await db.query(
            `
            update Customer
            set 
                first_name = ?, last_name = ?,
                email = ?, password = ?,
                phone = ?, house_no = ?,
                sub_district = ? , district = ?,
                province = ? , zip_code = ?
            where customer_id = ?
            `,[first_name,last_name,email,password,phone,house_no,sub_district,district,province,zip_code,customer_id]
        )

        //เอาข้อมูลใหม่ ส่งกลับไปที่ front end
        const [newInfo] = await db.query(
            `select * from Customer where customer_id = ?`,[customer_id]
        )
        
        const customer = {
            id: newInfo[0].customer_id,
            first_name: newInfo[0].first_name,
            last_name: newInfo[0].last_name,
            birthday: newInfo[0].birthday,
            email: newInfo[0].email,
            password: newInfo[0].password,
            house_no: newInfo[0].house_no,
            sub_district: newInfo[0].sub_district,
            district: newInfo[0].district,
            province: newInfo[0].province,
            zip_code: newInfo[0].zip_code,
            phone: newInfo[0].phone,
            gender: newInfo[0].gender

        }
        await db.commit()
        res.status(201).json({message: "แก้ไขข้อมูลส่วนตัวเรียบร้อย" , customer: customer})
    }catch(err){
        await db.rollback()
        res.status(500).json({message:"server error"})
    }
}