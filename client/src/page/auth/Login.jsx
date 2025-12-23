import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useDeliveryStore from '../../store/Customer-store'

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useDeliveryStore((state)=> state.actionLogin)
  //console.log("customer : " , customer , "login : ", login_id)

 
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const hdlOnChange = (e) => {
    setLogin({
      ...login, [e.target.name]: e.target.value
    })
    //console.log(login)
  }

  const hdlSubmit = async (e) => {
    e.preventDefault()
    
    try{
      const res = await actionLogin(login)
      toast.success(res.data.message)
      navigate('/customer/profile/address')
    }catch(err){
      console.log(err)
      toast.error(err.response?.data?.message)
    }
  }
  


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4' >

      <div className='w-full max-w-md bg-white shadow-lg p-10 mb-24 rounded-md'>
        <h2 className='text-3xl font-bold text-center text-gray-700 mb-6'>
          Login
        </h2>
        <hr className='border-gray-100 m-6' />

        <form onSubmit={hdlSubmit}>
          <div className='space-y-8'>
            <div className='grid grid-cols-1 gap-2'>
              <label className='block text-md font-medium text-gray-700'>E-mail</label>
              <input className='border w-full border-gray-300 rounded-md p-2'
                name='email'
                type="email"
                required
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-md font-medium text-gray-700'>Password</label>
              <input className='border w-full border-gray-300 rounded-md p-2'
                name='password'
                type="text"
                required
                onChange={hdlOnChange}
              />
            </div>

            <button className='w-full bg-blue-500 rounded-md py-2 text-white cursor-pointer'>
              login
            </button>

            <p className='text-center text-sm text-blue-500 hover:text-blue-700'>
              <Link to='/signup'>ยังไม่มีบัญชีสมาชิกใช่หรอไม่ ?</Link>
            </p>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login