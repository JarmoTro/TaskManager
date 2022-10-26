const subtaskSchema = require('../models/subtask')
const taskSchema = require('../models/task')
const mongoose = require('mongoose')

exports.createSubtask = (req, res) => {
    if (!req.body.title ||
        !req.body.taskId) {
        return res.status(400).send("Missing one or all required request body fields: title, taskId");
    }
    else {
        let newSubtask = new subtaskSchema({
            title: req.body.title,
            finished: false
        })
        taskSchema.findOne({ _id: req.body.taskId }, async function (err, task) {
            if (err) return res.status(500).send("Internal server error.")
            if (task == null) return res.status(404).send("Couldn't find any task with given taskId.")
            if (task != null) {
                await task.subtasks.push(newSubtask._id);
                await task.save();
                await newSubtask.save();
                return res.status(201).send("Subtask has been added!");
            }
        })
    }
}

exports.deleteSubtask = (req, res) => {
    if (!req.params.subtaskId) {
        return res.status(400).send("Missing one or all required query parameters: subtaskId");
    }
    else {
        subtaskSchema.findOneAndDelete({ _id: req.params.subtaskId }, function (err, subtask) {
            if (err) return res.status(500).send("Internal server error.")
            if (subtask == null) return res.status(404).send("Couldn't find any subtask with given subtaskId.")
            taskSchema.updateMany({},
                { $pull: { subtasks: { $in: [mongoose.Types.ObjectId(req.params.subtaskId)] } } },
                { multi: true }).exec();
            if (!err) return res.status(204).send()
        })
    }
}

exports.updateSubtask = (req, res) => {
    if (!req.params.subtaskId) {
        return res.status(400).send("Missing one or all required parameters: subtaskId");
    }
    else {
        subtaskSchema.findOneAndUpdate({ _id: req.params.subtaskId }, req.body, function (err, subtask) {
            if (err) return res.status(500).send("Internal server error.")
            if (subtask == null) return res.status(404).send("Couldn't find any subtask with given subtaskId.")
            if (!err) return res.status(201).send("Subtask has been updated");
        })
    }
}