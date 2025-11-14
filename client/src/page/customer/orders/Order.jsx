import { MapPinned, CreditCard } from 'lucide-react';
import { useEffect } from 'react';
import { useState } from 'react';
import useDeliveryStore from '../../../store/Customer-store';
import axios from 'axios';
import useCartStore from '../../../store/Cart-store';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Order = () => {
  const customer_id = useDeliveryStore((state) => state.customer.id)
  const actionClearCart = useCartStore((state) => state.actionClearCart)
  const navigate = useNavigate()
  const cart = useCartStore((state) => state.cart)
  const [address, setAddress] = useState([])
  const [payment, setPayment] = useState(false)
  const deliveryCost = 50

  //console.log(cart)

  useEffect(() => {
    hdlDefaultAddress()
  }, [])


  const hdlDefaultAddress = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/defaultAddress', { customer_id })
      setAddress(res.data.defaultAddress)
    } catch (err) {
      console.log(err)
    }
  }


  const [subTotal, setSubTotal] = useState(0)
  useEffect(() => {
    const subTotalResult = cart.reduce((sum, item) => sum + (item.subTotal || 0), 0)
    setSubTotal(subTotalResult)
  }, [cart])

  const vat_amount = Math.round((subTotal + deliveryCost) * 0.07 * 100) / 100

  const total_amount = subTotal + deliveryCost + vat_amount

  const hdlOrder = async () => {

    // 1) รวม accessories ทั้งหมดจาก cart
    const totalAcc = {};

    cart.forEach(product => {
      if (!product.accessories) return;

      product.accessories.forEach(acc => {
        if (!acc || !acc.name || !acc.qty || acc.qty <= 0) return;

        totalAcc[acc.name] = (totalAcc[acc.name] || 0) + acc.qty;
      });
    });

    // 2) แปลงเป็น array
    const accessories = Object.entries(totalAcc).map(([name, qty]) => ({
      name,
      qty
    }));

    const order = {
      customer_id: customer_id,
      address_id: address[0].address_id,
      cart: cart,
      accessories
    }
    //console.log(order)

    try {
      const res = await axios.post('http://localhost:3000/api/addOrder', order)
      console.log(res.data)
      toast.success(res.data.message)
      actionClearCart()

      navigate('/customer/profile/showOrders')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data.message)
    }
  }



  return (
    <div className='min-h-screen flex flex-col items-center p-8'>

      {/* ที่อยู่ */}
      <div className='w-1/2 h-28 mb-4 p-2 shadow-md rounded-md'>
        <div className='mb-2'>
          <span className='font-bold text-gray-700'>ที่อยู่</span>
        </div>

        <div className='border p-2 h-16 flex flex-row border-gray-300 rounded-md'>
          <div className='w-24 h-12 flex items-center justify-center mr-4 text-green-500'>
            <MapPinned />
          </div>

          {
            address.map((item) => (
              <div className='flex flex-row gap-2 items-center' key={item.address_id}>
                <span>{item.house_no}</span>
                <span>{item.sub_district}</span>
                <span>{item.district}</span>
                <span>{item.province}</span>
                <span>{item.zip_code}</span>
                <span>{item.phone}</span>
              </div>
            ))
          }
        </div>
      </div>


      <div className='w-1/2 h-19 mb-4 p-2 shadow-md rounded-md'>
        <div className='mb-2'>
          <span className='text-gray-700 font-bold'>ชำระเงินด้วย</span>
        </div>

        <div className='flex gap-12 px-12'>
          <CreditCard className='text-green-500' />
          <span>บัตรเคดิต</span>
        </div>
      </div>

      <div className='w-1/2 flex-1 mb-2 p-2 shadow-md rounded-md'>
        <div className='mb-2'>
          <span className='text-gray-700 font-bold'>รายการสินค้า</span>
        </div>

        {
          cart.map((item) => (
            <div className='border border-gray-300 rounded-md h-16 flex gap-2 justify-center mb-2' key={item.product_id}>

              <div className='w-32 flex items-center justify-center mb-'>
                <img src={`http://localhost:3000${item.product_image}`} className='size-15' />
              </div>

              <div className='w-32 px-1'>
                {item.product_name}
              </div>

              <div className='flex-1 w-32'>
                {item.accessories && item.accessories.length > 0 && (
                  <ul className='flex gap-2'>
                    {item.accessories.map((acc) => (
                      <li key={acc.name}> x {acc.qty} {acc.name}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className='w-48 flex flex-col pl-24 gap-1'>
                <div className='text-xl font-bold pl-16'>
                  x {item.quantity}
                </div>
                <div className='text-xl text-green-500 font-bold pl-8'>
                  {item.subTotal}฿
                </div>

              </div>
            </div>
          ))
        }
      </div>

      <div className='w-1/2 h-72 p-2 shadow-md rounded-md'>
        <div className='mb-2'>
          <span className='font-bold text-gray-700'>สรุปรายการอาหาร</span>
        </div>

        <div className='h-auto flex flex-col'>

          <div className='flex justify-between px-16 mb-2'>
            <div>
              ราคาอาหาร
            </div>
            <div>
              {subTotal}฿
            </div>
          </div>

          <div className='flex justify-between px-16 mb-2'>
            <div>
              ค่าจัดส่ง
            </div>
            <div>
              {deliveryCost}฿
            </div>
          </div>

          <div className='flex justify-between px-16'>
            <div>
              VAT 7%
            </div>
            <div>
              {vat_amount}฿
            </div>
          </div>

          <hr className='border-t-2 border-dashed border-gray-400 m-4' />

          <div className='flex justify-between px-16'>
            <div className='font-bold text-green-500'>
              ราคารวมทั้งหมด
            </div>
            <div className='font-bold text-green-500'>
              {total_amount}฿
            </div>
          </div>

          <hr className='border-t-2 border-dashed border-gray-400 mx-4' />
          <hr className='border-t-2 border-dashed border-gray-400 mx-4 my-1' />

          <div className='flex px-16 mt-8 justify-center'>

            <Link to='/customer/menu'>
              <button className='bg-gray-400 text-white px-4 py-2 mr-16 hover:bg-gray-700
              cursor-pointer rounded-md'>
                สั่งอาหารเพิ่ม
              </button>
            </Link>

            <button className='bg-blue-500 text-white px-12 py-2 hover:bg-blue-700
            cursor-pointer rounded-md' onClick={()=> setPayment(true)}>
              สั่งซื้อ
            </button>
          </div>

        </div>



        {payment && (
          <div className='fixed inset-0 bg-black/20 flex place-items-center justify-center'>
            <div className='bg-white w-full max-w-md rounded-xl shadow-md p-4'>

              <div className='px-4 py-2 mb-2'>
                <h2 className='font-bold text-xl'>ชำระเงิน</h2>
              </div>

              <div className='px-4 p-1 mb-2'>
                <span className='text-sm'>ยอดเงินที่ต้องชำระ : </span><span className='text-green-600 font-bold'>{total_amount}฿</span>
              </div>

              <div className='grid grid-cols-2 gap-4 px-4'>
                <div>
                  <label className='block text-sm text-gray-500 mb-1'>หมายเลขบัตร</label>
                  <input className='border border-gray-300 rounded-md px-2 py-1'
                    type="text"
                  />
                </div>

                <div>
                  <label className='block text-sm text-gray-500 mb-1'>ชื่อบัตร</label>
                  <input className='border border-gray-300 rounded-md px-2 py-1'
                    type="text"
                  />
                </div>

                <div>
                  <label className='block text-sm text-gray-500 mb-1'>วันหมดอายุ (MM/YY)</label>
                  <input className='border border-gray-300 rounded-md px-2 py-1'
                    type="text"
                  />
                </div>

                <div>
                  <label className='block text-sm text-gray-500 mb-1'>CVV</label>
                  <input className='border border-gray-300 rounded-md px-2 py-1'
                    type="text"
                  />
                </div>
              </div>

              <div className='flex  justify-center w-full mt-8'>
                <button className='bg-gray-400 px-6 py-2 mr-2 text-white hover:bg-gray-500 rounded-md cursor-pointer' onClick={()=> setPayment(false)}>
                  ยกเลิก
                </button>
                <button className='bg-blue-500 px-4 text-white hover:bg-blue-600 rounded-md cursor-pointer' onClick={hdlOrder}>
                  ยืนยันการชำระเงิน
                </button>
              </div>

            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Order