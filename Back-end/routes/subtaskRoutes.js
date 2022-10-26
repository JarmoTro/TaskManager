const subtaskController = require('../controllers/subtaskController')
const express = require('express');
const router = express.Router();

router.post('/subtasks', subtaskController.createSubtask);

router.put('/subtasks/:subtaskId', subtaskController.updateSubtask)

router.delete('/subtasks/:subtaskId', subtaskController.deleteSubtask);

module.exports = router;