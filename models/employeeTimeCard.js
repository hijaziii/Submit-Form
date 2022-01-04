const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeTimeCardSchema = new Schema({

    locationName: {
        type: String,
        required: true,
    },
    employeeName: {
        type: String,
        required: true
    },
    clockIn: {
        type: Date,
        default: Date.now,
        required: true
    },
    clockOut: {
        type: Date,
        default: Date.now,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },


});

module.exports = mongoose.model('employeeTimeCard', EmployeeTimeCardSchema);