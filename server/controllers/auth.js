import { db } from '../db.js'

//ลงทะเบียนของ customer
export const signUp = async (req, res) => {
    const { first_name, last_name, birthday,
        email, password, house_no,
        sub_district, district, zip_code, province,
        phone, gender } = req.body

    try {
        //check email and phone
        const [check] = await db.query("select * from Customer where email = ? or phone = ?", [email, phone])

        //res กลับไปยังผู้ใช้งาน
        if (check.length > 0) {
            if (check[0].email === email && check[0].phone === phone) {
                return res.status(409).json({ message: "อีเมล์และเบอร์โทรนี้มีผู้ใช้งานแล้ว" })
            } else if (check[0].email === email) {
                return res.status(409).json({ message: "อีเมล์นี้มีผู้ใช้งานแล้ว" })
            } else {
                return res.status(409).json({ message: "เบอร์โทรนี้มีผู้ใช้งานแล้ว" })
            }
        }
        
        //insert database
        await db.query(
            `insert into Customer 
                (first_name,last_name,birthday,email,password,house_no,sub_district,district,province,zip_code,phone,gender,create_dateTime)
                values(?,?,?,?,?,?,?,?,?,?,?,?,now())`,
            [first_name, last_name, birthday, email, password, house_no, sub_district, district, province, zip_code, phone, gender]
        )

        res.status(201).json({ message: "สมัครสมาชิกเรียบร้อย" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

// login ของ customer
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const [user] = await db.query('select * from Customer where email = ? and password = ?', [email, password])

        if (!user[0]) {
            return res.status(400).json({ message: "อีเมล์และรหัสผ่านไม่ถูกต้อง" })
        }

        //insert to login
        const [login] = await db.query(`insert into Login (dateTime_in,customer_id) values(now(), ?)`, [user[0].customer_id])
        const login_id = login.insertId

        const customer = {
            id: user[0].customer_id,
            first_name: user[0].first_name,
            last_name: user[0].last_name,
            birthday: user[0].birthday,
            email: user[0].email,
            password: user[0].password,
            house_no: user[0].house_no,
            sub_district: user[0].sub_district,
            district: user[0].district,
            province: user[0].province,
            zip_code: user[0].zip_code,
            phone: user[0].phone,
            gender: user[0].gender
        }
        console.log(customer)

        res.status(201).json({ message: "เข้าสู่ระบบสำเร็จ", customer: customer, login_id })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}

//logout ของ customer
export const logout = async (req, res) => {
    const { customer_id, login_id } = req.body;
    //console.log("logout body:", req.body);

    try {
        await db.query(
            `UPDATE Login 
            SET dateTime_out = NOW() 
            WHERE login_id = ? AND customer_id = ? AND dateTime_out is null`,
            [login_id, customer_id]
        );

        res.json({ message: "ออกจากระบบสำเร็จ" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
}


//ลงทะเบียน ของ employee
export const signUpEmployee = async (req, res) => {
    const { first_name, last_name, birthday,
        email, password, house_no,
        sub_district, district, zip_code, province, position,
        phone, gender , createBy} = req.body

    try {
        //check email and phone
        const [check] = await db.query("select * from Employee where email = ? or phone = ?", [email, phone])

        //res กลับไปยังผู้ใช้งาน
        if (check.length > 0) {
            if (check[0].email === email && check[0].phone === phone) {
                return res.status(409).json({ message: "อีเมล์และเบอร์โทรนี้มีผู้ใช้งานแล้ว" })
            } else if (check[0].email === email) {
                return res.status(409).json({ message: "อีเมล์นี้มีผู้ใช้งานแล้ว" })
            } else {
                return res.status(409).json({ message: "เบอร์โทรนี้มีผู้ใช้งานแล้ว" })
            }
        }
        //insert database
        await db.query(
            `insert into Employee 
                (first_name,last_name,birthday,email,password,house_no,sub_district,district,province,zip_code,phone,gender,create_dateTime,position,createBy)
                values(?,?,?,?,?,?,?,?,?,?,?,?,now(),?,?)`,
            [first_name, last_name, birthday, email, password, house_no, sub_district, district, province, zip_code, phone, gender,position,createBy]
        )

        res.status(201).json({ message: "ลงทะเบียนพนักงานเรียบร้อย" })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "server error" })
    }
}


// login ของ employee
export const loginEmployee = async (req, res) => {
    const { email, password } = req.body

    try {
        const [emp] = await db.query(
            `select * from Employee where email = ? and password = ?`,
            [email, password]
        )

        if (!emp[0]) {
            res.status(400).json({ message: "อีเมล์และรหัสผ่านไม่ถูกต้อง" })
        }

        //insert employee to login
        const [login] = await db.query(
            `insert into Login (dateTime_in,employee_id) values (now(),?)`,
            [emp[0].employee_id]
        )
        const login_id = login.insertId


        const employee = {
            id: emp[0].employee_id,
            first_name: emp[0].first_name,
            last_name: emp[0].last_name,
            position: emp[0].position
        }
        console.log(employee)

        res.status(201).json({ message: "เข้าสู่ระบบสำเร็จ", employee: employee, login_id })

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}

//logout ของ employee
export const logoutEmployee = async (req, res) => {
    const { employee_id, login_id } = req.body;
    //console.log("logout body:", req.body);

    try {
        await db.query(
            `UPDATE Login 
            SET dateTime_out = NOW() 
            WHERE login_id = ? AND employee_id = ? AND dateTime_out is null`,
            [login_id, employee_id]
        );

        res.json({ message: "ออกจากระบบสำเร็จ" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "server error" });
    }
}