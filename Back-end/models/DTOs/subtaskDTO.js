module.exports = {
    convertSubtaskToDTO: function(subtask){
        const subtaskDTO = {
            _id: subtask._id,
            title: subtask.title,
            finished: subtask.finished,
          }
          return subtaskDTO;
      },
      convertSubtaskArrayToDTO: function(subtaskArray){
        const DTOArray = [];
        subtaskArray.forEach(subtask => {
            const DTO = this.convertSubtaskToDTO(subtask)
            DTOArray.push(DTO);
        });
        return DTOArray;
    }
} 