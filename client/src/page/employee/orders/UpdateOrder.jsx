import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { CreditCard } from 'lucide-react';
import useEmployeeStore from "../../../store/Employee-store";
import { toast } from "react-toastify";

const UpdateOrder = () => {
  const location = useLocation()
  const head_order = location.state?.order
  const { order_id } = useParams()
  const [products, setProducts] = useState([])
  const [customer, setCustomer] = useState([])
  const [accessories, setAccessories] = useState([])
  const [updateOrderStatus, setUpdateOrderStatus] = useState(head_order.order_status)
  const employee_id = useEmployeeStore((state) => state.employee.id)
  const position = useEmployeeStore((state) => state.employee.position)

  console.log(updateOrderStatus)

  //console.log(head_order)
  useEffect(() => {
    hdlGetDetailOrderById()
  }, [])

  const hdlGetDetailOrderById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/orders/${order_id}`)
      setProducts(res.data.products)
      setAccessories(res.data.accessories)
      setCustomer(res.data.customer)
      //console.log(res.data.customer)
    } catch (err) {
      console.log(err)
    }
  }



  const updateOrder = (e) => {
    //console.log(e.target.value)
    setUpdateOrderStatus(e.target.value)

  }


  const hdlUpdateOrderStatus = async () => {

    const update = {
      order_id: head_order.order_id,
      order_status: updateOrderStatus,
      employee_id: employee_id,
      position: position
    }

    try {
      const res = await axios.post('http://localhost:3000/api/employee/updateOrderStatus', update)
      toast.success(res.data.message)
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }


  return (
    <div className="bg-white overflow-y-auto p-2 flex gap-2">

      <div className="w-4/6 h-screen flex flex-col shadow-md p-2 overflow-y-auto">

        <div className="h-12 flex items-center justify-center">
          <span className="text-xl font-bold">รายละเอียดคำสั่งซื้อ</span>
        </div>

        <hr className="border-gray-300 mx-8 mb-2" />

        <div className="h-24 flex justify-between">

          <div className="w-2/4 text-sm px-8 py-2">
            <div>
              <span className="font-bold">หมายเลขคำสั่งซื้อ : </span>
              <span>#{head_order.order_id}</span>
            </div>
            <div>
              <span className="font-bold">วันเวลาที่สั่งซื้อ : </span>
              <span>{head_order.create_dateTime}</span>
            </div>
            <div>
              <span className="font-bold">สถานะคำสั่งซื้อ : </span>
              {head_order.order_status === "Pending" && (
                <span className="text-yellow-500">{head_order.order_status}</span>
              )}
              {(head_order.order_status === "Accepted" || head_order.order_status === "Cooking" ||
                head_order.order_status === "Ready_for_Delivery" || head_order.order_status === "Delivery") && (
                  <span className="text-orange-400">{head_order.order_status}</span>
                )}
              {(head_order.order_status === "Requested_Canceled" || head_order.order_status === "Canceled_Refunded") && (
                  <span className="text-red-500">{head_order.order_status}</span>
                )}

            </div>
          </div>

          <div className="w-3/4 mr-4 py-2 text-sm">
            {
              customer.map((c) => (
                <div key={c.full_name}>
                  <div>
                    <span className="font-bold">ข้อมูลติดต่อ : </span>
                    <span>{c.full_name}</span>
                  </div>

                  <div>
                    <span className="font-bold">เบอร์โทร : </span>
                    <span>{c.phone}</span>
                  </div>

                  <div className="flex gap-2">
                    <span className="font-bold">ที่อยู่จัดส่ง : </span>
                    <span>{c.house_no}</span>
                    <span>{c.sub_district}</span>
                    <span>{c.district}</span>
                    <span>{c.province}</span>
                    <span>{c.zip_code}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <hr className="border-gray-300 mx-8 mb-2" />

        <div className="flex-1 p-4">

          <div className="flex items-center px-4 mb-2">
            <span className="font-bold">รายการสั่งซื้อ</span>
          </div>

          <div className="px-16">
            {
              products.map((p) => (
                <div key={p.product_id} className='mb-2 flex justify-between items-center'>
                  <div>
                    <img src={`http://localhost:3000${p.product_image}`} className='size-15' />
                  </div>
                  <div>
                    x {p.order_product_qty} {p.product_name}
                  </div>

                  <div>
                    {p.line_total}฿
                  </div>
                </div>
              ))
            }
          </div>

          <hr className="border-gray-300 mx-8 mb-2" />

          <div className='px-16 flex'>
            {
              accessories.map((acc) => (
                <div key={acc.accessories_name} className='mr-4'>
                  <div>
                    x {acc.order_access_qty} {acc.accessories_name}
                  </div>
                </div>
              ))
            }
          </div>

          <hr className="border-gray-300 mx-8 mb-4" />

          <div className="h-28 px-24 pt-2">
            <div className="flex justify-between">
              <div>
                <span>ราคาอาหาร</span>
              </div>
              <div>
                <span>{head_order.sub_total}฿</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <span>ค่าจัดส่ง</span>
              </div>
              <div>
                <span>{head_order.delivery_cost}฿</span>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <span>VAT 7%</span>
              </div>
              <div>
                <span>{head_order.vat_amount}฿</span>
              </div>
            </div>

            <div className="flex justify-between font-bold">
              <div>
                <span>ราคาสุทธิ</span>
              </div>
              <div>
                <span>{head_order.total_amount}฿</span>
              </div>
            </div>
          </div>

          <hr className="border-gray-300 mx-8 mb-2" />

          <div className='flex justify-between text-xl font-bold mb-4 px-12'>
            <div>
              ชำระเงินด้วย
            </div>
            <div className='flex mr-8'>
              <CreditCard className='size-8 mr-2 text-green-600' />
              บัตรเคดิต
            </div>
          </div>

        </div>
      </div>


      <div className="flex-1 h-64 p-2 shadow-md">
        <div className="h-12 text-xl font-bold px-4 py-2">
          <span>จัดการคำสั่งซื้อ</span>
        </div>

        <hr className="border-gray-300 mx-4 mb-2" />
        <div className="px-8">
          <span className="font-bold">สถานะคำสั่งซื้อ : </span>
          <span>{head_order.order_status}</span>
        </div>

        <div className="h-16 px-8 py-4">
          <select name="order_status" className="border w-full p-1 rounded-md" onChange={updateOrder}>
            <option>--- select order status ---</option>
            {head_order.order_status === "Pending" && (
              <option value="Accepted">Aceepted</option>
            )}
            {head_order.order_status === "Accepted" && (
              <option value="Cooking">Cooking</option>
            )}
            {head_order.order_status === "Cooking" && (
              <option value="Ready_for_Delivery">Ready_for_Delivery</option>
            )}
            {head_order.order_status === "Ready_for_Delivery" && (
              <option value="Delivery">Delivery</option>
            )}
            {head_order.order_status === "Delivery" && (
              <option value="Completed">Completed</option>
            )}
            {head_order.order_status === "Requested_Canceled" && (
              <option value="Canceled_Refunded">Canceled_Refunded</option>
            )}
          </select>
        </div>

        <div className="h-16 flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 
          rounded-md cursor-pointer" onClick={hdlUpdateOrderStatus}
          >
            อัพเดตสถานะ
          </button>
        </div>


      </div>
    </div>
  )
}

export default UpdateOrder