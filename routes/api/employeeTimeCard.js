const express = require('express');
const router = express.Router();
const db = require("../../models");

router.get('/', (req, res) => {
    db.EmployeeTimeCard
        .find({})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
})

router.get('/:id', (req, res) => {
    console.log(req.params.id);

    db.EmployeeTimeCard
        .find({ employeeName: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
})

router.get('/:id/:startDate/:endDate', (req, res) => {
    console.log(req.params.id);
    let filterObject = { employeeName: req.params.id, clockIn: { $gte: new Date(req.params.startDate + 'T00:00'), $lt: new Date(req.params.endDate + 'T23:59') } }
    if (req.params.id == "*") {
        filterObject = { clockIn: { $gte: new Date(req.params.startDate + 'T00:00'), $lt: new Date(req.params.endDate + 'T23:59') } }
    }

    db.EmployeeTimeCard
        .find(filterObject)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
})

router.post('/',
    async (req, res) => {
        console.log("post", req.body)
        db.EmployeeTimeCard
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    })

router.put('/:id', (req, res) => {
    db.EmployeeTimeCard
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})

router.delete('/:id', (req, res) => {
    db.EmployeeTimeCard
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
})



module.exports = router;