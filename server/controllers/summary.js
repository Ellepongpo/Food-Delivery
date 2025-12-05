import { db } from '../db.js'

export const salePerDay = async (req, res) => {
    const { day } = req.body

    //console.log(day)

    try {
        const [result] = await db.query(
            `
            select
                date(o.create_dateTime) as sale_date,
                sum(op.order_product_qty * op.unit_price) as total_salePerDay
            from Orders o 
            join Order_Product op on o.order_id = op.order_id
            where date(o.create_dateTime) = ? and o.order_status = 'Completed'
            group by date(o.create_dateTime)
            ` , [day]
        )
        //console.log(result)

        res.status(201).json({result : result})

    } catch (err) {
        console.log(err)
        res.status(501).json({ message: "server error" })
    }
}