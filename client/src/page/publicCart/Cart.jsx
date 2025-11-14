import { CircleX } from 'lucide-react';
import useCartStore from '../../store/Cart-store';
import { useEffect, useState} from 'react';
import useDeliveryStore from '../../store/Customer-store';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useCartStore((state) => state.cart)
  const actionRemoveFromCart = useCartStore((state) => state.actionRemoveFromCart)
  const customer = useDeliveryStore((state)=> state.customer)
  const navigate = useNavigate()
  //console.log("show cart : ", cart)

  
  //หา total
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const totalResult = cart.reduce((sum, item) => sum + (item.subTotal || 0), 0)
    setTotal(totalResult)
  }, [cart])


  const redirect = () => {
    if(customer){
      navigate('/customer/order')
    }else{
      navigate('/login')
    }
  }


  return (
    <div>
      <p className='text-2xl font-bold'>ตะกร้าสินค้า</p>

      <div className='border border-gray-400 w-full h-screen p-2 rounded-md'>

        {/* cart */}
        {
          cart.map((item) => (

            <div className='border bg-white h-32 border-white rounded-md shadow-md mb-2' key={item.product_name}>

              <div className='flex justify-between mt-2'>

                <div className='flex gap-2'>
                  <div className='border w-28 h-18 border-white rounded-md'>
                    <img src={`http://localhost:3000${item.product_image}`} className='size-20 mx-auto' />
                  </div>

                  <div className='flex flex-col'>
                    <span className='font-bold'>{item.product_name}</span>

                    {item.accessories && item.accessories.length > 0 && (
                      <ul>
                        {item.accessories.map((acc)=> (
                          <li key={acc.name}> x{acc.qty} {acc.name}</li>
                        ))}
                      </ul>
                    )}


                  </div>
                </div>

                <div className='flex flex-col items-end gap-1'>
                  <button className='text-red-600 mr-4 mt-2'>
                    <CircleX onClick={() => actionRemoveFromCart(item.product_id)} />
                  </button>

                  <span className='mr-4 text-xl font-bold text-green-600'>
                    {item.subTotal}฿
                  </span>

                  <span className='mr-4 font-bold text-xl'>x {item.quantity}</span>
                </div>

              </div>

            </div>
          ))
        }


        <div className='flex justify-between pt-8 px-2 mb-4'>
          <span className='text-xl font-bold'>ราคารวม</span>
          <span className='text-xl font-bold'>{total}฿</span>
        </div>

        <div className='text-sm text-gray-500 text-center'>
          <p>** ราคายังไม่รวมค่าจัดส่งและ vat</p>
        </div>

        <button className='border border-blue-600 w-full p-1 mt-4 bg-blue-600 
        text-white rounded-md cursor-pointer hover:bg-blue-700' onClick={redirect}>
          ทำรายการต่อ
        </button>

      </div>
    </div>
  )
}

export default Cart