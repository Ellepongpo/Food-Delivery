import { ShoppingCart, SquarePlus, SquareMinus } from 'lucide-react';
import { useState } from 'react';
import useCartStore from '../../store/Cart-store';

const ShowProduct = ({ item }) => {
    const [quantity, setQuantity] = useState(1)
    const [accessQty, setAccessQty] = useState({})
    const actionAddtoCart = useCartStore((state) => state.actionAddtoCart)

    const addQuantityProduct = () => {
        if (quantity < 20)
            setQuantity(quantity + 1)
    }

    const subQuantityProduct = () => {
        if (quantity > 1)
            setQuantity(quantity - 1)
    }

    const access = item.accessories ? item.accessories.split(',').map(s => s.trim()) : []
    //console.log(item.product_name,access)

    //จำนวน access ที่เลือก
    const addAccess = (name) => {
        setAccessQty(qty => {
            const value = qty[name] ?? 0
            if (value < 10) {
                return { ...qty, [name]: value + 1 }
            } else {
                return qty
            }
        })
    }

    const subAccess = (name) => {
        setAccessQty(qty => {
            const value = qty[name] ?? 0
            if (value > 0) {
                return { ...qty, [name]: value - 1 }
            } else {
                return qty
            }
        })
    }

    //ส่งไปเก็บที่ gobal state
    const addToCart = () => {

        const accessories = Object.entries(accessQty)
            .filter(([name, qty]) => qty > 0).map(([name, qty]) => ({
                name,
                qty
            }))

        const unit_price = item.product_price
        //const subTotal = unit_price * quantity

        const product = {
            product_id: item.product_id,
            product_name: item.product_name,
            unit_price: unit_price,
            product_image: item.product_image,
            accessories: accessories,
            quantity: quantity,
        }
        actionAddtoCart(product)
    }

    return (


        <div className="border border-white rounded-md shadow-xl p-2 w-72 hover:scale-110 hover:duration-200 min-h-[400px] flex flex-col justify-between">
            <div>
                <div className="w-full h-48 bg-gray-50 rounded-md flex items-center justify-center shadow-md">
                    <img src={`http://localhost:3000${item.product_image}`} className='size-50' />
                </div>
            </div>

            <div className="py-4 px-4">
                <p className="text-xl font-bold">{item.product_name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
            </div>

            {access.length > 0 && (
                <div className="px-4 pb-2 flex flex-wrap gap-3 p-2 mb-2">
                    {access.map((name) => (
                        <label key={name} className="inline-flex items-center gap-2">
                            <input type="checkbox" value={name} />
                            <span className="text-sm text-gray-700">{name}</span>

                            <div className='border px-8 border-gray-200 rounded-md' key={name}>
                                <button className='mr-2' onClick={() => subAccess(name)}> - </button> {accessQty[name] ?? 0}  <button className='ml-2' onClick={() => addAccess(name)}> + </button>
                            </div>

                        </label>
                    ))}
                </div>
            )}

            <div className='mb-2'>
                <span className='text-md text-green-600 font-bold px-4'>{item.product_price}฿</span>
            </div>


            <div className='flex justify-between px-4 items-center p-2'>
                <div className='border border-gray-300 px-4 py-2 rounded-md flex'>
                    <button className='mr-4 cursor-pointer' onClick={subQuantityProduct}> <SquareMinus /> </button> {quantity} <button className='ml-4 cursor-pointer' onClick={addQuantityProduct}> <SquarePlus /> </button>
                </div>

                <button className='bg-blue-500 hover:bg-blue-700 
                cursor-pointer px-8 py-2 rounded-md text-white' onClick={addToCart}>
                    <ShoppingCart />
                </button>
            </div>
        </div>
    )
}

export default ShowProduct