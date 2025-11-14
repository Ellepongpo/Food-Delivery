import axios from 'axios'
import {create} from 'zustand'
import { persist } from 'zustand/middleware'

const employeeStore = (set,get) => ({
    employee: null,
    login_id: null,

    actionLogin: async (login) => {
        const res = await axios.post('http://localhost:3000/api/loginEmployee', login)
        //console.log(res.data)
        set({
            employee: res.data.employee,
            login_id: res.data.login_id
        })
        return res
    },

    actionLogout: async () => {
        const { employee, login_id } = get()  //ใช้ get() เพื่อดึงค่าปัจจุบัน

        const res = await axios.post('http://localhost:3000/api/logoutEmployee', { employee_id: employee.id, login_id:login_id })

        // เคลียร์ข้อมูลใน store
        set({ employee: null, login_id: null })
        localStorage.removeItem('employee-store')

        return res
    }

})

const usePersist = {
    name: 'employee-store'
}
const useEmployeeStore = create(persist(employeeStore, usePersist))

export default useEmployeeStore