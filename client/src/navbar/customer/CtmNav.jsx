import { Link, useNavigate } from "react-router-dom"
import { ShoppingBag, User, ShieldUser, MapPinHouse, MapPinCheck ,LogOut ,ListOrdered } from 'lucide-react'
import useDeliveryStore from "../../store/Customer-store"
import { toast } from "react-toastify"
import useCartStore from "../../store/Cart-store"

const CtmNav = () => {
    const navigate = useNavigate()
    const customer = useDeliveryStore((state) => state.customer)
    const actionLogout = useDeliveryStore((state) => state.actionLogout)
    const cart = useCartStore((state) => state.cart)

    const hdlLogout = async () => {
        try {
            const res = await actionLogout()
            toast.success(res.data?.message)
            navigate('/')
        } catch (err) {
            toast.error(err.response?.data?.message)
        }
    }

    return (
        <nav className='bg-gray-200 shadow-md'>
            <div className='mx-auto px-4'>

                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-4'>
                        <Link to={'/customer'} className='text-xl font-bold'>Food Delivery</Link>
                        <Link to={'/customer'}>Home</Link>
                        <Link to={'/customer/menu'}>Menu</Link>
                    </div>

                    <div className='flex items-center gap-4'>
                        {/* Badge */}
                        <Link to={'/customer/cart'} className='relative py-4'>
                            <ShoppingBag className='size-8' />
                            {cart.length > 0 && (
                                <span className='absolute top-0.5 left-6 bg-red-500 text-white text-xs 
                                rounded-full px-1.5 py-0.5 font-bold'>
                                    {cart.length}
                                </span>
                            )}
                        </Link>

                        <div className="relative group">
                            <div className="flex items-center gap-2">
                                <User className="size-9 cursor-pointer" />
                                <p className="font-bold text-xl">{customer ? customer.first_name : null}</p>
                            </div>

                            <div className="absolute right-0 mt-2 w-48 bg-white border border-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-150 z-10">
                                <Link to="/customer/profile" className="px-4 py-2 hover:bg-gray-100 flex">
                                    <ShieldUser className="mr-2" />
                                    Profile
                                </Link>
                                <Link to="/customer/profile/address" className="flex px-4 py-2 hover:bg-gray-100">
                                    <MapPinHouse className="mr-2" />
                                    Address
                                </Link>
                                <Link to="/customer/profile/defaultAddress" className="flex px-4 py-2 hover:bg-gray-100">
                                    <MapPinCheck className="mr-2" />
                                    Default Address
                                </Link>
                                <Link to="/customer/profile/showOrders" className="flex px-4 py-2 hover:bg-gray-100">
                                    <ListOrdered className="mr-2" />
                                    Orders
                                </Link>

                                <button className="w-full text-left flex px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={hdlLogout}>
                                    <LogOut className="mr-2" />
                                    Logout
                                </button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default CtmNav