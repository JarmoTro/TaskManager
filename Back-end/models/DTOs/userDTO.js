const taskDTO = require('./taskDTO')

module.exports = {
     convertUserToDTO: function(user){
        const userDTO = {
            _id: user._id,
            username: user.username,
            tasks: taskDTO.convertTaskArrayToDTO(user.tasks)
          }
          return userDTO;
      },
      convertUserArrayToDTO: function(userArray){
          const DTOArray = [];
          userArray.forEach(user => {
              const DTO = this.convertUserToDTO(user)
              DTOArray.push(DTO);
          });
          return DTOArray;
      }
} 