import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import pending from '../../../assets/pending.png'
import accepted from '../../../assets/accepted.png'
import cooking from '../../../assets/cooking.png'
import delivery from '../../../assets/food-delivery.png'
import completed from '../../../assets/checkout.png'
import cancel from '../../../assets/cancel.png'
import delivery_man from '../../../assets/delivery-man.png'
import { CreditCard } from 'lucide-react';
import { toast } from 'react-toastify'


const DetailOrder = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const head_order = location?.state?.order
  const { order_id } = useParams()
  const [products, setProducts] = useState([])
  const [accessories, setAccessories] = useState([])
  const [customer, setCustomer] = useState([])
  const [rider , setRider] = useState([])
  console.log(head_order)

  useEffect(() => {
    hdlGetDetailOrderById()
  }, [])

  const hdlGetDetailOrderById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/orders/${order_id}`)
      //console.log(res.data.customer)
      setProducts(res.data.products)
      setAccessories(res.data.accessories)
      setCustomer(res.data.customer)
      setRider(res.data.rider)
    } catch (err) {
      console.log(err)
    }
  }

  const requestedCancel = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/requestedCancel', { order_id: head_order.order_id })
      toast.success(res.data.message)
      navigate('/customer/profile/showOrders')
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message)
    }
  }

  return (
    <div className='w-full overflow-y-auto p-2'>

      <div className='h-19 flex flex-col items-center justify-center'>
        <div>
          {head_order.order_status === "Pending" && (
            <img src={pending} className='size-10' />
          )}
          {head_order.order_status === "Accepted" && (
            <img src={accepted} className='size-10' />
          )}
          {head_order.order_status === "Cooking" && (
            <img src={cooking} className='size-10' />
          )}
          {head_order.order_status === "Ready_for_Delivery" && (
            <img src={delivery_man} className='size-10' />
          )}
          {head_order.order_status === "Delivery" && (
            <img src={delivery} className='size-10' />
          )}
          {head_order.order_status === "Completed" && (
            <img src={completed} className='size-10' />
          )}
          {(head_order.order_status === "Requested_Canceled" || head_order.order_status === "Canceled_Refunded") && (
            <img src={cancel} className='size-10' />
          )}
        </div>
        <div>
          {head_order.order_status}
        </div>
      </div>

      <hr className='mx-8 mb-2 border-gray-300' />

      <div className='p-2 h-24 text-sm flex justify-between px-16'>
        <div>
          <div>
            <span className='text-sm font-bold'> หมายเลขคำสั่งซื้อ : </span> #{head_order.order_id}
          </div>
          <div>
            <span className='text-sm font-bold'> วันเวลาที่สั่งซื้อ : </span> {head_order.create_dateTime}
          </div>
          <div>
            {(head_order.order_status === "Delivery" || head_order.order_status === "Completed") && rider.length > 0 && rider[0].position === "Rider" && (
              <>
                <span className='text-sm font-bold'> พนักงานจัดส่ง : </span>
                <span>{rider[0].full_name}</span>
              </>
            )}
          </div>

        </div>

        {
          customer.map((c) => (
            <div key={c.full_name}>
              <div>
                <span className='font-bold'>ข้อมูลติดต่อ : </span>{c.full_name}
              </div>
              <div>
                <span className='font-bold'>เบอร์โทร : </span>{c.phone}
              </div>
              <div className='flex gap-2'>
                <span className='font-bold'>ที่อยู่จัดส่ง : </span>
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

      <hr className='mx-8 mb-2 border-gray-300' />

      <div className='w-full flex-1 p-4'>
        <div className='mb-2'>
          <span className='font-bold'>รายการสั่งซื้อ</span>
        </div>

        <div className='px-16'>
          {
            products.map((p) => (
              <div key={p.product_id} className='mb-2 flex justify-between'>
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

        <hr className='mx-8 mb-2 mt-2 border-gray-300' />

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
      </div>

      <hr className='mx-12 mb-2 mt-2 border-gray-300' />

      <div className='w-full h-32'>
        <div className='flex justify-between px-48 pt-4'>
          <div>
            ราคาอาหาร
          </div>
          <div>
            {head_order.sub_total}฿
          </div>
        </div>

        <div className='flex justify-between px-48'>
          <div>
            ค่าจัดส่ง
          </div>
          <div>
            {head_order.delivery_cost}฿
          </div>
        </div>

        <div className='flex justify-between px-48'>
          <div>
            VAT 7%
          </div>
          <div>
            {head_order.vat_amount}฿
          </div>
        </div>

        <div className='flex justify-between px-48 font-bold'>
          <div>
            ราคาสุทธิ
          </div>
          <div>
            {head_order.total_amount}฿
          </div>
        </div>
      </div>

      <hr className='mx-12 mb-2 mt-2 border-gray-300' />

      <div className='flex justify-between text-xl font-bold px-24 mb-4'>
        <div>
          ชำระเงินด้วย
        </div>
        <div className='flex mr-8'>
          <CreditCard className='size-8 mr-2 text-green-600' />
          บัตรเคดิต
        </div>
      </div>

      <div className='mt-10 w-full h-24 flex flex-col items-center justify-center mb-4'>
        <span className='text-red-500 mb-4'>
          * หมายเหตุ ยกเลิกคำสั่งซื้อได้ เมื่อทางร้านยังไม่เริ่มปรุงอาหาร
        </span>


        {(head_order.order_status === "Pending" || head_order.order_status === "Accepted") && (
          <button className='bg-red-500 px-18 py-3 rounded-md text-white hover:bg-red-700 cursor-pointer'
            onClick={requestedCancel}
          >
            ยกเลิกคำสั่งซื้อ
          </button>
        )}
      </div>

    </div>
  )
}

export default DetailOrder