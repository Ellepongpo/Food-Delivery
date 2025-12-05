import axios from "axios"
import { useState } from "react"

const SalePerDay = () => {
    // sale date
    const [showSearchDay, setShowSearchDay] = useState(false)
    const [formSalePerDay, setFormSalePerDay] = useState({
        day: ""
    })
    const [showSalePerDay, setshowSalePerDay] = useState(false)
    const [resultSalePerDay, setResultSalePerDay] = useState([])

    const hdlSalePerDay = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:3000/api/salePerDay', formSalePerDay)
            //console.log(res.data.result)
            setResultSalePerDay(res.data.result)
            setShowSearchDay(false)
            setshowSalePerDay(true)
        } catch (err) {
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

                <div>
                    <button className="bg-amber-500 px-16 py-4 hover:bg-amber-600 cursor-pointer">
                        ยอดขายต่อวัน
                    </button>
                </div>


                {/* search day */}
                {showSearchDay && (
                    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

                        <div className="bg-white w-full max-w-md roundec-md shadow-md p-4">
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

            </div>



            {/* โชว์ผลลัพธ์ ยอดขายในแต่ละวัน */}
            {showSalePerDay && (
                <div className="border flex-1 mt-16 border-gray-300 rounded-md mx-4">
                    <div className="font-bold text-center p-4">
                        <span>ยอดขายต่อวัน ไม่รวมค่าจัดส่งและ vat</span>
                    </div>

                    <div className="h-80">
                        <table className="w-full bg-gray-300">
                            <thead>
                                <tr>
                                    <th>วันที่ขาย</th>
                                    <th>ยอดขายต่อวัน</th>
                                </tr>
                            </thead>
                            <tbody className="text-center bg-white divide-y divide-gray-200">
                                {resultSalePerDay.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="p-4 text-gray-500">
                                            ไม่พบข้อมูลยอดขายในวันที่เลือก
                                        </td>
                                    </tr>
                                ) : (
                                    resultSalePerDay.map((item) => (
                                        <tr key={item.sale_date} className="hover:bg-gray-50">
                                            <td className="p-4">{item.sale_date}</td>
                                            <td className="p-4">{item.total_salePerDay}฿</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            )}

        </div>
    )
}

export default SalePerDay