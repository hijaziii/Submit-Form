import axios from "axios";

const BASEURL = "http://localhost:5050/api/users";


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
    update: function (_id) {
        return axios.put(BASEURL + '/' + _id);
    },
    delete: function (_id) {
        return axios.delete(BASEURL + '/' + _id);
    },
};
