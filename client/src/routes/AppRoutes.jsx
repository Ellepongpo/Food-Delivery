import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../page/publicHome/Home'
import Cart from '../page/publicCart/Cart'
import Login from '../page/auth/Login'
import SignUp from '../page/auth/SignUp'
import LayOut from '../layouts/LayOut'
import LayOutEMP from '../layouts/LayOutEMP'
import Dashboard from '../page/employee/Dashboard'
import Category from '../page/employee/category/Category'
import Accessories from '../page/employee/accessories/Accessories'
import Product from '../page/employee/product/Product'
import LayOutCTM from '../layouts/LayOutCTM'
import Profile from '../page/customer/profile/Profile'
import Address from '../page/customer/address/Address'
import DefaultAddress from '../page/customer/address/DefaultAddress'
import LoginEmployee from '../page/auth/LoginEmployee'
import SignUpEmployee from '../page/auth/SignUpEmployee'
import InfoEmployee from '../page/employee/info/InfoEmployee'
import Orders from '../page/employee/orders/Orders'
import AddCategory from '../page/employee/category/AddCategory'
import EditCategory from '../page/employee/category/EditCategory'
import EditAccessories from '../page/employee/accessories/EditAccessories'
import AddProduct from '../page/employee/product/AddProduct'
import EditProduct from '../page/employee/product/EditProduct'
import Delivery from '../page/employee/rider/Delivery'
import ProtectCustomer from './ProtectCustomer'
import ProtectEmployee from './ProtectEmployee'
import Menu from '../page/publicMenu/Menu'
import DetailProduct from '../page/publicMenu/DetailProduct'
import Order from '../page/customer/orders/Order'
import InfoProfile from '../page/customer/profile/InfoProfile'
import EditProfile from '../page/customer/profile/EditProfile'
import AddAddress from '../page/customer/address/AddAddress'
import EditAddress from '../page/customer/address/EditAddress'
import ShowOrders from '../page/customer/orders/ShowOrders'
import DetailOrder from '../page/customer/orders/DetailOrder'
import CancelOrder from '../page/employee/orders/CancelOrder'
import UpdateOrder from '../page/employee/orders/UpdateOrder'





const router = createBrowserRouter([
    //หน้าที่เป็น public ไม่ต้อง login ก็สามารถดูได้
    {
        path: '/',
        element: <LayOut />,
        children: [
            { index: true, element: <Home /> },
            { path: 'menu', element: <Menu /> },
            { path: 'detailProduct/:id', element: <DetailProduct /> },
            { path: 'cart', element: <Cart /> },
            { path: 'login', element: <Login /> },
            { path: 'signup', element: <SignUp /> }
        ]
    },

    { path: '/employee/login', element: <LoginEmployee /> },
    //หน้าของ employee
    {
        path: '/employee',
        element: <ProtectEmployee element={<LayOutEMP />} />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'category', element: <Category /> },
            { path: 'addCategory', element: <AddCategory /> },
            { path: 'editCategory', element: <EditCategory /> },
            { path: 'accessories', element: <Accessories /> },
            { path: 'editAccessories', element: <EditAccessories />},
            { path: 'product', element: <Product /> },
            { path: 'addProduct', element: <AddProduct /> },
            { path: 'editProduct', element: <EditProduct /> },
            { path: 'orders', element: <Orders /> },
            { path: 'cancelOrder', element: <CancelOrder /> },
            { path: 'updateOrder/:order_id', element: <UpdateOrder /> },
            { path: 'delivery', element: <Delivery /> },
            { path: 'login', element: <LoginEmployee /> },
            { path: 'signup', element: <SignUpEmployee /> },
            { path: 'infoEmployee', element: <InfoEmployee /> }
        ]
    },
    //หน้าของ customer
    {
        path: '/customer',
        //element: <LayOutCTM />,
        // protect เป็นทางผ่าน
        element: <ProtectCustomer element={<LayOutCTM />} />,
        children: [
            { index: true, element: <Home /> },
            { path: 'cart', element: <Cart/> },
            { path: 'menu', element: <Menu /> },
            { path: 'order', element: <Order /> },
            { path: 'detailProduct/:id', element: <DetailProduct /> },
            { path: 'profile', element: <Profile />,
                children:[
                    { index: true, element: <InfoProfile /> },
                    { path: 'editProfile', element: <EditProfile /> },
                    { path: 'address', element: <Address /> },
                    { path: 'editAddress', element: <EditAddress /> },
                    { path: 'addAddress', element: <AddAddress /> },
                    { path: 'defaultAddress', element: <DefaultAddress />},
                    { path: 'showOrders', element: <ShowOrders />},
                    { path: 'detailOrder/:order_id', element: <DetailOrder />}
                ]
             },
        ]
    }

])

const AppRoutes = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default AppRoutes