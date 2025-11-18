import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import useDeliveryStore from "../../../store/Customer-store"
import { MapPinned, Pencil, Trash2, CirclePlus } from 'lucide-react';

const Address = () => {
  const customer_id = useDeliveryStore((state) => state.customer.id)
  const [address, setAddress] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    hdlFetchAddress()
  }, [])

  const hdlFetchAddress = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/address', { customer_id: customer_id })
      //console.log(res.data.address)
      setAddress(res.data.address)
    } catch (err) {
      console.log(err)
    }
  }

  const editAddress = (address) =>{
    navigate('/customer/profile/editAddress', {state: {address}})
  }

  return (
    <div className="w-full h-screen">

      <div className="flex justify-between p-8">
        <div className="text-xl font-bold pt-2">
          Address Delivery
        </div>

        <div>
          <Link to='/customer/profile/addAddress'>
            <button className="border px-8 py-2 bg-blue-500 text-white rounded-md
            hover:bg-blue-700 cursor-pointer flex">
              <CirclePlus className="mr-4" />
              <span>เพิ่มที่อยู่</span>
            </button>
          </Link>
        </div>
      </div>
      {
        address.map((item) => (
          <div className="w-4xl ml-4 border h-24 border-gray-300 rounded-md mb-1" key={item.address_id}>
            <div className="flex justify-between">
              <div className="w-42 h-24 flex items-center justify-center">
                <MapPinned className="size-10 text-green-400" />
              </div>

              <div className="flex-1 p-2 flex items-center">
                <div className="flex flex-col-2 gap-2 text-md">
                  <div>
                    {item.house_no}
                  </div>
                  <div>
                    {item.sub_district}
                  </div>
                  <div>
                    {item.district}
                  </div>
                  <div>
                    {item.province}
                  </div>
                  <div>
                    {item.zip_code}
                  </div>
                  <div>
                    {item.phone}
                  </div>
                </div>
              </div>

              <div className="w-52 flex items-center justify-center">
                <button className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 mr-2 rounded-md cursor-pointer"
                  onClick={()=> editAddress(item)}>
                  <Pencil />
                </button>

                <Link>
                  <button className="bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded-md cursor-pointer">
                    <Trash2 />
                  </button>
                </Link>
              </div>

            </div>
          </div>
        ))
      }


    </div>
  )
}

export default Address