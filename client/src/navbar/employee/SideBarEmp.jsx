import { NavLink, useNavigate } from "react-router-dom"
import {
  LayoutDashboard, ChartBarStacked,
  Utensils, Hamburger, BellRing, BookX,
  UserRoundPlus, UserRoundPen, LogOut, Motorbike
} from 'lucide-react';
import useEmployeeStore from "../../store/Employee-store";
import { toast } from "react-toastify";

const active = 'bg-gray-900 text-white flex items-center px-4 py-2 rounded-md'
const idle = 'text-gray-300 px-4 py-2 hover:bg-gray-700 hover:text-white rounded flex items-center'


const SideBarEmp = () => {
  const position = useEmployeeStore((state) => state.employee?.position)
  //console.log("position : " , position)
  const navigate = useNavigate()
  const actionLogout = useEmployeeStore((state) => state.actionLogout)

  const hdlLogout = async () => {
    try {
      const res = await actionLogout()
      navigate('/employee/login')
      toast.success(res.data?.message)
    } catch (err) {
      toast.error(err.response?.data?.message)
    }
  }



  return (
    <div className="bg-gray-800 w-60 flex flex-col h-screen text-white">

      <div className="h-24 bg-gray-900 flex items-center justify-center font-bold text-xl">
        Dashboard Employee
      </div>


      <nav className="flex-col px-4 py-4 space-y-2">

        {(position === "Manager" || position === "Staff" || position === "Rider") && (
          <NavLink
            to={'/employee'}
            end
            className={({ isActive }) => isActive ? active : idle}>
            <LayoutDashboard className="mr-2" />
            Dashborad
          </NavLink>
        )}

        {(position === "Manager" || position === "Staff") && (
          <>
            <NavLink
              to={'category'}
              className={({ isActive }) => isActive ? active : idle}>
              <ChartBarStacked className="mr-2" />
              Category
            </NavLink>

            <NavLink
              to={'accessories'}
              className={({ isActive }) => isActive ? active : idle}>
              <Utensils className="mr-2" />
              Accessories
            </NavLink>

            <NavLink
              to={'product'}
              className={({ isActive }) => isActive ? active : idle}>
              <Hamburger className="mr-2" />
              Product
            </NavLink>
          </>
        )}
      </nav>

      {(position === "Manager" || position === "Staff") && (
        <>
          <label className="px-4 mt-6 mb-2 text-xs font-semibold capitalize tracking-wider text-gray-400 flex-col">
            Order Management
          </label>

          <nav className="flex-col px-4 py-4 space-y-2">
            <NavLink
              to={'orders'}
              className={({ isActive }) => isActive ? active : idle}>
              <BellRing className="mr-2" />
              Orders
            </NavLink>

            <NavLink
              to={'cancelOrder'}
              className={({ isActive }) => isActive ? active : idle}>
              <BookX className="mr-2" />
              Cancelled Order
            </NavLink>
          </nav>
        </>
      )}


      {position === "Manager" &&
        <>
          <label className="px-4 mt-6 mb-2 text-xs font-semibold capitalize tracking-wider text-gray-400 flex-col">
            Employee Mangement
          </label>

          <nav className="flex-col px-4 py-4 space-y-2 ">
            <NavLink
              to={'signup'}
              className={({ isActive }) => isActive ? active : idle}>
              <UserRoundPlus className="mr-2" />
              Signup Employee
            </NavLink>

            <NavLink
              to={'listEmployee'}
              className={({ isActive }) => isActive ? active : idle}>
              <UserRoundPen className="mr-2" />
              Employee
            </NavLink>
          </nav>
        </>
      }


      {(position === "Rider" || position === "Manager") &&
        <>
          <label className="px-4 mt-6 mb-2 text-xs font-semibold capitalize tracking-wider text-gray-400 flex-col">
            Delivery Mangement
          </label>

          <nav className="flex-1 px-4 py-4 space-y-2 ">
            <NavLink
              to={'delivery'}
              className={({ isActive }) => isActive ? active : idle}>
              <Motorbike className="mr-2" />
              Delivery
            </NavLink>
          </nav>
        </>
      }

      <button className="px-8 py-4 flex cursor-pointer mt-auto hover:text-red-300" onClick={hdlLogout}>
        <LogOut className="mr-2" />
        Logout
      </button>
    </div>
  )
}

export default SideBarEmp