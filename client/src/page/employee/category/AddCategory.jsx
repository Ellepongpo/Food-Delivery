import axios from "axios"
import { useState } from "react"
import useEmployeeStore from "../../../store/Employee-store"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
//import Swal from 'sweetalert2'

const AddCategory = () => {
    const navigate = useNavigate()
    const employee = useEmployeeStore((state) => state.employee)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [form, setForm] = useState({
        category_name: "",
        status: ""
    })

    const hdlOnChange = (e) => {
        //console.log(e)
        setForm({
            ...form, [e.target.name]: e.target.value
        })
        console.log(form)
    }

    const handleImageChange = (e) => {
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

    const hdlSubmit = async (e) => {
        e.preventDefault()

        const categoryFormData = new FormData()
        categoryFormData.append("category_name", form.category_name)
        categoryFormData.append("category_image", image)
        categoryFormData.append("status", form.status)
        categoryFormData.append("createBy", employee.id)


        try {
            const res = await axios.post('http://localhost:3000/api/addCategory', categoryFormData)
            //console.log(res)
            toast.success(res.data.message)

        } catch (err) {
            //console.log(err)
            toast.error(err.response.data.message)
        }
    }


    return (
        <div className='min-h-full flex flex-col items-center justify-center'>
            <div className='w-full bg-white max-w-xl p-10 shadow-md mb-4'>

                <div className='text-2xl text-center font-bold p-4 mb-2'>
                    <span>Add Catagory</span>
                </div>

                <hr className='border-gray-100 p-2' />

                <form onSubmit={hdlSubmit}>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Category Name</label>
                            <input className='border w-full border-gray-300 p-1.5 rounded-md'
                                type='text'
                                name='category_name'
                                required
                                onChange={hdlOnChange}
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Category Image</label>
                            <input className='border w-full border-gray-300 p-1.5 rounded-md'
                                type='file'
                                name='category_image'
                                required
                                onChange={handleImageChange}
                            />
                        </div>

                        <div>
                            <span className='block text-sm font-medium text-gray-700'>Status</span>
                            <div className='flex items-center gap-6 mt-2'>
                                <label className='inline-flex items-center gap-2'>
                                    <input name='status' type="radio" value="IsActive" onChange={hdlOnChange} required /><span>IsActive</span>
                                </label>
                                <label className='inline-flex items-center gap-2'>
                                    <input name='status' type="radio" value="InActive" onChange={hdlOnChange} required /><span>InActive</span>
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

export default AddCategory



// Swal.fire({
//     title: 'บันทึกสำเร็จ!',
//     text: res.data.message,
//     icon: 'success',
//     confirmButtonColor: '#3085d6',
//     confirmButtonText: 'ตกลง'
// })

// Swal.fire({
//     title: 'เกิดข้อผิดพลาด!',
//     text: err.response.data.message,
//     icon: 'error',
//     confirmButtonText: 'ตกลง'
// })