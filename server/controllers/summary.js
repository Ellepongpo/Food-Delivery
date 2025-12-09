import { db } from '../db.js'

export const salePerDay = async (req, res) => {
    const { day } = req.query

    console.log(day)

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


        //แบบรวมค่าส่งและ vat
        /*
        select
            date(o.create_dateTime) as sale_date,
            round(sum(ot.sub_total  + o.delivery_cost  + (ot.sub_total * 0.07)),2) as total_salePerDay
        from Orders o
        join (
            select
                o.order_id,
                SUM(op.order_product_qty * op.unit_price) as sub_total
            from Orders o
            join Order_Product op on o.order_id = op.order_id
            group by o.order_id
        ) as ot on ot.order_id = o.order_id
        where date(o.create_dateTime) = '2025-11-13' and o.order_status = 'Completed'
        group by date(o.create_dateTime)
        */

        res.status(201).json({ result: result })

    } catch (err) {
        console.log(err)
        res.status(501).json({ message: "server error" })
    }
}

export const customerTopPerMonth = async (req, res) => {
    const {month} = req.query

    //console.log(month)

    const [year , monthNum] = month.split('-')

    //console.log(year , monthNum)

    try{
        const [result] = await db.query(
            `
            select 
                c.customer_id,
                concat(c.first_name," ", c.last_name) as full_name,
                o.create_dateTime,
                sum(op.order_product_qty * op.unit_price) as total_spent
            from Orders o
            join Order_Product op on o.order_id = op.order_id
            join Customer c on o.customer_id = c.customer_id
            where month(o.create_dateTime) = ? and year(o.create_dateTime) = ?
            group by c.customer_id , c.first_name, c.last_name , o.create_dateTime
            order by total_spent desc
            limit 5
            `, [monthNum , year]
        )

        //console.log(result)

        res.status(201).json({result : result})

    }catch(err){
        console.log(err)
        res.status(500).json({message: "server error"})
    }
}