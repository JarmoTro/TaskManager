const taskController = require('../controllers/taskController')
const express = require('express');
const router = express.Router();

router.post('/tasks', taskController.createTask);

router.put('/tasks/:taskId', taskController.updateTask)

router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;