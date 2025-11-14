import {db} from '../db.js'

//โชว์ accessories ทั้งหมด
export const listAccessories = async (req , res) => {
    try{
        const [accessories] = await db.query(
            `select * from Accessories`
        )

        res.status(201).json({accessories:accessories})

    }catch(err){
        res.status(500).json({message:"server error"})
    }
}

// edit
export const editAccessories = async (req , res)=> {
    const {accessories_name , accessories_price , stock_qty_accessories ,employee_id} = req.body

    try{
        await db.beginTransaction()
        const [result] = await db.query(
            `
            select * from Accessories where accessories_name = ?
            `,[accessories_name]
        )

        const old = result[0]
        //insert to history
        await db.query(
            `
            insert into History_edit_accessories
            (accessories_name, editBy , accessories_price , stock_qty_accessories , edit_dateTime)
            values (?,?,?,?, now())
            `,[old.accessories_name, employee_id, old.accessories_price, old.stock_qty_accessories]
        )

        //update accessories
        await db.query(
            `
            update Accessories
            set
                accessories_price = ? , stock_qty_accessories = ?
            where accessories_name = ?
            `,[accessories_price, stock_qty_accessories, accessories_name]
        )

        await db.commit()
        res.status(201).json({message: "แก้ไขข้อมูลเรียบร้อยแล้ว"})
    }catch(err){
        await db.rollback()
        console.log(err)
        res.status(500).json({message:"server error"})
    }
}