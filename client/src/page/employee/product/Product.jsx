import axios from 'axios';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Product = () => {
  const navigate = useNavigate()
  const [listProduct, setListProduct] = useState([])

  useEffect(() => {
    hdlFetchProduct()
  }, [listProduct])

  const hdlFetchProduct = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/product')
      console.log(res.data.product)
      setListProduct(res.data.product)

    } catch (err) {
      console.log(err)
    }
  }

  const editProduct = (product) =>{
    navigate('/employee/editProduct' , {state: {product}})
  }

  return (
    <div className='min-h-screen bg-white p-1'>

      <div className='flex justify-between px-8 pt-8'>
        <div className='text-2xl font-bold'>
          Product
        </div>

        <div>
          <button className='border border-blue-500 hover:bg-blue-500 px-6 p-2 rounded-md text-blue-500
            hover:text-white cursor-pointer flex'
            onClick={() => navigate('/employee/addProduct')}
          >
            <Plus className='mr-2' />
            Add Product
          </button>
        </div>
      </div>

      <div className='w-full overflow-x-auto'>
        <table className='w-full mt-8 table-fixed'>
          <thead className='bg-gray-300 w-auto'>
            <tr>
              <th className='p-1 w-[10%]'>Name</th>
              <th className='p-1 w-[10%]'>Image</th>
              <th className='p-1 w-[14%]'>Description</th>
              <th className='p-1 w-[10%]'>Price</th>
              <th className='p-1 w-[10%]'>Category</th>
              <th className='p-1 w-[14%]'>Accessorries</th>
              <th className='p-1 w-[10%]'>Stock</th>
              <th className='p-1 w-[10%]'>Status</th>
              <th className='p-1 w-[14%]'>Action</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              listProduct.map((item) => (
                <tr key={item.product_id} className="hover:bg-gray-100 shadow-md mb-2">
                  <td className='p-1'>{item.product_name}</td>
                  <td className='p-1'>
                    <img src={`http://localhost:3000${item.product_image}`} className="size-20 mx-auto" />
                  </td>
                  <td className='p-1'>{item.description}</td>
                  <td className='p-1'>{item.product_price}</td>
                  <td className='p-1'>{item.category_name}</td>
                  <td className='p-1'>{item.accessories}</td>
                  <td className='p-1'>{item.stock_qty_product}</td>
                  {item.status === "IsActive" && (
                    <td className='p-1 text-green-700'>{item.status}</td>
                  )}
                  {item.status === "InActive" && (
                    <td className='p-1 text-red-700'>{item.status}</td>
                  )}
                  
                  

                  <td className="flex flex-row items-center justify-center py-8 text-white mr-16 ml-16">
                    <button className="bg-blue-500 px-6 py-1 mr-3 rounded-md cursor-pointer hover:bg-blue-700"
                      onClick={() => editProduct(item)}>
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

export default Product