import axios from "axios"
import { useEffect, useState } from "react"
import { Pencil } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const Delivery = () => {
  const [orders, setOrders] = useState([])
  const [selectStatus, setSelectStatus] = useState("Ready_for_Delivery")
  const navigate = useNavigate()


  useEffect(() => {
    hdlOrders()
  }, [selectStatus])

  const hdlOrders = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/employee/orders', { order_status: selectStatus })
      //console.log(res.data.orders)
      setOrders(res.data.orders)

    } catch (err) {
      console.log(err)
    }
  }

  const updateOrder = (order) => {
    navigate(`/employee/updateOrder/${order.order_id}`, { state: { order } })
  }

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="h-16 text-2xl font-bold flex items-center justify-center">
        <span>Delivery</span>
      </div>

      <div className="flex gap-4 items-center justify-center mb-2">
        <button className="p-1 hover:text-blue-500 cursor-pointer"
          onClick={() => setSelectStatus("Ready_for_Delivery")}
        >
          Ready_for_Delivery
        </button>
        <button className="p-1 hover:text-blue-500 cursor-pointer"
          onClick={() => setSelectStatus("Delivery")}
        >
          Delivery
        </button>
        <button className="p-1 hover:text-blue-500 cursor-pointer"
          onClick={() => setSelectStatus("Completed")}
        >
          Completed
        </button>

      </div>


      {/* show orders */}
      <div className="w-full h-full mt-8 px-2">
        <div className="flex">
          <table className="w-full text-center">
            <thead className="bg-gray-300">
              <tr>
                <th>Order_Id</th>
                <th>Customer_Name</th>
                <th>DateTime</th>
                <th>Status</th>
                <th>Total_Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                orders.map((order) => (
                  <tr key={order.order_id} className="hover:bg-gray-50">
                    <td className="p-3">#{order.order_id}</td>
                    <td className="p-3">{order.customer_name}</td>
                    <td className="p-3">{order.create_dateTime}</td>
                    {(order.order_status === "Ready_for_Delivery" || order.order_status === "Delivery") && (
                      <td className="p-4 text-orange-400">{order.order_status}</td>
                    )}
                    {order.order_status === "Completed" && (
                      <td className="p-4 text-green-500">{order.order_status}</td>
                    )}

                    <td className="p-3">{order.total_amount}฿</td>

                    {order.order_status !== "Completed" && (
                      <td className="p-3">
                        <button className="px-8 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-md cursor-pointer"
                          onClick={() => updateOrder(order)}
                        >
                          <Pencil />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Delivery