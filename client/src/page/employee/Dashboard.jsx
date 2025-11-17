import useEmployeeStore from "../../store/Employee-store"

const Dashboard = () => {
  const employee = useEmployeeStore((state)=> state.employee)
  console.log(employee)
  return (
    <div className="min-h-full bg-white flex items-center justify-center">

      <div className="text-7xl mb-16 font-bold">
        <span>Welcome {employee.first_name}</span>
      </div>

    </div>
  )
}

export default Dashboard