const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/setCookie',(req,res) => {
res.cookie('username','Rohan');
res.send('Cookie has been set');
})

app.get('/getCookie',(req,res) => {
    let cookie = req.cookies['username'];
    res.send(cookie);
})

app.listen('5000', () => {
    console.log('Server is listening on port 5000')
})