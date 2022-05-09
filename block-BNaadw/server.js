const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');

let mongoClient = mongoose.connect('mongodb://127.0.0.1:27017/article').then(m => m.connection.getClient());

const app = express();

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret: 'Random Secret',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        clientPromise: mongoClient
    })
}))
app.use(flash());

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send('Something broke!');
})

app.listen('4000', (err) => {
    if(err) next(err);
    console.log('Server is listening on port 4000');
})