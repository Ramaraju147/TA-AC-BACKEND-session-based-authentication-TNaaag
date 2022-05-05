const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user');

userRouter.get('/', (req,res) => {
    console.log(req.session);
    res.render('user');
})

userRouter.get('/register', (req,res) => {
    res.render('register');
})

userRouter.get('/login', (req,res) => {
    console.log(req.session);
    let error = req.flash('error')[0];
    res.render('login', {error});
})

userRouter.post('/login', (req,res) => {
    let {email,password} = req.body;
    if(!email || !password){
        req.flash('error','Please provide email and password');
    return res.redirect('/users/login')
    }
    userModel.findOne({email},(err,user) => {
        if(err) next(err);
        if(!user){
            req.flash('error','Email is not registered');
           return res.redirect('/users/login')
        }
        console.log(err,user);
        user.verifyPassword(password,(err,result) => {
            console.log(err,result);
            if(!result){
                req.flash('error','Incorrect password');
                return res.redirect('/users/login')
            }
            req.session.userId = user.id;
            res.redirect('/users');
        })
    })
})

userRouter.post('/register', (req,res) => {
    userModel.create(req.body,(err,user) => {
        if(err){
            if(err.name == "MongoServerError"){
                req.flash('error','Duplicate Emaiul Id')
            }else if(err.name == "ValidationError"){
                req.flash('error','Password Should be greater than 5')
            }
        }
        res.redirect('/users/login')
    })
})

userRouter.get('/logout', (req,res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/users/login')
})

module.exports = userRouter;