import axios from 'axios'
import { create } from 'zustand'
import { persist } from 'zustand/middleware' // local storage


const deliveryStore = (set,get) => ({
    customer: null,
    login_id: null,

    actionLogin: async (login) => {
        const res = await axios.post('http://localhost:3000/api/login', login)
        //console.log(res.data)
        set({
            customer: res.data.customer,
            login_id: res.data.login_id
        })
        return res
    },

    setCustomer : (customer) => {
        set({
            customer : customer
        })
    },

    actionLogout: async () => {
        const { customer, login_id } = get()  //ใช้ get() เพื่อดึงค่าปัจจุบัน
        //console.log("customer:", customer)
        //console.log("login_id:", login_id)

        const res = await axios.post('http://localhost:3000/api/logout', { customer_id: customer.id, login_id:login_id })

        // เคลียร์ข้อมูลใน store
        set({ customer: null, login_id: null })
        localStorage.removeItem('customer-store')

        return res
    }
})

//เก็บข้อมูลไว้ที่ local storage เพื่อไม่ให้เวลา รีเฟรซหน้าแล้วข้อมูลการ login มันหาย
const usePersist = {
    name: 'customer-store'
}
const useDeliveryStore = create(persist(deliveryStore, usePersist))

export default useDeliveryStore
