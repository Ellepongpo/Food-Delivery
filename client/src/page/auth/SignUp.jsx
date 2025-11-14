import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
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
    gender: ""
  })

  const hdlOnChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const hdlSubmit = async (e) => {
    e.preventDefault() //ป้องกันการรีเฟรชหน้า เมื่อมีการ submit
    console.log(form)

    //send to backend
    try {
      const res = await axios.post('http://localhost:3000/api/signUp', form)
      console.log(res)
      toast.success(res.data.message)
      navigate('/login')
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
  }





  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-2xl bg-white p-10 shadow-lg mb-16 rounded-md'>

        <h2 className='text-3xl font-bold text-center text-gray-700 mb-6'>
          Signup
        </h2>
        <hr className='border-gray-100 m-6' />

        <form className='space-y-4' onSubmit={hdlSubmit}>

          {/* first name , last name */}
          <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>ชื่อ (first name)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='first_name'
                type='text'
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>นามสกุล (last name)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='last_name'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>
          </div>

          {/* birthday , email */}
          <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>วันเกิด (birthday)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='birthday'
                type="date"
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>อีเมล์ (e-mail)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='email'
                type="email"
                required
                onChange={hdlOnChange}
              />
            </div>
          </div>

          {/* password , house no */}
          <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>รหัสผ่าน (password)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='password'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>บ้านเลขที่ (house_no)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='house_no'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>
          </div>

          {/* sub_district , district */}
          <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>ตำบล (sub district)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='sub_district'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>อำเภอ (district)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='district'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>
          </div>

          {/* province , zip_code */}
          <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>จังหวัด (province)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='province'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>รหัสไปรษณี (zip code)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='zip_code'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>
          </div>

          {/* phone , gender */}
          <div className='grid gird-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>เบอร์โทร (phone)</label>
              <input className='border w-full border-gray-300 rounded-md p-1'
                name='phone'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <span className='block text-sm font-medium text-gray-700'>เพศ (gender)</span>
              <div className='flex items-center gap-6 mt-2'>
                <label className='inline-flex items-center gap-2'>
                  <input name='gender' type="radio" value="Male"  required onChange={hdlOnChange} /><span>ชาย (male)</span>
                </label>
                <label className='inline-flex items-center gap-2'>
                  <input name='gender' type="radio" value="Female" required onChange={hdlOnChange} /><span>หญิง (female)</span>
                </label>
              </div>
            </div>
          </div>


          <button className='w-full bg-blue-500 rounded-md py-2 text-white cursor-pointer'>sign up</button>

          <p className='text-center text-sm text-blue-500 hover:text-blue-700'>
            <Link to='/login'>มีบัญชีสมาชิกอยู่แล้วใช่หรือไม่ ?</Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignUp