
import React from 'react'
import { Modal, Form as BForm, Container, Row, Col } from 'react-bootstrap'


function EmployeeFilter(props) {
    const handleChange = e => {
        console.log(e.target.value)
        props.setCurrentEmployee(e.target.value);

    };


    const listEmployees = props.employees.map((employee) =>
        <option value={employee.fullName}>{employee.fullName}</option>
    );
    return (
        <div>
            <Modal.Body>
                <BForm>
                    <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <BForm.Label>Select Employee</BForm.Label>
                        <BForm.Control as="select" className="me-sm-2" placeholder="Select Location" name="employeeName" value={props.currentEmployee} onChange={(e) => handleChange(e)} >
                            <option value="*">All</option>
                            {listEmployees}
                        </BForm.Control>

                    </BForm.Group>
                    <Container>
                        <Row>
                            <Col lg="6">
                                <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <BForm.Label>Start-Date</BForm.Label>
                                    <BForm.Control type="date" placeholder="Start-Date" name="startDate" onChange={e => props.setStartDate(e.target.value)} />
                                </BForm.Group>
                            </Col>
                            <Col lg="6">
                                <BForm.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <BForm.Label>End-Date</BForm.Label>
                                    <BForm.Control type="date" placeholder="End-Date" name="endDate" onChange={e => props.setEndDate(e.target.value)} />
                                </BForm.Group>
                            </Col>
                        </Row>
                    </Container>
                </BForm>
            </Modal.Body>
        </div>
    )
}

export default EmployeeFilter
