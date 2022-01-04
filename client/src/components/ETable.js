import React, { useState, useEffect } from 'react'
import { Table, Button, Form as BForm } from 'react-bootstrap';
// import { Modal, , Container, Row, Col } from 'react-bootstrap'
import API from '../utils/api'
import moment from 'moment'

function ETable(props) {
    const [submitData, setSubmitData] = useState({ locationName: "", employeeName: "", clockOut: "", duration: "", payment: "", note: "" });
    const [editRow, setEditRow] = useState(-1);

    const handleChange = e => {
        console.log('handleChange type: ', e.target.name, e.target.value)
        setSubmitData({
            ...submitData,
            [e.target.name]: e.target.value
        })

    }
    const calculateFunction = (clockOut, clockIn) => {
        console.log("Calculate Function Here");
        // const hours = parseInt(clockIn.split(':')[0], 10) - parseInt(clockOut.split(':')[0], 10);

        const initialTime = clockIn;
        const initialTimeFormat = moment(initialTime);

        const endTime = clockOut;
        const endTimeFormat = moment(endTime);

        const difference = initialTimeFormat.diff(endTimeFormat, "hours", "minutes");

        const result = (Math.round(difference * 4) / 4).toFixed(2)
        console.log("Time Difference: ", difference, " hours", "minutes");



        return result;
    }



    useEffect(() => {
        // calculateFunction(submitData.clockIn, submitData.clockOut)
        console.log(calculateFunction(submitData.clockIn, submitData.clockOut));
        submitData.clockIn !== "" && submitData.clockOut !== "" && setSubmitData({
            ...submitData,
            duration: calculateFunction(submitData.clockIn, submitData.clockOut)
        })


        return () => {
            console.log("here");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [submitData.clockIn, submitData.clockOut])


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {/* <th>ID</th> */}
                    <th>Location Name</th>
                    <th>Full Name</th>
                    <th>Clock-In</th>
                    <th>Clock-Out</th>
                    <th>Duration</th>
                    <th>Payment</th>
                    <th>Note</th>
                    <th>Delete</th>
                    <th>Edit</th>

                </tr>
            </thead>
            <tbody>
                {props.data.map((input, i) => {
                    if (i === editRow) {
                        return (
                            <tr key={i}>
                                {/* <td>{input._id}</td> */}
                                <td><BForm.Control as="select" className="me-sm-2" placeholder="Select Location" name="locationName" value={submitData.locationName} onChange={(e) => handleChange(e)}>
                                    <option value=""></option>
                                    <option value="1632-Wilcox">1632 Wilcox</option>
                                    <option value="Sunset-Room">Sunset Room</option>
                                    <option value="La-Messa">La Messa</option>
                                    <option value="Thompson-Hotel">Thompson Hotel</option>
                                    <option value="TAO">TAO</option>
                                    <option value="Highlight-Room">Highlight Room</option>
                                    <option value="Derriere-Club">Derriere Club</option>
                                    <option value="Private-Events">Private Events</option>
                                </BForm.Control>
                                </td>
                                <td><BForm.Control as="select" className="me-sm-2" placeholder="Select Location" name="employeeName" value={submitData.employeeName} onChange={(e) => handleChange(e)} >
                                    <option value=""></option>
                                    {props.employees.map((employee) =>
                                        <option value={employee.fullName}>{employee.fullName}</option>
                                    )}
                                </BForm.Control></td>
                                <td><BForm.Control type="datetime-local" name="clockIn" onChange={(e) => handleChange(e)} key={"st" + i} value={submitData.clockIn} /></td>
                                <td><BForm.Control type="datetime-local" name="clockOut" onChange={(e) => handleChange(e)} key={"et" + i} value={submitData.clockOut} /></td>
                                <td> <BForm.Control placeholder="Duration" name="duration" value={submitData.duration} onChange={(e) => handleChange(e)} /></td>
                                <td><BForm.Control as="select" className="me-sm-2" placeholder="Select Payment" name="payment" value={submitData.payment} onChange={(e) => handleChange(e)}>
                                    <option value="Check">Check</option>
                                    <option value="Cash">Cash</option>
                                </BForm.Control>
                                </td>
                                <td><BForm.Control name="note" onChange={(e) => handleChange(e)} key={"nt" + i} value={submitData.note} /></td>
                                <td>
                                    <Button onClick={() => {
                                        API.delete(input._id)
                                        props.setData(props.data.filter((f, fi) => fi !== i))
                                    }} variant="danger">Delete</Button>
                                    {/* <button >Delete</button> */}
                                </td>
                                <td><Button onClick={() => {
                                    // console.log(input._id);
                                    // console.log(submitData);
                                    API.update(submitData).then(res => {
                                        console.log("res.data", res.data)
                                        props.setData(props.data.map(e => {
                                            // console.log();
                                            if (e._id === res.data._id) {
                                                return res.data
                                            }
                                            return e
                                        }))
                                        setEditRow(-1)
                                    })
                                }} variant="success">Save</Button></td>
                            </tr>
                        )
                    }
                    else {
                        return (
                            <tr key={i}>
                                {/* <td>{input._id}</td> */}
                                <td>{input.locationName}</td>
                                <td>{input.employeeName}</td>
                                <td>{moment(input.clockIn).format("MM/DD/YY")}</td>
                                <td>{moment(input.clockOut).format("MM/DD/YY")}</td>
                                <td>{input.duration}</td>
                                <td>{input.payment}</td>
                                <td>{input.note}</td>
                                <td>
                                    <Button onClick={() => {
                                        API.delete(input._id)
                                        props.setData(props.data.filter((f, fi) => fi !== i))
                                    }} variant="danger">Delete</Button>
                                    {/* <button >Delete</button> */}
                                </td>
                                <td><Button onClick={() => {
                                    console.log(input);
                                    setSubmitData({ ...input, clockIn: moment(input.clockIn).format("YYYY-MM-DDThh:mm:ss"), clockOut: moment(input.clockOut).format("YYYY-MM-DDThh:mm:ss") })
                                    setEditRow(i)
                                }} variant="warning">Edit</Button></td>
                            </tr>
                        )
                    }
                })}



            </tbody>
        </Table>
    )
}

export default ETable