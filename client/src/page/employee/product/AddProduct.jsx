import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useEmployeeStore from "../../../store/Employee-store"
import { toast } from "react-toastify"

const AddProduct = () => {
    const employee = useEmployeeStore((state) => state.employee)
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [accessories, setAccessories] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [image, setImage] = useState(null)
    const [form, setForm] = useState({
        product_name: "",
        description: "",
        product_price: "",
        stock_qty_product: "",
        category_id: "",
        status: ""
    })
    const [selectAccessories, setSelectAccessories] = useState([])

    useEffect(() => {
        hdlFetchCategory()
        hdlFetchAccessories()
    }, [])

    //ดึงข้อมูล category
    const hdlFetchCategory = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/category')
            //console.log(res)
            setCategory(res.data.category)
        } catch (err) {
            console.log(err)
        }
    }

    //ดึงค่า accesoories
    const hdlFetchAccessories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/accessories')
            //console.log("accessories : " , res)
            setAccessories(res.data.accessories)
        } catch (err) {
            console.log(err)
        }
    }

    //show image
    const hdlImageChange = (e) => {
        //console.log(e)
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        } else {
            setImage(null)
            setImagePreview(null)
        }
    }

    //set form
    const hdlOnChange = (e) => {
        setForm({
            ...form, [e.target.name]: e.target.value
        })
        //console.log("form : ", form)
    }

    //select accesoories
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


    //เชื่อม backend
    const hdlSubmit = async (e) => {
        e.preventDefault()

        const productFormData = new FormData()
        productFormData.append("product_name", form.product_name)
        productFormData.append("description", form.description)
        productFormData.append("product_price", form.product_price)
        productFormData.append("stock_qty_product", form.stock_qty_product)
        productFormData.append("product_image", image)
        productFormData.append("category_id", form.category_id)
        productFormData.append("accessories_name", selectAccessories)
        productFormData.append("status", form.status)
        productFormData.append("createBy", employee.id)

        //console.log(productFormData)
        console.log(Object.fromEntries(productFormData.entries()));

        try {
            const res = await axios.post('http://localhost:3000/api/addProduct', productFormData)
            //console.log(res.data)
            toast.success(res.data?.message)
        } catch (err) {
            toast.error(err.response.data.message)
            //console.log(err)
        }

    }


    return (
        <div className='min-h-full flex flex-col items-center justify-center'>

            <div className='w-full bg-white max-w-2xl mb-auto mt-4'>
                <div className='text-center font-bold text-2xl p-4 mb-1'>
                    AddProduct
                </div>

                <hr className='border-gray-100 p-1 mb-2' />

                <form className='flex flex-col items-center' onSubmit={hdlSubmit}>

                    <div className='grid grid-cols-1 gap-4 w-full max-w-md'>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Product Name</label>
                            <input className="border border-gray-300 rounded-md p-1 w-full"
                                type="text"
                                name='product_name'
                                required
                                onChange={hdlOnChange}
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Product Description</label>
                            <textarea className='border border-gray-300 rounded-md p-1 w-full' name="description" onChange={hdlOnChange}></textarea>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Product Price</label>
                            <input className='border border-gray-300 rounded-md p-1 w-full'
                                type="number"
                                name='product_price'
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Stock Quantity</label>
                            <input className='border border-gray-300 rounded-md p-1 w-full'
                                type="number"
                                name='stock_qty_product'
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Product Image</label>
                            <input className='border border-gray-300 rounded-md p-1 w-full'
                                type="file"
                                name='product_image'
                                required
                                onChange={hdlImageChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Categoey</label>
                            <select name="category_id" className='border w-full border-gray-300 rounded-md p-1' required onChange={hdlOnChange}>
                                <option value="">--- select category ---</option>
                                {
                                    category.map((item) => (
                                        <option value={item.category_id} key={item.category_id}> {item.category_name} </option>
                                    ))
                                }
                            </select>
                        </div>


                        <div>
                            <span className="block text-sm font-medium text-gray-700">Accessories</span>

                            <div className="flex items-center gap-6 mt-2" onChange={hdlSelectAccessories}>
                                {
                                    accessories.map((item) => (
                                        <label className="inline-flex items-center gap-2" key={item.accessories_name}>
                                            <input name={item.accessories_name} type="checkbox" value={item.accessories_name} />{item.accessories_name}
                                        </label>
                                    ))
                                }
                            </div>

                        </div>

                        <div>
                            <span className="block text-sm font-medium text-gray-700">Status</span>
                            <div className="flex items-center gap-6 mt-2">
                                <label className="inline-flex items-center gap-2">
                                    <input name="status" type="radio" value="IsActive" onChange={hdlOnChange} required /><span>IsActive</span>
                                </label>
                                <label className="inline-flex items-center gap-2">
                                    <input name="status" type="radio" value="InActive" onChange={hdlOnChange} required /><span>InActive</span>
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
                                Add
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

export default AddProduct