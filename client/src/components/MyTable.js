import React from 'react'
import { Table } from "react-bootstrap";

function MyTable() {
    const myArray = [{ firstName: "Mark", lastName: "Huskin", Username: "@Husk" }, { firstName: "Paul", lastName: "Pal" }]
    const result = myArray.map((e, i) => {
        console.log("cl", e)
        return (
            <tr>
                <td>{i}</td>
                <td>{e.firstName}</td>
                <td>{e.lastName}</td>
                <td>{e.Username}</td>
            </tr>
        )
    })
    return (
        <Table striped bordered hover>
            <thead>

                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
            </thead>
            <tbody>
                {result}
                <tr>
                    <td>1</td>
                    <td> 4</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default MyTable
