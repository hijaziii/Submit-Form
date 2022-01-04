import React, { useState } from "react";
import { Table } from "react-bootstrap";

function TotalTable(props) {

    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Employee Name</th>
                    <th>Total Hours Check</th>
                    <th>Total Hours Cash</th>
                    <th>Total Hours</th>
                </tr>
            </thead>
            <tbody>
                {props.totals.map((input, i) => {
                    return (
                        <tr>
                            <td> {input.employeeName}</td>
                            <td> {input.totalHoursCheck}</td>
                            <td> {input.totalHoursCash}</td>
                            <td> {input.totalHours}</td>
                        </tr>
                    );
                })}
            </tbody>
            <thead>
                <tr>
                    <th></th>
                    <th>Total Employees Hours Checks</th>
                    <th>Total Employees Hours Cash</th>
                    <th>Grand Total</th>
                </tr>
            </thead>

            {/* <tr>
                <td> {props.totalHoursCheck}</td>
                <td> {props.totalHoursCash}</td>
                <td> {props.totalHours}</td>
                <td> { }</td>
            </tr> */}

        </Table>
    );
}

export default TotalTable;
