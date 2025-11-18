import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useDeliveryStore from "../../../store/Customer-store"
import axios from "axios"
import { toast } from "react-toastify"

const AddAddress = () => {
    const navigate = useNavigate()
    const customer = useDeliveryStore((state) => state.customer)
    const [form, setForm] = useState({
        house_no: "",
        sub_district: "",
        district: "",
        province: "",
        zip_code: "",
        phone: "",
        customer_id: customer.id
    })

    const hdlOnChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
        //console.log(form)

    }

    const hdlSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:3000/api/addAddress', form)
            //console.log(res.data)
            toast.success(res.data.message)
            navigate('/customer/profile/address')
        }catch(err){
            toast.error(err.response.data.message)
            console.log(err)
        }
        
    }

    return (
        <div className="w-full h-full">
            <div className="text-center pt-16 text-xl font-bold">
                เพิ่มที่อยู่จัดส่ง
            </div>

            <div className="flex justify-center">

                <form onSubmit={hdlSubmit}>
                    <div className="grid grid-cols-2 gap-4 mt-10">
                        <div>
                            <label className="block text-sm text-gray-500 font-bold pb-2">บ้านเลขที่ (house_no)</label>
                            <input className="border px-4 py-1 rounded-md"
                                type="text"
                                name="house_no"
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 font-bold pb-2">ตำบล (sub district)</label>
                            <input className="border px-4 py-1 rounded-md"
                                type="text"
                                name="sub_district"
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 font-bold pb-2">อำเภอ (district)</label>
                            <input className="border px-4 py-1 rounded-md"
                                type="text"
                                name="district"
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 font-bold pb-2">จังหวัด (province)</label>
                            <input className="border px-4 py-1 rounded-md"
                                type="text"
                                name="province"
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 font-bold pb-2">รหัสไปรษณี (zip code)</label>
                            <input className="border px-4 py-1 rounded-md"
                                type="text"
                                name="zip_code"
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-500 font-bold pb-2">เบอร์โทร (phone)</label>
                            <input className="border px-4 py-1 rounded-md"
                                type="text"
                                name="phone"
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                    </div>

                    <div className="flex items-center justify-center gap-6 mt-16">
                        <button className="px-8 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-700 cursor-pointer">
                            Add
                        </button>

                        <Link to='/customer/profile/address'>
                            <button className="px-8 py-2 bg-red-500 rounded-md text-white hover:bg-red-700 cursor-pointer"
                                type="button">
                                Back
                            </button>
                        </Link>

                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddAddress