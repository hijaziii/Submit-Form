import React, { useState, useEffect } from 'react'
import { Button, Modal, Form as BForm, Image } from 'react-bootstrap';
import moment from 'moment';
import API from "../utils/api";


function Form(props) {
    const [submitData, setSubmitData] = useState({ locationName: "", employeeName: "", clockIn: "", clockOut: "", duration: "", payment: "Check", note: "" });

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
        <div>
            <Modal.Dialog>
                <Modal.Header>
                    <div style={{ textAlign: 'center' }}>
                        <Image style={{ height: 100 }} src="clock.gif" className="img-fluid" alt="Responsive image" />
                        <h1>Time Card</h1>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <BForm>
                        <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <BForm.Label>Select Location</BForm.Label>
                            <BForm.Control as="select" className="me-sm-2" placeholder="Select Location" name="locationName" value={submitData.locationName} onChange={(e) => handleChange(e)}>
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

                        </BForm.Group>
                        <div>
                            <Modal.Body>
                                <BForm>
                                    <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <BForm.Label>Select Employee</BForm.Label>
                                        <BForm.Control as="select" className="me-sm-2" placeholder="Select Location" name="employeeName" value={submitData.employeeName} onChange={(e) => handleChange(e)} >
                                            <option value=""></option>
                                            {props.employees.map((employee) =>
                                                <option value={employee.fullName}>{employee.fullName}</option>
                                            )}
                                        </BForm.Control>

                                    </BForm.Group>
                                </BForm>
                            </Modal.Body>
                        </div>
                        {/* <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <BForm.Label>Employee Name</BForm.Label>
                            <BForm.Control type="Employee Name" placeholder="Employee Name" name="employeeName" value={submitData.employeeName} onChange={(e) => handleChange(e)} />
                        </BForm.Group> */}
                        <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <BForm.Label>Clock-In</BForm.Label>
                            <BForm.Control type="datetime-local" placeholder="Clock-In" name="clockIn" value={submitData.clockIn} onChange={(e) => handleChange(e)} />
                            <BForm.Label>Clock-Out</BForm.Label>
                            <BForm.Control type="datetime-local" placeholder="Clock-In" name="clockOut" value={submitData.clockOut} onChange={(e) => handleChange(e)} />
                        </BForm.Group>
                        <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <BForm.Label>Duration</BForm.Label>
                            <BForm.Control type="Duration" placeholder="Duration" name="duration" value={submitData.duration} onChange={(e) => handleChange(e)} />
                        </BForm.Group>
                        <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <BForm.Label>Payment Method</BForm.Label>
                            <BForm.Control as="select" className="me-sm-2" placeholder="Select Payment" name="payment" value={submitData.payment} onChange={(e) => handleChange(e)} >
                                <option value="Check">Check</option>
                                <option value="Cash">Cash</option>
                            </BForm.Control>
                        </BForm.Group>
                        <BForm.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <BForm.Label>Note</BForm.Label>
                            <BForm.Control as="textarea" name="note" value={submitData.note} onChange={(e) => handleChange(e)} rows={3} />
                        </BForm.Group>
                    </BForm>
                    <Button variant="danger" onClick={() => {
                        API.create(submitData).then(res => {
                            console.log(res.data)
                            props.setData([...props.data, res.data])
                            setSubmitData({ locationName: "", employeeName: "", clockIn: "", clockOut: "", duration: "", payment: "Check", note: "" })
                        })
                            .catch((error) => alert("Please fill out all the required fileds"))
                        // API.findAll({ employee: "" }).then(res => setData(res.data))
                        // props.setData([...props.data, submitData])



                    }}>Send</Button>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    )
}

export default Form
