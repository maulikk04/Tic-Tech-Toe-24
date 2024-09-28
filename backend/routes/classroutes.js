const express = require('express');
const router = express.Router();
const validatetoken = require('../middleware/validatetoken');
const classcontroller = require('../controller/classcontroller')

router.post('/create',validatetoken,classcontroller.createClass)
router.get('/all-classes',validatetoken,classcontroller.getAllClass)
router.get('/class/:id', validatetoken,classcontroller.getClassById)

module.exports = router;
