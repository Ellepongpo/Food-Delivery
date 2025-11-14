import { useEffect, useState } from 'react'
import delivery from '../../../assets/delivery.png'
import axios from 'axios'
import useDeliveryStore from '../../../store/Customer-store'
import { useNavigate } from 'react-router-dom'

const ShowOrders = () => {
    const customer_id = useDeliveryStore((state) => state.customer.id)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        hdlOrders()
    }, [orders])

    const hdlOrders = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/orders', { customer_id: customer_id })
            setOrders(res.data.orders)
        } catch (err) {
            console.log(err)
        }
    }

    const detailOrder = (order) => {
        navigate(`/customer/profile/detailOrder/${order.order_id}`, {state: {order}})
    }
    
    return (
        <div className="h-full p-2">
            <div className="flex flex-col">
                <div className="h-14 p-2 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">Orders</span>
                </div>

                {
                    orders.map((order) => (
                        <div className="border h-32 flex flex-row justify-between gap-2 mb-2 border-gray-300 rounded-md" key={order.order_id} onClick={()=> detailOrder(order)}>
                            <div className="w-24 flex items-center justify-center">
                                <img src={delivery} className='size-15' />
                            </div>

                            <div className="flex-1 p-2">
                                <div>
                                    <span className='font-bold'>วันที่สั่งซื้อ : </span> {order.create_dateTime}
                                </div>

                                <div>
                                    <span className='font-bold'>หมายเลขคำสั่งซื้อ #{order.order_id}</span>
                                </div>

                                <div className='mb-4 text-sm text-gray-400 flex gap-2'>
                                    <span>{order.house_no}</span>
                                    <span>{order.sub_district}</span>
                                    <span>{order.district}</span>
                                    <span>{order.province}</span>
                                    <span>{order.zip_code}</span>
                                    <span>{order.phone}</span>
                                </div>

                                <div>
                                    {order.order_status === "Pending" && (
                                        <span className='text-yellow-500'>{order.order_status}</span>
                                    )}
                                    {(order.order_status === "Accepted" || order.order_status === "Cooking" || order.order_status === "Ready_for_Delivery" || order.order_status === "Delivery") && (
                                        <span className='text-orange-400'>{order.order_status}</span>
                                    )}
                                    {(order.order_status === "Completed") && (
                                        <span className='text-green-500'>{order.order_status}</span>
                                    )}
                                    {(order.order_status === "Requested_Canceled" || order.order_status === "Canceled_Refunded") && (
                                        <span className='text-red-500'>{order.order_status}</span>
                                    )}
                                </div>
                            </div>

                            <div className="w-32 flex items-center justify-center">
                                <div className='p-2 font-bold'>
                                    <span>{order.total_amount}฿</span>
                                </div>
                               
                            </div>
                        </div>
                    ))
                }




            </div>

        </div>
    )
}

export default ShowOrders