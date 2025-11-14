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