import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useEmployeeStore from "../../../store/Employee-store"
import axios from "axios"
import { toast } from "react-toastify"

const EditCategory = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const employee_id = useEmployeeStore((state) => state.employee.id)
    const category = location?.state?.category

    console.log(category)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    const [form, setForm] = useState({
        category_id: "",
        category_name: "",
        status: "",
    })

    useEffect(() => {
        setForm({
            category_id: category.category_id,
            category_name: category.category_name,
            status: category.status
        })
        setImagePreview(`http://localhost:3000${category.category_image}`)
    }, [category])

    
    const hdlOnChange = (e) => {
        setForm({
            ...form, [e.target.name] : e.target.value
        })
    }
    
    const handleImageChange = (e) => {
        //console.log(e)
        const file = e.target.files[0]
        if (!file) return
            
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
    }


    const hdlOnSubmit = async (e)=> {
        e.preventDefault()

        const editCategory = new FormData()
        editCategory.append("category_id", form.category_id)
        editCategory.append("category_name", form.category_name)
        editCategory.append("employee_id", employee_id)
        editCategory.append("status" , form.status)
        if(image){
            editCategory.append("category_image", image)
        }

        try{
            const res = await axios.post('http://localhost:3000/api/editCategory', editCategory)
            toast.success(res.data.message)
        }catch(err){
            console.log(err)
            toast.error(err.response.data.message)
        }

    }

    return (
        <div className='min-h-full flex flex-col items-center justify-center'>
            <div className='w-full bg-white max-w-xl p-10 shadow-md mb-4'>

                <div className='text-2xl text-center font-bold p-4 mb-2'>
                    <span>Edit Catagory</span>
                </div>

                <hr className='border-gray-100 p-2' />

                <form onSubmit={hdlOnSubmit}>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Category Name</label>
                            <input className='border w-full border-gray-300 p-1.5 rounded-md'
                                type='text'
                                name='category_name'
                                value={form.category_name}
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Category Image</label>
                            <input className='border w-full border-gray-300 p-1.5 rounded-md'
                                type='file'
                                name='category_image'
                                onChange={handleImageChange}
                            />
                        </div>

                        <div>
                            <span className='block text-sm font-medium text-gray-700'>Status</span>
                            <div className='flex items-center gap-6 mt-2'>
                                <label className='inline-flex items-center gap-2'>
                                    <input
                                        name='status'
                                        type="radio"
                                        value="IsActive"
                                        checked={form.status === "IsActive"}
                                        onChange={hdlOnChange}
                                    />
                                    <span>IsActive</span>
                                </label>
                                <label className='inline-flex items-center gap-2'>
                                    <input
                                        name='status'
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
                                onClick={() => navigate('/employee/category')}
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

export default EditCategory