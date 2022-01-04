const express = require('express');
const router = express.Router();
const db = require("../../models");

router.get('/', (req, res) => {
  db.User
    .find({})
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
})

router.get('/:id', (req, res) => {
  console.log(req.params.id);

  db.User
    .find({ employeeName: req.params.id })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err))
})

router.post('/',
  async (req, res) => {
    console.log(req.body)
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

router.put('/:id', (req, res) => {
  db.User
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})

router.delete('/:id', (req, res) => {
  db.User
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
})



module.exports = router;