const express = require('express');
const mongoose = require('mongoose');
const userRouter  = require('./routes/userRouter');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const sessionStore = require('connect-mongo')
const morgan = require('morgan');

const clientP = mongoose.connect(
    'mongodb://127.0.0.1:27017/flash',
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(m => m.connection.getClient())

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(morgan('combined'))
app.use(session({
    secret: "Random Secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore.create({
        clientPromise: clientP
    })
}))
app.use(flash());
app.use('/users', userRouter);

app.listen(4000, (err) => {
    console.log('Server is listening on port 4000');
})