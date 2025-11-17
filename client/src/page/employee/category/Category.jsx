import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Pencil, Trash2 } from 'lucide-react';
import axios from "axios";



const Category = () => {
  const navigate = useNavigate()
  const [listCategory, setListCategory] = useState([])

  useEffect(() => {
    hdlFetch()
  }, [])

  const hdlFetch = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/category')
      //console.log(res.data.category)
      setListCategory(res.data.category)
    } catch (err) {
      console.log(err)
    }


  }

  const addCategory = () => {
    navigate('/employee/addCategory')
  }

  const editCategory = (category) => {
    navigate('/employee/editCategory', { state: { category } })
  }

  return (
    <div className="min-h-screen bg-white shadow-md p-16">

      <div className="flex justify-between mb-8">
        <div className="text-2xl font-bold mt-4 ml-6">
          Category
        </div>

        <div className="mr-6">
          <button className="w-full px-4 py-3 rounded-xl
          border border-blue-500 text-blue-600
          font-semibold hover:bg-blue-500 hover:text-white
          transition-all duration-200 flex cursor-pointer"
            onClick={addCategory}>
            <Plus className="mr-2" />
            Add Category
          </button>
        </div>



      </div>

      <div className="w-full">
        <table className="w-full text-center">
          <thead className="bg-gray-300 text-gray-700">
            <tr>
              <th className="p-2 w-[20%]">Category Name</th>
              <th className="p-2 w-[20%]">Image</th>
              <th className="p-2 w-[20%]">Status</th>
              <th className="p-2 w-[20%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              listCategory.map((item) => (
                <tr key={item.category_id} className="hover:bg-gray-100 shadow-md mb-2">
                  <td className="p-2">{item.category_name}</td>
                  <td className="p-2">
                    <img src={`http://localhost:3000${item.category_image}`} className="size-20 mx-auto" />
                  </td>
                  {item.status === "IsActive" && (
                    <td className="p-2 text-green-700">{item.status}</td>
                  )}
                  {item.status === "InActive" && (
                    <td className="p-2 text-red-700">{item.status}</td>
                  )}

                  <td className="text-white">
                    <button className="bg-blue-500 px-6 py-1 mr-3 rounded-md cursor-pointer hover:bg-blue-700"
                      onClick={() => editCategory(item)}>
                      <Pencil />
                    </button>

                    <button className="bg-red-600 px-6 py-1 rounded-md cursor-pointer">
                      <Trash2 />
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

export default Category