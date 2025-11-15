import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useEmployeeStore from "../../../store/Employee-store"
import { toast } from "react-toastify"

const EditProduct = () => {
  const employee_id = useEmployeeStore((state) => state.employee.id)
  const navigate = useNavigate()
  const location = useLocation()
  const product = location?.state?.product
  //console.log(product)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [category, setCategory] = useState([])
  const [accessories, setAccessories] = useState([])
  const [selectAccessories, setSelectAccessories] = useState([])

  const [form, setForm] = useState({
    product_id: "",
    product_name: "",
    description: "",
    product_price: "",
    category_id: "",
    status: "",
    stock_qty_product: ""
  })

  useEffect(() => {
    setForm({
      product_id: product.product_id,
      product_name: product.product_name,
      description: product.description,
      product_price: product.product_price,
      category_id: product.category_id,
      status: product.status,
      stock_qty_product: product.stock_qty_product,
    })

    setImagePreview(`http://localhost:3000${product.product_image}`)

    // accessories เดิม (ถ้า backend ส่งมาเป็น string เช่น "ช้อน,ส้อม,ทิชชู่")
    const acc = product.accessories ? product.accessories.split(",").map(a => a.trim()) : []
    setSelectAccessories(acc)

  }, [product])


  useEffect(() => {
    hdlFetchCategory()
    hdlFetchAccessories()
  }, [])


  //ดึง category ทั้งหมด
  const hdlFetchCategory = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/category')
      setCategory(res.data.category)
    } catch (err) {
      console.log(err)
    }
  }

  //ดึง access ทั้งหมด
  const hdlFetchAccessories = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/accessories')
      setAccessories(res.data.accessories)
    } catch (err) {
      console.log(err)
    }
  }

  const hdlOnChange = (e) => {
    setForm({
      ...form, [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    //console.log(e)
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setImagePreview(URL.createObjectURL(file))
  }

  //เลือก accessories ใหม่
  const hdlSelectAccessories = (e) => {
    const value = e.target.value;
    let newValues = [];

    if (selectAccessories.includes(value)) {
      // ถ้ามีอยู่แล้ว  เอาออก
      newValues = selectAccessories.filter((x) => x !== value);
    } else {
      // ถ้ายังไม่มี  เพิ่มเข้า array
      newValues = [...selectAccessories, value];
    }

    setSelectAccessories(newValues);
    console.log("select accessories", newValues);
  }

  
  //เอาข้อมูลที่แก้ส่ง backend
  const hdlOnSubmit = async (e) => {
    e.preventDefault()

    try{

      const editProduct = new FormData()
      editProduct.append("product_id", form.product_id)
      editProduct.append("product_name", form.product_name)
      editProduct.append("description", form.description)
      editProduct.append("product_price", form.product_price)
      editProduct.append("stock_qty_product", form.stock_qty_product)
      editProduct.append("status", form.status)
      if(image){
        editProduct.append("product_image", image)
      }
      editProduct.append("category_id", form.category_id)
      editProduct.append("accessories_name", selectAccessories)
      editProduct.append("employee_id", employee_id)

      console.log(Object.fromEntries(editProduct.entries()))

      const res = await axios.post('http://localhost:3000/api/editProduct' , editProduct)
      toast.success(res.data.message)
      navigate('/employee/product')
    }catch(err){
      console.log(err)
      toast.error(err.responces.data.message)
    }
  }



  return (
    <div className='min-h-full flex flex-col items-center justify-center'>

      <div className='w-full bg-white max-w-2xl mb-auto mt-4'>
        <div className='text-center font-bold text-2xl p-4 mb-1'>
          Edit Product
        </div>

        <hr className='border-gray-100 p-1 mb-2' />

        <form className='flex flex-col items-center' onSubmit={hdlOnSubmit}>

          <div className='grid grid-cols-1 gap-4 w-full max-w-md'>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Product Name</label>
              <input className="border border-gray-300 rounded-md p-1 w-full"
                type="text"
                name='product_name'
                value={form.product_name}
                onChange={hdlOnChange}
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Product Description</label>
              <textarea className='border border-gray-300 rounded-md p-1 w-full'
                name="description"
                value={form.description}
                onChange={hdlOnChange}
              >
              </textarea>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Product Price</label>
              <input className='border border-gray-300 rounded-md p-1 w-full'
                type="number"
                name='product_price'
                value={form.product_price}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Stock Quantity Product</label>
              <input className='border border-gray-300 rounded-md p-1 w-full'
                type="number"
                name='stock_qty_product'
                value={form.stock_qty_product}
                onChange={hdlOnChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Product Image</label>
              <input className='border border-gray-300 rounded-md p-1 w-full'
                type="file"
                name='product_image'
                onChange={handleImageChange}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Categoey</label>
              <select name="category_id" className='border w-full border-gray-300 rounded-md p-1' value={form.category_id} onChange={hdlOnChange}>
                <option value="">--- select category ---</option>
                {
                  category.map((item) => (
                    <option value={item.category_id} key={item.category_id}>
                      {item.category_name}
                    </option>
                  ))
                }
              </select>
            </div>


            <div>
              <span className="block text-sm font-medium text-gray-700">Accessories</span>

              <div className="flex items-center gap-6 mt-2">
                {
                  accessories.map((item) => (
                    <label className="inline-flex items-center gap-2" key={item.accessories_name}>
                      <input
                        name={item.accessories_name}
                        type="checkbox"
                        value={item.accessories_name}
                        checked={selectAccessories.includes(item.accessories_name)}
                        onChange={hdlSelectAccessories}
                      />
                      {item.accessories_name}
                    </label>
                  ))
                }
              </div>

            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700">Status</span>
              <div className="flex items-center gap-6 mt-2">
                <label className="inline-flex items-center gap-2">
                  <input
                    name="status"
                    type="radio"
                    value="IsActive"
                    checked={form.status === "IsActive"}
                    onChange={hdlOnChange}
                  />
                  <span>IsActive</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    name="status"
                    type="radio"
                    value="InActive"
                    checked={form.status === "InActive"}
                    onChange={hdlOnChange}
                  />
                  <span>InActive</span>
                </label>
              </div>
            </div>

            <div>
              {imagePreview && (
                <div className='mt-4 flex justify-center'>
                  <img
                    src={imagePreview}
                    alt='Preview'
                    className='w-64 h-48 object-cover rounded-lg border border-gray-400 shadow-md'
                  />
                </div>
              )}
            </div>



            <div className="flex">
              <button className="w-full border-blue-500 bg-blue-500 m-4 p-2 rounded-md
                             text-white hover:bg-blue-700 cursor-pointer"
              >
                Edit
              </button>

              <button className="w-full border-red-500 bg-red-500 m-4 p-2 rounded-md
                             text-white hover:bg-red-700 cursor-pointer"
                type="button"
                onClick={() => navigate('/employee/product')}
              >
                Back
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  )
}

export default EditProduct