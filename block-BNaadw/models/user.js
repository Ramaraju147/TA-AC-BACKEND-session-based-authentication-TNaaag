const res = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type:String, unique: true},
    password: {type: String, minlength: 5},
    city: String
},{timestamps: true})

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next();
})

userSchema.methods.validatePassword = function(password,cb){
    bcrypt.compare(password,this.password,(err,result) => {
        return cb(err,result);
    })
}

module.exports = mongoose.model('User', userSchema);