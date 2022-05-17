const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const path = require('path');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');

let mongoClient = mongoose.connect('mongodb://127.0.0.1:27017/article').then(m => m.connection.getClient());

const app = express();

app.use(morgan('tiny'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
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

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send('Something broke!');
})

app.listen('4000', (err) => {
    if(err) next(err);
    console.log('Server is listening on port 4000');
})