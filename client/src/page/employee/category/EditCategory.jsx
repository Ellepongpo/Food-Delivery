import { useNavigate } from "react-router-dom"

const EditCategory = () => {
    const navigate = useNavigate()

    return (
        <div className='min-h-full flex flex-col items-center justify-center'>
            <div className='w-full bg-white max-w-xl p-10 shadow-md mb-4'>

                <div className='text-2xl text-center font-bold p-4 mb-2'>
                    <span>Edit Catagory</span>
                </div>

                <hr className='border-gray-100 p-2' />

                <form>
                    <div className='grid grid-cols-1 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Category Name</label>
                            <input className='border w-full border-gray-300 p-1.5 rounded-md'
                                type='text'
                                name='category_name'
                                required
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Category Image</label>
                            <input className='border w-full border-gray-300 p-1.5 rounded-md'
                                type='file'
                                name='category_image'
                                required
                            />
                        </div>

                        <div>
                            <span className='block text-sm font-medium text-gray-700'>Status</span>
                            <div className='flex items-center gap-6 mt-2'>
                                <label className='inline-flex items-center gap-2'>
                                    <input name='status' type="radio" value="IsActive" required /><span>IsActive</span>
                                </label>
                                <label className='inline-flex items-center gap-2'>
                                    <input name='status' type="radio" value="InActive" required /><span>InActive</span>
                                </label>
                            </div>
                        </div>

                        {/* <div>
                            {imagePreview && (
                                <div className='mt-4 flex justify-center'>
                                    <img
                                        src={imagePreview}
                                        alt='Preview'
                                        className='w-64 h-48 object-cover rounded-lg border border-gray-400 shadow-md'
                                    />
                                </div>
                            )}
                        </div> */}

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

export default EditCategory