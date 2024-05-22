import commonAPI from "./commonAPI"
import SERVER_URL from "./server_url"

// add employee in add.jsx
export const addEmployeeAPI = async (employeeDetails)=>{
    return await commonAPI("POST",`${SERVER_URL}/users`,employeeDetails)
}

//  get employees in home.jsx
export const getAllEmployeesAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/users`,'')
}

// delete employee in home.jsx
export const deleteEmployeeAPI = async (employeeId) =>{
    return await commonAPI("DELETE",`${SERVER_URL}/users/${employeeId}`,{})
}

//  get employees in edit.jsx
export const getEmployeesForUpdateAPI = async(employeeId)=>{
    return await commonAPI("GET",`${SERVER_URL}/users/${employeeId}`,'')
}

// update employee in edit.jsx
export const updateEmployeeAPI = async(employeeId,updatedDetails) =>{
    return await commonAPI("PUT",`${SERVER_URL}/users/${employeeId}`,updatedDetails)
}