import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useEmployeeStore from "../../../store/Employee-store"
import axios from "axios"
import { toast } from "react-toastify"

const EditEmployee = () => {
  const location = useLocation()
  const employee = location?.state?.employee
  const editBy = useEmployeeStore((state)=> state.employee.id)
  const navigate = useNavigate()

  console.log(employee)

  const [form , setForm] = useState({
    employee_id: "",
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    house_no:"",
    sub_district:"",
    district:"",
    province:"",
    zip_code:"",
    phone:"",
    position:""
  })

  useEffect(()=> {
    setForm({
      employee_id: employee.employee_id,
      first_name: employee.first_name,
      last_name: employee.last_name,
      email: employee.email,
      password: employee.password,
      house_no: employee.house_no,
      sub_district: employee.sub_district,
      district: employee.district,
      province: employee.province,
      zip_code: employee.zip_code,
      phone: employee.phone,
      position: employee.position,
      editBy: editBy
    })
  },[])

  const hdlOnChange = (e) => {
    setForm({
      ...form , [e.target.name]: e.target.value
    })
    //console.log(form)
  }


  const hdlOnSubmit = async (e) => {
    e.preventDefault()

    try{
      const res = await axios.post('http://localhost:3000/api/editEmployee' , form)
      toast.success(res.data.message)
      navigate('/employee/listEmployee')
    }catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
  }




  return (
    <div className="min-h-full flex items-center justify-center">

      <div className="bg-white p-4 w-full max-w-3xl shadow-md">
        <div className="h-16 flex items-center justify-center">
          <span className="text-2xl font-bold">Edit Employee</span>
        </div>

        <hr className="text-gray-200 mx-8 mb-2" />

        <div className="p-4">

          <form onSubmit={hdlOnSubmit}>

            <div className="grid grid-cols-2 gap-2 px-8">

              {/* first name - last name */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">ชื่อ (first name)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={hdlOnChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">นามกสุล (last name)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="last_name"
                    value={form.last_name}
                    onChange={hdlOnChange}
                  />
                </div>
              </div>

              {/* birthday - email */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">วันเกิด (birthday)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md bg-gray-400 text-gray-600 cursor-not-allowed"
                    type="text"
                    value={employee.birthday}
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">อีเมล์ (e-mail)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={hdlOnChange}
                  />
                </div>
              </div>

              {/* password - phone */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">รหัสผ่าน (password)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="password"
                    value={form.password}
                    onChange={hdlOnChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">เบอร์โทร (phone)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={hdlOnChange}
                  />
                </div>
              </div>


              {/* house_no - sub-district */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">บ้านเลขที่ (house_no)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="house_no"
                    value={form.house_no}
                    onChange={hdlOnChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">ตำบล (sub_district)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="sub_district"
                    value={form.sub_district}
                    onChange={hdlOnChange}
                  />
                </div>
              </div>


              {/* district - province */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">อำเภอ (district)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="district"
                    value={form.district}
                    onChange={hdlOnChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">จังหวัด (province)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="province"
                    value={form.province}
                    onChange={hdlOnChange}
                  />
                </div>
              </div>


              {/* zip_code - gender */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">รหัสไปรษณี (zip_code)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md"
                    type="text"
                    name="zip_code"
                    value={form.zip_code}
                    onChange={hdlOnChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">เพศ (gender)</label>
                  <input className="border w-full p-1 border-gray-400 rounded-md bg-gray-400 text-gray-600 cursor-not-allowed"
                    type="text"
                    value={employee.gender}
                    disabled
                  />
                </div>
              </div>


              {/* position */}
              <div className="space-y-2">
                <div>
                  <label className="block text-sm text-gray-600">ตำแหน่ง (position)</label>
                  
                  <select name="position" value={form.position} onChange={hdlOnChange} className="border w-full p-1 border-gray-400 rounded-md">
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                    <option value="Rider">Rider</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="p-2 mt-9 flex items-center justify-center gap-8">
              <button className="bg-blue-500 px-16 py-3 text-white hover:bg-blue-700 rounded-md cursor-pointer"
              type="submit">
                Edit
              </button>

              <button className="bg-red-500 px-16 py-3 text-white hover:bg-red-700 rounded-md cursor-pointer"
              type="button" onClick={()=> navigate('/employee/listEmployee')}>
                Back
              </button>
            </div>



          </form>
        </div>
      </div>
    </div>
  )
}

export default EditEmployee