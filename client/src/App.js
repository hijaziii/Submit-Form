import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ETable from "./components/ETable";
import { Container, Row, Col } from "react-bootstrap";
import API from "./utils/api";
import USERSAPI from "./utils/usersApi";
import EmployeeFilter from "./components/EmployeeFilter";
import moment from "moment";
import TotalTable from "./components/TotalTable";
import MyTable from "./components/MyTable";

function App() {
  const [data, setData] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState();
  const [employees, setEmployees] = useState([{ fullName: "john" }]);
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const [totals, setTotals] = useState([
    {
      employeeName: "John Dow",
      totalHoursCheck: "",
      totalHoursCash: "",
      totalHours: "",
    },
  ]);

  // unique = myArray.filter((v, i, a) => a.indexOf(v) === i);

  const totalFunc = (employeeName, payment, data) => {
    // const numbers = [{ duration: 15.5 }, { duration: 1.1 }];
    return data.reduce((total, e) => {
      if (
        e.employeeName === employeeName &&
        (e.payment === payment || "" === payment)
      ) {
        return total + e.duration;
      }
      return total;
    }, 0);
  };

  useEffect(() => {
    API.findByEmployeeDate(currentEmployee, startDate, endDate).then((res) => {
      console.log("res.data: ", res.data);
      // totalFunc('', '', res.data)
      setData(res.data);

      console.log(res.data.map(item => item.employeeName).filter((value, index, self) => self.indexOf(value) === index))

      const employeeTotals = res.data.map(item => item.employeeName).filter((value, index, self) => self.indexOf(value) === index)

      // console.log('employeeTotals; ', employeeTotals.map(e => {
      //   return {
      //     employeeName: e,
      //     totalHoursCheck: totalFunc("Paul", "Check", res.data),
      //     totalHoursCash: totalFunc("Paul", "Cash", res.data),
      //     totalHours: totalFunc("Paul", "", res.data)
      //   }
      // }))

      setTotals(employeeTotals.map(e => {
        return {
          employeeName: e,
          totalHoursCheck: totalFunc(e, "Check", res.data),
          totalHoursCash: totalFunc(e, "Cash", res.data),
          totalHours: totalFunc(e, "", res.data)
        }
      }));
    });

    // setData(API.getDb('employee Name'));
  }, [currentEmployee, startDate, endDate]);

  useEffect(() => {
    API.findAll({ employee: "" }).then((res) => setData(res.data));

    USERSAPI.findAll({ employee: "" }).then((res) => setEmployees(res.data));
    // setData(API.getDb('employee Name'));
  }, []);

  return (
    <>
      <Container>
        {/* <MyTable /> */}
        <Row className="mt-3">
          <Col lg="6" md="12">
            <EmployeeFilter
              currentEmployee={currentEmployee}
              setCurrentEmployee={setCurrentEmployee}
              employees={employees}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </Col>
          <Col lg="6" md="12">
            <TotalTable totals={totals} />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg="3" md="12">
            <Form
              employees={employees}
              setCurrentEmployee={setCurrentEmployee}
              data={data}
              setData={setData}
            />
          </Col>
          <Col lg="9">
            <ETable
              className="mt-3"
              data={data}
              setData={setData}
              employees={employees}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
