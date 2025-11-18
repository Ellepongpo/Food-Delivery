import axios from "axios"
import { useEffect, useState } from "react"
import useDeliveryStore from "../../../store/Customer-store"
import { toast } from "react-toastify"

const DefaultAddress = () => {
  const customer_id = useDeliveryStore((state) => state.customer.id)
  const [address, setAddress] = useState([])

  useEffect(() => {
    hdlFetchAddress()
  }, [])

  const hdlFetchAddress = async () => {

    try {
      const res = await axios.post('http://localhost:3000/api/address', { customer_id: customer_id })
      setAddress(res.data.address)
    } catch (err) {
      console.log(err)
    }
  }

  const hdlDefaultAddress = async (address_id) => {

    try {
      const res = await axios.post('http://localhost:3000/api/addDefaultAddress', { address_id, customer_id })
      toast.success(res.data.message)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full h-full'>
      <div className='flex justify-center'>
        <span className='text-xl font-bold p-4'>Default Address</span>
      </div>

      {
        address.map((item) => (
          <div className="w-4xl ml-4 border h-24 border-gray-300 rounded-md mb-1" key={item.address_id}>
            <div className="flex justify-between">

              <div className="w-42 h-24 flex items-center justify-center">
                <input
                  type="radio"
                  name="defaultAddress"
                  onChange={() => hdlDefaultAddress(item.address_id)}
                />
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

            </div>
          </div>
        ))
      }

    </div>
  )
}

export default DefaultAddress