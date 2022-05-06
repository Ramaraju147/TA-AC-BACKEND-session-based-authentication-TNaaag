const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const userRouter = require('./routes/userRouter');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
let MongoStore = require('connect-mongo');
const flash = require('connect-flash');

require('dotenv').config();


const clientP = mongoose.connect(
    'mongodb://127.0.0.1:27017/users',
    { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(m => m.connection.getClient())

const app = express();

app.use(morgan('tiny'));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
        clientPromise: clientP
    })
}))
app.use(flash());

app.use('/users', userRouter);

app.listen(4000,() => {
    console.log('Server is listening on port 4000');
})