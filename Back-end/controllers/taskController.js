const taskSchema = require('../models/task')
const userSchema = require('../models/user')
const utils = require('../utils')
const mongoose = require('mongoose');

exports.createTask = (req, res) => {
    if (!req.body.title ||
        !req.body.deadline ||
        !req.body.userId) {
        return res.status(400).send("Missing one or all required request body fields: title, deadline, userId");
    }
    else {
        let convertedDeadline = utils.convertUnixTime(req.body.deadline);
        if (convertedDeadline == "Invalid Date") {
            return res.status(400).send("Invalid deadline format. Deadline must be an Unix timestamp in seconds.");
        }
        let newTask = new taskSchema({
            title: req.body.title,
            deadline: convertedDeadline,
            finished: false,
            subtasks: []
        })
        userSchema.findOne({ _id: req.body.userId }, async function (err, user) {
            if (err) return res.status(500).send("Internal server error.")
            if (user == null) return res.status(404).send("Couldn't find any user with given userId.")
            if (user != null) {
                await user.tasks.push(newTask._id);
                await user.save();
                await newTask.save();
                return res.status(201).send("Task has been added!");
            }
        })
    }
}

exports.deleteTask = (req, res) => {
    if (!req.params.taskId) {
        return res.status(400).send("Missing one or all required query parameters: taskId");
    }
    else {
        taskSchema.findOne({ _id: req.params.taskId }, function (err, task) {
            if (err) return res.status(500).send("Internal server error.")
            if (task == null) return res.status(404).send("Couldn't find any task with given taskId.")
            if (!err) {
                userSchema.updateMany({},
                    { $pull: { tasks: { $in: [mongoose.Types.ObjectId(req.params.taskId)] } } },
                    { multi: true }).exec();
                task.remove();
                return res.status(204).send()
            }
        })
    }
}

exports.updateTask = (req, res) => {
    if (!req.params.taskId) {
        return res.status(400).send("Missing one or all required parameters: subtaskId");
    }
    else {
        taskSchema.findOneAndUpdate({ _id: req.params.taskId }, req.body, function (err, task) {
            if (err) return res.status(500).send("Internal server error.")
            if (task == null) return res.status(404).send("Couldn't find any subtask with given taskId.")
            if (!err) return res.status(201).send("Task has been updated");
        })
    }
}
