import { Link } from "react-router-dom"
import useDeliveryStore from "../../../store/Customer-store"
import { MapPinned } from 'lucide-react';
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const InfoProfile = () => {
    const customer = useDeliveryStore((state) => state.customer)
    const [defaultAddress, setDefaultAddress] = useState([])
    //console.log(customer)

    useEffect(() => {
        showDefaultAddress()
    }, [defaultAddress])

    const showDefaultAddress = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/defaultAddress', { customer_id: customer.id })
            setDefaultAddress(res.data.defaultAddress)
            //console.log(defaultAddress)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='p-8 w-full h-full flex flex-col items-center'>
            <div className='text-xl font-bold text-center'>
                <span>Profile Customer</span>
            </div>

            <div className="p-8 grid grid-cols-2 gap-4 mt-10 mb-2 border border-gray-300">

                <div>
                    <span className="text-sm font-bold text-gray-500">ชื่อ (first name) : </span>
                    {customer.first_name}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">นามสกุล (last name) : </span>
                    {customer.last_name}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">วันเกิด (birthday) : </span>
                    {customer.birthday}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">อีเมล์ (e-mail) : </span>
                    {customer.email}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">รหัสผ่าน (password) : </span>
                    {customer.password}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">เบอร์โทร (phone) : </span>
                    {customer.phone}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">บ้านเลขที่ (house_no) : </span>
                    {customer.house_no}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">ตำบล (sub_district) : </span>
                    {customer.sub_district}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">อำเภอ (district) : </span>
                    {customer.district}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">จังหวัด (province) : </span>
                    {customer.province}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">รหัสไปรษณี (zip code) : </span>
                    {customer.zip_code}
                </div>

                <div>
                    <span className="text-sm font-bold text-gray-500">เพศ (gender) : </span>
                    {customer.gender}
                </div>

            </div>

            <div className="w-3xl p-8 py-4 flex flex-col">
                <div className="text-left mb-2 font-bold">
                    <span>Default Address</span>
                </div>

                <div className="border border-gray-300 rounded-md flex flex-row p-4">
                    <div className="mr-4 text-green-500">
                        <MapPinned />
                    </div>

                    {
                        defaultAddress.map((item) => (
                            <div key={item.address_id} className="flex gap-2">
                                <span>{item.house_no}</span>
                                <span>{item.sub_district}</span>
                                <span>{item.district}</span>
                                <span>{item.province}</span>
                                <span>{item.zip_code}</span>
                                <span>{item.phone}</span>
                            </div>
                        ))
                    }

                </div>
            </div>

            <Link to="/customer/profile/editProfile">
                <button className="py-2 mt-16 mr-2 bg-blue-600 w-sm text-white hover:bg-blue-700 cursor-pointer rounded-md">
                    Edit
                </button>
            </Link>



        </div>
    )
}

export default InfoProfile