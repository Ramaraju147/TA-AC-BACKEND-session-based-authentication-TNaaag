const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user');

userRouter.get('/register', (req,res) => {
    return res.render('register');
})

userRouter.post('/register', (req,res) => {
    userModel.create(req.body, (err,user) => {
        if(err) next(err);
        return res.redirect('/users/login');
    })
})

userRouter.get('/login', (req,res) => {
    let error = req.flash('error')[0];
    return res.render('login', {error});
})

userRouter.post('/login', (req,res) => {
    let {email,password} = req.body;

    if(!email || !password){
        req.flash('error', 'Please provide email and password')
        return res.redirect('/users/login')
    }

    userModel.findOne({email},(err,user) => {
        if(err) next(err);
        if(!user){
        req.flash('error', 'User not found')
        return res.redirect('/users/login')
        }
        user.validatePassword(password,(err,result) => {
            if(err) next (err);
            if(!result){
            req.flash('error', 'Invalid password')
            return res.redirect('/users/login')
            }
            req.session.userid = user.id;
            return res.redirect('/articles')
        })
    })
})

userRouter.get('/logout', (req,res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.redirect('/users/login');
})

module.exports = userRouter;