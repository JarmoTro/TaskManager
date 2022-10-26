const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true
    },
    password:{
        type: String
    },
    tasks:{
        type:[mongoose.Types.ObjectId],
        ref: 'task'
    }
})

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    else{
        next()
    }  
});

module.exports = mongoose.model('user',userSchema);