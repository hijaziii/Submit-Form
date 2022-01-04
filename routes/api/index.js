const router = require('express').Router();
const userRoutes = require('./users');
const employeeTimeCardRoutes = require('./employeeTimeCard');

router.use('/users', userRoutes);
router.use('/employeeTimeCard', employeeTimeCardRoutes);

// For anything else, render the html page
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
