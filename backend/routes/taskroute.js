const express = require('express');
const router= express.Router();
const taskcontroller = require('../controller/taskcontroller');
const validatetoken = require('../middleware/validatetoken')
router.post('/create-task', validatetoken,taskcontroller.createTask)

router.get('/get-all-tasks', validatetoken, taskcontroller.getAllTasks)

module.exports = router;