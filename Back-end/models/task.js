const mongoose = require('mongoose');
const subtaskSchema = require('./subtask')

const taskSchema = new mongoose.Schema({
    title:{
        type: String
    },
    finished:{
        type: Boolean
    },
    deadline:{
        type:Date
    },
    subtasks:{
        type:[mongoose.Types.ObjectId],
        ref: 'subtask'
    }
})

taskSchema.pre('remove', async function(next) {
    this.subtasks.forEach(subtaskId => {
        subtaskSchema.findOneAndDelete({_id:subtaskId}).exec();
        next();
    });
});

module.exports = mongoose.model('task',taskSchema);
