const express = require('express');
const userRouter = express.Router();
const userModel = require('../models/user');

userRouter.get('/register', (req,res) => {
    res.render('register');
})

userRouter.post('/register', (req,res) => {
    userModel.create(req.body,(err,user) => {
        console.log(err,user);
        res.redirect('/users/login')
    })

})

module.exports = userRouter;