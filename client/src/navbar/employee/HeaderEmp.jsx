import user from '../../assets/user.png'
import useEmployeeStore from '../../store/Employee-store'

const HeaderEmp = () => {
  const employee = useEmployeeStore((state)=> state.employee)

  return (
    <div className='bg-white h-16 flex items-center justify-end px-6 gap-3 mr-6'>
      <img className="size-8" src={user} alt="profile" />
      <span className='text-gray-700 font-medium'>
        {employee? `${employee.position} (${employee.first_name})`  : null}
      </span>
    </div>
  )
}

export default HeaderEmp