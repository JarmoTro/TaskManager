const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    title:{
        type: String
    },
    finished:{
        type: Boolean
    },
    deadline:{
        type:Date
    },
})

module.exports = mongoose.model('subtask',subtaskSchema);