import { useLocation } from "react-router-dom"

const ShowSalePerDay = () => {
    const location = useLocation()
    const result = location?.state?.result

    return (
        <div className="bg-white h-full p-8">
            <div className="border flex-1 border-gray-300 rounded-md mx-4">
                <div className="font-bold text-center p-4">
                    <span>ยอดขายต่อวัน ไม่รวมค่าจัดส่งและ vat</span>
                </div>

                <div className="flex-1">
                    <table className="w-full bg-gray-300">
                        <thead>
                            <tr>
                                <th>วันที่ขาย</th>
                                <th>ยอดขายต่อวัน</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-white divide-y divide-gray-200">
                            {result.length === 0 ? (
                                <tr>
                                    <td colSpan={2} className="p-4 text-gray-500">
                                        ไม่พบข้อมูลยอดขายในวันที่เลือก
                                    </td>
                                </tr>
                            ) : (
                                result.map((item) => (
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
        </div>
    )
}

export default ShowSalePerDay
