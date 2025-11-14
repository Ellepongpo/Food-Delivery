import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const EditAddress = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const address = location?.state?.address
  const [form, setForm] = useState({
    address_id: "",
    house_no: "",
    sub_district: "",
    district: "",
    province: "",
    zip_code: "",
    phone: "",
  })

  useEffect(() => {
    if(!address) return

    setForm({
      address_id: address.address_id,
      house_no: address.house_no,
      sub_district: address.sub_district,
      district: address.district,
      province: address.province,
      zip_code: address.zip_code,
      phone: address.phone
    })
  }, [address])

  const hdlOnChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const hdlOnSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/api/editAddress', form)
      toast.success(res.data.message)
      navigate('/customer/profile/address')
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message)
    }
  }



  return (
    <div className="w-full h-full">
      <div className="text-center pt-16 text-xl font-bold">
        Edit Address
      </div>

      <div className="flex justify-center">

        <form onSubmit={hdlOnSubmit}>
          <div className="grid grid-cols-2 gap-4 mt-10">
            <div>
              <label className="block text-sm text-gray-500 font-bold pb-2">บ้านเลขที่ (house_no)</label>
              <input className="border px-4 py-1 rounded-md"
                type="text"
                name="house_no"
                value={form.house_no}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-bold pb-2">ตำบล (sub district)</label>
              <input className="border px-4 py-1 rounded-md"
                type="text"
                name="sub_district"
                value={form.sub_district}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-bold pb-2">อำเภอ (district)</label>
              <input className="border px-4 py-1 rounded-md"
                type="text"
                name="district"
                value={form.district}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-bold pb-2">จังหวัด (province)</label>
              <input className="border px-4 py-1 rounded-md"
                type="text"
                name="province"
                value={form.province}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-bold pb-2">รหัสไปรษณี (zip code)</label>
              <input className="border px-4 py-1 rounded-md"
                type="text"
                name="zip_code"
                value={form.zip_code}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-500 font-bold pb-2">เบอร์โทร (phone)</label>
              <input className="border px-4 py-1 rounded-md"
                type="text"
                name="phone"
                value={form.phone}
                onChange={hdlOnChange}
              />
            </div>

          </div>

          <div className="flex items-center justify-center gap-6 mt-16">
            <button className="px-8 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-700 cursor-pointer"
              type="submit">
              Edit
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

export default EditAddress