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
    res.render('login');
})

userRouter.post('/login', (req,res) => {
    let {email,password} = req.body;
    if(!email || !password){
    return res.redirect('/users/login')
    }
    userModel.findOne({email},(err,user) => {
        if(err) next(err);
        if(!user){
           return res.redirect('/users/login')
        }
        console.log(err,user);
        user.verifyPassword(password,(err,result) => {
            console.log(err,result);
            req.session.userId = user.id;
            res.redirect('/users');
        })
    })
})

userRouter.post('/register', (req,res) => {
    userModel.create(req.body,(err,user) => {
        res.redirect('/users/login')
    })
})

module.exports = userRouter;