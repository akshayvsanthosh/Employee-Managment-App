import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getEmployeesForUpdateAPI, updateEmployeeAPI } from '../Services/allAPI';

function Edit({setEmployeeListStatus ,empId }) {
    const [updatedDetails, setUpdatedDetails] = useState({
        uid: "", uName: "", email: "", status: ""
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // api call to get particular employee
    const getEmployeesForUpdate = async () => {
        try {
            const result = await getEmployeesForUpdateAPI(empId)
            if (result.status >= 200 && result.status < 300) {
                setUpdatedDetails(result.data)
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleEdit = () => {
        handleShow()
        getEmployeesForUpdate()

    }

    const handleUpdate = async () =>{
        try {
            const result = await updateEmployeeAPI(empId,updatedDetails)
            console.log(result.data);
            setEmployeeListStatus(result.data)
            handleClose()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button className='btn btn-success me-2 rounded' onClick={handleEdit}>Edit</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <TextField value={updatedDetails.uid} onChange={e => setUpdatedDetails({ ...updatedDetails, uid: e.target.value })} fullWidth className='m-2' id="outlined-basic" label="Employee Id" variant="outlined" />
                    <TextField value={updatedDetails.uName} onChange={e => setUpdatedDetails({ ...updatedDetails, uName: e.target.value })} fullWidth className='m-2' id="outlined-basic" label="User Name" variant="outlined" />
                    <TextField value={updatedDetails.email} onChange={e => setUpdatedDetails({ ...updatedDetails, email: e.target.value })} fullWidth className='m-2' id="outlined-basic" label="Email" variant="outlined" />
                    <FormControl fullWidth className='m-2'>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            value={updatedDetails.status}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            onChange={e => setUpdatedDetails({ ...updatedDetails, status: e.target.value })}
                        >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'Inactive'}>Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='rounded ' variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='rounded ' variant="primary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Edit