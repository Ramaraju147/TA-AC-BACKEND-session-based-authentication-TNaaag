const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    password: { type: String, minlength: 5}
})

userSchema.methods.validatePassword = function(password,cb){
    bcrypt.compare(password, this.password, function(err, result) {
        return cb(err,result);
    });
}

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})

module.exports = mongoose.model('User',userSchema);