import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useEmployeeStore from "../../../store/Employee-store"

const EditAccessories = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const employee_id = useEmployeeStore((state)=> state.employee.id)
  const accessories = location?.state?.accessories
  const [form , setForm] = useState({
    accessories_name: "",
    accessories_price: "",
    stock_qty_accessories: "",
    employee_id:""
  })

  useEffect(()=> {
    setForm({
      accessories_name: accessories.accessories_name,
      accessories_price: accessories.accessories_price,
      stock_qty_accessories: accessories.stock_qty_accessories,
      employee_id: employee_id
    })
  },[accessories])

  const hdlOnChange = (e)=> {
    setForm({
      ...form , [e.target.name]: e.target.value
    })
  }

  const hdlOnSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:3000/api/editAccessories', form)
      toast.success(res.data.message)
    }catch(err){
      console.log(err)
      toast.error(err.response?.data?.message)
    }

  }


  return (
    <div className="min-h-full flex items-center justify-center">

      <div className="bg-white w-full max-w-xl p-8 mb-16">

        <div className="h-14 flex justify-center">
          <span className="text-2xl font-bold">EditAccessories</span>
        </div>

        <hr className="text-gray-200 p-2 mx-2" />

        <div className="flex flex-col mt-2 items-center">
          <form onSubmit={hdlOnSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-bold text-gray-500 mb-2"> accessories name</label>
              <input className="border py-1 px-8 border-gray-400 rounded-md bg-gray-500 text-gray-300 text-center"
                type="text"
                name="accessories_name"
                value={form.accessories_name}
                disabled
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-bold text-gray-500 mb-2"> accessories price</label>
              <input className="border py-1 px-8 border-gray-400 rounded-md"
                type="text"
                name="accessories_price"
                value={form.accessories_price}
                onChange={hdlOnChange}
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-bold text-gray-500 mb-2"> stock quantity accessories</label>
              <input className="border py-1 px-8 border-gray-400 rounded-md"
                type="text"
                name="stock_qty_accessories"
                value={form.stock_qty_accessories}
                onChange={hdlOnChange}
              />
            </div>

            <div className="flex mt-8">
              <button className="w-full border-blue-500 bg-blue-500 m-4 p-2 rounded-md
                             text-white hover:bg-blue-700 cursor-pointer"
              >
                Edit
              </button>

              <button className="w-full border-red-500 bg-red-500 m-4 p-2 rounded-md
                             text-white hover:bg-red-700 cursor-pointer"
                type="button"
                onClick={() => navigate('/employee/accessories')}
              >
                Back
              </button>
            </div>



          </form>
        </div>
      </div>
    </div>
  )
}

export default EditAccessories