import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { ShieldUser, MapPinHouse, MapPinCheck, ListOrdered, LogOut } from 'lucide-react';
import useDeliveryStore from "../../../store/Customer-store";
import { toast } from 'react-toastify'


const active = 'bg-orange-500 text-white flex items-center px-4 py-2 rounded-md'
const idle = 'text-black px-4 py-2 hover:bg-orange-400 hover:text-white rounded flex items-center'

const Profile = () => {
  const actionLogout = useDeliveryStore((state) => state.actionLogout)
  const navigate = useNavigate()

  const hdlLogout = async () => {
    try {
      const res = await actionLogout()
      toast.success(res.data.message)
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }
  }


  return (
    <div className="min-h-screen h-screen flex items-center justify-center">

      <div className="w-full max-w-7xl border border-white p-4 mb-16 overflow-y-auto shadow-xl rounded-md flex justify-between">

        <div className="border w-64 ml-8 border-gray-300 rounded-3xl shadow-md pt-8">
          <nav className="flex-col px-4 py-4 space-y-2">

            <label className="px-4 mt-6 mb-2 text-xs font-semibold capitalize tracking-wider text-gray-400 flex-col">
              Profile
            </label>

            <NavLink
              to="/customer/profile"
              end
              className={({ isActive }) => (isActive ? active : idle)}>
              <ShieldUser className="mr-2" />
              Profile
            </NavLink>

            <label className="px-4 mt-6 mb-2 text-xs font-semibold capitalize tracking-wider text-gray-400 flex-col">
              Address
            </label>

            <NavLink
              to="/customer/profile/address"
              end
              className={({ isActive }) => (isActive ? active : idle)}>
              <MapPinHouse className="mr-2" />
              Address
            </NavLink>

            <NavLink
              to="/customer/profile/defaultAddress"
              end
              className={({ isActive }) => (isActive ? active : idle)}>
              <MapPinCheck className="mr-2" />
              Default Address
            </NavLink>

            <label className="px-4 mt-6 mb-2 text-xs font-semibold capitalize tracking-wider text-gray-400 flex-col">
              Orders
            </label>

            <NavLink
              to="/customer/profile/showOrders"
              end
              className={({ isActive }) => (isActive ? active : idle)}>
              <ListOrdered className="mr-2" />
              Orders
            </NavLink>

          </nav>

          <nav className="mt-80">
            <button className="w-full text-left px-8 py-2 flex hover:text-red-500 cursor-pointer" onClick={hdlLogout}>
              <LogOut className="mr-2" />
              Logout
            </button>
          </nav>


        </div>



        <div className="border w-3/4 overflow-y-auto h-[80vh] border-gray-300 rounded-md shadow-md">
          <Outlet />
        </div>


      </div>

    </div>
  )
}

export default Profile