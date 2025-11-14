import { Outlet } from 'react-router-dom'
import SideBarEmp from '../navbar/employee/SideBarEmp'
import HeaderEmp from '../navbar/employee/HeaderEmp'

const LayOutEMP = () => {
  return (
    <div className='flex h-screen'>
      <SideBarEmp />

      <div className='flex flex-1 flex-col'>
        <HeaderEmp />

        <main className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayOutEMP