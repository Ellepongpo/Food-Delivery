import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react';
import useCartStore from '../store/Cart-store';

const MainNav = () => {
    const cart = useCartStore((state) => state.cart)
    //console.log("cart to navbar ",cart.length)

    return (
        <nav className='bg-gray-200 shadow-md'>
            <div className='mx-auto px-4'>

                <div className='flex justify-between h-16'>
                    <div className='flex items-center gap-4'>
                        <Link to={'/'} className='text-xl font-bold'>Food Delivery</Link>
                        <Link to={'/'} className='hover:text-blue-600'>Home</Link>
                        <Link to={'/menu'} className='hover:text-blue-600'>Menu</Link>
                    </div>

                    <div className='flex items-center gap-4'>
                        {/* Badge */}
                        <Link to={'/cart'} className='relative py-4'>
                            <ShoppingBag className='size-8' />
                            {cart.length > 0 && (
                                <span className='absolute top-0.5 left-6 bg-red-500 text-white text-xs 
                                rounded-full px-1.5 py-0.5 font-bold'>
                                    {cart.length}
                                </span>
                            )}
                        </Link>


                        <Link to={'/signup'} className='hover:text-blue-600'>Signup</Link>
                        <Link to={'/login'} className='hover:text-blue-600'>Login</Link>
                    </div>
                </div>

            </div>
        </nav>
    )
}

export default MainNav