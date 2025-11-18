import axios from "axios"
import { useEffect, useState } from "react"
import { Pencil , Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Employee = () => {
    const [listEmployee, setListEmployee] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        hdlFetchEmployee()
    }, [])

    const hdlFetchEmployee = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/listEmployee')
            //console.log(res.data)
            setListEmployee(res.data.employee)
        } catch (err) {
            console.log(err)
        }
    }

    const editEmployee = (employee) => {
        navigate('/employee/editEmployee', {state: {employee}})
    }


    return (
        <div className="min-h-screen bg-white">
            <div className="p-2">

                <div className="text-center mb-8">
                    <span className="text-2xl font-bold">info employee</span>
                </div>

                <div className="h-full">
                    <table className="w-full">
                        <thead className="bg-gray-300">
                            <tr>
                                <th>Full_Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Position</th>
                                <th>Create_DateTime</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center bg-white divide-y divide-gray-200">
                            {
                                listEmployee.map((item) => (
                                    <tr key={item.employee_id} className="hover:bg-gray-50">
                                        <td className="p-4">{item.first_name}  {item.last_name}</td>
                                        <td className="p-4">{item.email}</td>
                                        <td className="p-4">{item.password}</td>
                                        <td className="p-4">{item.position}</td>
                                        <td className="p-4">{item.create_dateTime}</td>
                                        <td className="p-4">
                                            <div>
                                                <button className="bg-blue-500 px-6 py-1 mr-2 text-white hover:bg-blue-700 rounded-md cursor-pointer"
                                                onClick={()=> editEmployee(item)}>
                                                    <Pencil />
                                                </button>

                                                <button className="bg-red-500 px-6 py-1 text-white hover:bg-red-700 rounded-md cursor-pointer">
                                                    <Trash2 />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Employee