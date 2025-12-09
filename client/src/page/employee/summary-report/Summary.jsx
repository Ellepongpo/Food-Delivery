import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Summary = () => {
    const navigate = useNavigate()
    // sale date
    const [showSearchDay, setShowSearchDay] = useState(false)
    const [formSalePerDay, setFormSalePerDay] = useState({
        day: ""
    })

    const hdlSalePerDay = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.get('http://localhost:3000/api/salePerDay', {params: {day : formSalePerDay.day}})
            const result = res.data.result
            navigate('/employee/showSalePerDay' , {state : {result}})
        } catch (err) {
            console.log(err)
        }
    }

    //top 5 customer per month
    const [showSearchTop5 ,setShowSearchTop5] = useState(false)
    const [formTop5 , setFormTop5] = useState({
        month: ""
    })

    const hdlCustomerTop5 = async (e) =>{
        e.preventDefault()

        try{
            const res = await axios.get('http://localhost:3000/api/customerTopPerMonth', {params: {month: formTop5.month}})
            //console.log(res.data.result)
            const result = res.data.result
            navigate('/employee/showCustomerTopPerMonth' , {state : {result}})

        }catch(err){
            console.log(err)
        }
    }





    return (
        <div className="h-screen bg-white">

            <div className="flex items-center justify-center gap-2 pt-8">

                <div>
                    <button className="bg-amber-500 px-6 py-4 hover:bg-amber-600 cursor-pointer rounded-md"
                        onClick={() => setShowSearchDay(true)}>
                        ยอดขายต่อวัน / ไม่รวมค่าส่งและ vat
                    </button>
                </div>

                <div>
                    <button className="bg-amber-500 px-16 py-4 hover:bg-amber-600 cursor-pointer rounded-md"
                        onClick={()=> setShowSearchTop5(true)}>
                        ลูกค้า Top5 / เดือน
                    </button>
                </div>

                <div>
                    <button className="bg-amber-500 px-16 py-4 hover:bg-amber-600 cursor-pointer">
                        ยอดขายต่อวัน
                    </button>
                </div>

                <div>
                    <button className="bg-amber-500 px-16 py-4 hover:bg-amber-600 cursor-pointer">
                        ยอดขายต่อวัน
                    </button>
                </div>

                <div>
                    <button className="bg-amber-500 px-16 py-4 hover:bg-amber-600 cursor-pointer">
                        ยอดขายต่อวัน
                    </button>
                </div>


                {/* search day */}
                {showSearchDay && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

                        <div className="bg-white w-full max-w-md rounded-md shadow-md p-4">
                            <div className="text-center text-xl font-bold mb-4">
                                <span>ค้นหาวันที่</span>
                            </div>

                            <hr className="text-gray-300 m-4" />

                            <div className="flex flex-col items-center justify-center mt-4">

                                <form onSubmit={hdlSalePerDay}>

                                    <label className="block text-sm font-bold text-gray-500">วัน / เดือน / ปี</label>
                                    <input className="border px-16 py-1 border-gray-400 rounded-md"
                                        name="day"
                                        type="date"
                                        onChange={(e) => setFormSalePerDay({ ...formSalePerDay, [e.target.name]: e.target.value })}
                                    />

                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        <button className="bg-red-500 px-8 py-2 rounded-md text-white hover:bg-red-600 cursor-pointer"
                                            type="button" onClick={() => setShowSearchDay(false)}>
                                            Back
                                        </button>

                                        <button className="bg-blue-500 px-8 py-2 rounded-md text-white hover:bg-blue-600 cursor-pointer"
                                            type="submit">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                )}




                {/* Top5 */}
                {showSearchTop5 && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

                        <div className="bg-white w-full max-w-md rounded-md shadow-md p-4">
                            <div className="text-center font-bold text-xl">
                                <span>ค้นหาเดือน</span>
                            </div>

                            <hr className="text-gray-300 m-4" />

                            <div className="flex flex-col items-center justify-center">
                                <form onSubmit={hdlCustomerTop5}>
                                    <label className="block text-sm font-bold text-gray-700">เดือน</label>
                                    <input className="border px-16 py-1 border-gray-500 rounded-md"
                                        name="month"
                                        type="month"
                                        onChange={(e)=> setFormTop5({... formTop5, [e.target.name]: e.target.value})}
                                    />


                                    <div className="mt-8 flex items-center justify-center">
                                        <button className="bg-red-500 hover:bg-red-700 px-8 py-2 text-white mr-2 rounded-md cursor-pointer"
                                            type="button" onClick={()=> setShowSearchTop5(false)}>
                                            Back
                                        </button>

                                        <button className="bg-blue-500 hover:bg-blue-700 px-8 py-2 text-white rounded-md cursor-pointer"
                                            type="submit">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>



                        </div>

                    </div>
                )}
                

            </div>
   

        </div>
    )
}

export default Summary