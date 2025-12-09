import { useLocation } from "react-router-dom"

const ShowCustomerTopPerMonth = () => {
    const location = useLocation()
    const result = location?.state?.result

    console.log(result)


    return (
        <div className="h-full bg-white p-8">
            <div className="border flex-1  border-gray-300 rounded-md mx-4">
                <div className="font-bold text-center p-4">
                    <span>ลูกค้า TOP 5</span>
                </div>

                <div className="flex-1">
                    <table className="w-full bg-gray-300">
                        <thead>
                            <tr>
                                <th>full_name</th>
                                <th>date_time</th>
                                <th>total_spent</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-white divide-y divide-gray-200">
                            {result.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-4 text-gray-500">
                                        ไม่พบข้อมูลยอดขายในเดือนที่เลือก
                                    </td>
                                </tr>
                            ) : (
                                result.map((item)=> (
                                    <tr key={item.customer_id} className="hover:bg-gray-50">
                                        <td className="p-4">{item.full_name}</td>
                                        <td className="p-4">{item.create_dateTime}</td>
                                        <td className="p-4">{item.total_spent}฿</td>
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

export default ShowCustomerTopPerMonth