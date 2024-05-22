import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Add from './Add';
import { deleteEmployeeAPI, getAllEmployeesAPI } from '../Services/allAPI';
import Edit from './Edit';

function Home() {
    const [employeeListStatus,setEmployeeListStatus] = useState('')

    const [allEmployees, setAllEmployees] = useState([])
    console.log(allEmployees);

    useEffect(() => {
        getAllEmployees()
    }, [employeeListStatus])

    const getAllEmployees = async () => {
        try {
            const result = await getAllEmployeesAPI()
            console.log(result);
            if (result.status >= 200 && result.status < 300) {
                setAllEmployees(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (employeId) =>{
        try {
           const result = await deleteEmployeeAPI(employeId)
           setEmployeeListStatus(result.data)
           toast.success(`${result.data.uName} deleted from the list!!`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-100 p-5 ' style={{ minHeight: "100vh", backgroundColor: "#d6dcff" }}>
            <h1 className='text-center p-5 heading'>List  of  Employees</h1>
            <Add setEmployeeListStatus={setEmployeeListStatus}/>
            <div className='tableDiv bg-dark rounded-bottom-3 '>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>UName</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allEmployees.length > 0 ?
                                allEmployees?.map(employe => (
                                    <tr key={employe?.id}>
                                        <td>{employe.uid}</td>
                                        <td>{employe.uName}</td>
                                        <td>{employe.email}</td>
                                        <td>{employe.status}</td>
                                        <td className='d-flex flex-row '>
                                            <Edit setEmployeeListStatus={setEmployeeListStatus} allEmployees={allEmployees} empId={employe.id}/>
                                            <button onClick={()=>{handleDelete(employe?.id)}} className='btn btn-danger rounded '>Delete</button>
                                        </td>
                                    </tr>

                                ))
                                :
                                <div className='fw-bolder text-danger text-center '>Nothing to display</div>
                        }
                    </tbody>
                </Table>
            </div>

        </div>
    )
}

export default Home
