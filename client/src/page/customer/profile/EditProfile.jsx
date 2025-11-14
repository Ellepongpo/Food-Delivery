import { useEffect, useState } from "react"
import useDeliveryStore from "../../../store/Customer-store"

const EditProfile = () => {
  const customer = useDeliveryStore((state) => state.customer)
  //console.log(customer)
  const [form, setForm] = useState({
    customer_id : "",
    first_name: "",
    last_name: "",
    birthday: "",
    email: "",
    password: "",
    house_no: "",
    sub_district: "",
    district: "",
    province: "",
    zip_code: "",
    phone: "",
    gender:""
  })

  useEffect(()=> {
    if(customer){
      setForm({
        customer_id : customer.id ,
        first_name: customer.first_name,
        last_name: customer.last_name,
        birthday: customer.birthday,
        email: customer.email,
        password: customer.password,
        house_no: customer.house_no,
        sub_district: customer.sub_district,
        district: customer.district,
        province: customer.province,
        zip_code: customer.zip_code,
        phone: customer.phone,
        gender: customer.gender
      })
    }
  },[customer])

  const hdlOnChange = (e) =>{
    setForm({
      ...form , [e.target.name]: e.target.value
    })
    
  }
  

console.log(form)
  return (
    <div className="h-full p-2">
      <div className="h-10 flex items-center justify-center">
        <span className="text-xl font-bold">แก้ไขข้อมูลส่วนตัว</span>
      </div>

      <hr className="text-gray-300 mx-8 mt-2" />

      <div className="mt-2 h-2/3 flex justify-center">

          <form className="w-xl flex flex-col items-center justify-center pb-4">

            {/* ชื่อ-นามสกุล */}
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <label className="block text-sm text-gray-700"> ชื่อ </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="first_name"
                  type="text"
                  value={form.first_name}
                  onChange={hdlOnChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700"> นามสกุล </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="last_name"
                  type="text"
                  value={form.last_name}
                  onChange={hdlOnChange}
                />
              </div>
            </div>

            {/* วันเกิด - email */}
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <label className="block text-sm text-gray-700"> วันเกิด </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed"
                  name="birthday"
                  value={form.birthday}
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700"> อีเมล์ </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={hdlOnChange}
                />
              </div>
            </div>

            {/* รหัสผ่าน - เบอร์โทร */}
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <label className="block text-sm text-gray-700"> รหัสผ่าน </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="password"
                  value={form.password}
                  type="text"
                  onChange={hdlOnChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700"> เบอร์โทร </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={hdlOnChange}
                />
              </div>
            </div>

            {/* บ้านเลขที่  - ตำบล */}
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <label className="block text-sm text-gray-700"> บ้านเลขที่ </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="house_no"
                  value={form.house_no}
                  type="text"
                  onChange={hdlOnChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700"> ตำบล </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="sub_district"
                  type="text"
                  value={form.sub_district}
                  onChange={hdlOnChange}
                />
              </div>
            </div>

            {/* อำเภอ  - จังหวัด */}
            <div className="grid grid-cols-2 gap-6 mb-2">
              <div>
                <label className="block text-sm text-gray-700"> อำเภอ </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="district"
                  value={form.district}
                  type="text"
                  onChange={hdlOnChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700"> จังหวัด </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="province"
                  type="text"
                  value={form.province}
                  onChange={hdlOnChange}
                />
              </div>
            </div>


            {/* รหัสไปรษณี - เพศ */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-700"> รหัสไปรษณี </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md"
                  name="zip_code"
                  value={form.zip_code}
                  type="text"
                  onChange={hdlOnChange}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700"> เพศ </label>
                <input className="border px-6 py-1 border-gray-400 rounded-md bg-gray-300 text-gray-500 cursor-not-allowed"
                  name="gender"
                  value={form.gender}
                  disabled
                />
              </div>
            </div>

          </form>
      </div>

      <div className="border h-18 mt-2">
        button
      </div>
    </div>
  )
}

export default EditProfile