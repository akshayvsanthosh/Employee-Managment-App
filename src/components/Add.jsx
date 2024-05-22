import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addEmployeeAPI } from '../Services/allAPI';

function Add({setEmployeeListStatus}) {
    const [employeeDetails, setEmployeeDetails] = useState({
        uid:"",uName:"",email:"",status:""
      })
    const [show, setShow] = useState(false);

    console.log(employeeDetails);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpload = async () => {
        const { uid, uName, email, status } = employeeDetails
        if (uid && uName && email && status) {
            console.log("ready for api call");
            try {
                const result= await addEmployeeAPI(employeeDetails)
                console.log(result);
                if (result.status>=200 && result.status<300) {
                    console.log(result.data);
                    setEmployeeListStatus(result.data)
                    toast.success(`${result.data.uName} added to the list!!`)
                    setEmployeeDetails({
                        uid:"",uName:"",email:"",status:""
                      })
                    handleClose()
                }else{
                    toast.error(result.response.data)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.warning("Please fill the form completely!!!")
        }
    }

    const handleCancel = () =>{
        handleClose()
        setEmployeeDetails({
            uid:"",uName:"",email:"",status:""
          })
    }

    return (
        <div>
            <div className='d-flex justify-content-end bg-dark p-3 rounded-top-3'>
                <button className='btn btn-success rounded' onClick={handleShow}>Add</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TextField onChange={e => setEmployeeDetails({ ...employeeDetails, uid: e.target.value })} fullWidth className='m-2' id="outlined-basic" label="Employee Id" variant="outlined" />
                    <TextField onChange={e => setEmployeeDetails({ ...employeeDetails, uName: e.target.value })} fullWidth className='m-2' id="outlined-basic" label="User Name" variant="outlined" />
                    <TextField onChange={e => setEmployeeDetails({ ...employeeDetails, email: e.target.value })} fullWidth className='m-2' id="outlined-basic" label="Email" variant="outlined" />
                    <FormControl fullWidth className='m-2'>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            onChange={e => setEmployeeDetails({ ...employeeDetails, status: e.target.value })}
                        >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='rounded ' variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button className='rounded ' variant="primary" onClick={handleUpload}>Submit</Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default Add
