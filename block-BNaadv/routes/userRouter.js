const express = require('express');
const userModel = require('../models/user');
const userRouter = express.Router();
const bcrypt = require('bcrypt');

userRouter.get('/register', (req,res) => {
    let error = req.flash('error')[0];
    return res.render('register', { error });
})

userRouter.get('/', (req,res) => {
    console.log(req.session);
    return res.render('user');
})

userRouter.get('/login', (req,res) => {
    let error = req.flash('error')[0];
    return res.render('login', { error });
})

userRouter.post('/register', (req,res) => {
    let {email, password} = req.body;
    if(!email || !password){
        req.flash('error', 'Please provide valid email and password')
        return res.redirect('users/register');
    }

    userModel.create(req.body, (err,user) => {
        if(err){
            req.flash('error', 'Something went wrong at db level');
            return res.redirect('/users/register')
        }
            return res.redirect('/users/login')
    })
})

userRouter.post('/login', (req,res) => {
    let {email, password} = req.body;
    if(!email || !password){
        req.flash('error', 'Please provide valid email and password')
        return res.redirect('users/login');
    }

    userModel.findOne({email}, (err,user) => {
        if(err){
            req.flash('error', 'Something went wrong at db level');
            return res.redirect('/users/login')
        }
        if(!user){
            req.flash('error', 'User not found');
            return res.redirect('/users/login')
        }
        user.validatePassword(password,(err,result) => {
            if(!result){
                req.flash('error', 'Incorrect Password');
                return res.redirect('/users/login') 
            }
            req.session.userid = user.id;
            return res.redirect('/users')
        })
    })
})

userRouter.get('/logout', (req,res) => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/users/login');
})

module.exports = userRouter;