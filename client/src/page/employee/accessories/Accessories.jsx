import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Pencil } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Accessories = () => {
  const navigate = useNavigate()
  const [listAccessories, setListAccessories] = useState([])

  useEffect(() => {
    hdlFetchCategory()
  }, [])

  const hdlFetchCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/accessories')
      //console.log(res)
      setListAccessories(res.data.accessories)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="min-h-full bg-white flex flex-col items-center py-16 p-16">

      <div className="text-2xl font-bold text-center mb-16">
        Accessories
      </div>

      <div className="w-full max-w-7xl">
        <table className="w-full shadow-md text-center">
          <thead className="bg-gray-300">
            <tr>
              <th className="p-1 w-[10%]">name</th>
              <th className="p-1 w-[10%]">price</th>
              <th className="p-1 w-[10%]">Stock</th>
              <th className="p-1 w-[10%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              listAccessories.map((item) => (
                <tr key={item.accessories_name} className="hover:bg-gray-100 shadow-md mb-2">
                  <td className="p-6">{item.accessories_name}</td>
                  <td className="p-6">{item.accessories_price}</td>
                  <td className="p-6">{item.stock_qty_accessories}</td>
                  <td className="p-6">
                    <button className="bg-blue-600 px-6 py-1 mr-2 ml-2 text-white rounded-md cursor-pointer" 
                      onClick={()=>navigate('/employee/editAccessories')}>
                      <Pencil className="size-6"/>
                    </button>
                  </td>

                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Accessories