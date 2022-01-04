import axios from "axios";

const BASEURL = "http://localhost:5050/api/employeeTimeCard";


// Export an object with a "search" method that searches the Giphy API for the passed query
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    create: function (data) {
        return axios.post(BASEURL, data);
    },
    findAll: function () {
        return axios.get(BASEURL);
    },
    findById: function (_id) {
        console.log("findById :" + _id);
        return axios.get(BASEURL + '/' + _id);
    },
    findByEmployeeDate: function (_id, startDate, endDate) {
        console.log("findEmployeeDate :" + _id);
        return axios.get(BASEURL + '/' + _id + '/' + startDate + '/' + endDate);
    },
    findAllEmployees: function () {
        return axios.get(BASEURL);
    },
    update: function (data) {
        return axios.put(BASEURL + '/' + data._id, data);
    },
    delete: function (_id) {
        return axios.delete(BASEURL + '/' + _id);
    },
};
