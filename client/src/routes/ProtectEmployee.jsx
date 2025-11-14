import useEmployeeStore from '../store/Employee-store'
import { Navigate } from 'react-router-dom'

const ProtectEmployee = ({element}) => {
    const employee = useEmployeeStore((state)=> state.employee)

    return employee ? element : <Navigate to="/employee/login" replace />
}

export default ProtectEmployee

