const subtaskDTO = require('./subtaskDTO')

module.exports = {
    convertTaskToDTO: function(task){
        const taskDTO = {
            _id: task._id,
            title: task.title,
            deadline: task.deadline,
            finished: task.finished,
            subtasks: subtaskDTO.convertSubtaskArrayToDTO(task.subtasks)
          }
          return taskDTO;
      },
      convertTaskArrayToDTO: function(taskArray){
        const DTOArray = [];
        taskArray.forEach(task => {
            const DTO = this.convertTaskToDTO(task)
            DTOArray.push(DTO);
        });
        return DTOArray;
    }
} 