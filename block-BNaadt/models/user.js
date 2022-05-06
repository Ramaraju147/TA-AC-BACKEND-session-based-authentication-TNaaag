const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true, minlength: 5},
    age: {type: Number, required: true},
    phone: {type: Number, required: true}
})

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare(password,this.password, (err,result) => {
        return cb(err,result);
    })
}

userSchema.pre('save', async function(next){
    if(! this.isModified('password')) return next();
    this.password =await bcrypt.hash(this.password,10);
    return next();
})

module.exports = mongoose.model('User', userSchema);