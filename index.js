const express = require('express');
// const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Setup express app
const app = express();

// connect to mongodb
mongoose.connect('uri/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

// middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
    // console.log(err);
    res.status(422).send({error: err.message});
});

// app.get('/', function(req, res){
// app.get('/api', function(req, res){
//     console.log('GET request');
//     // res.end();
//     res.send({name: 'yoshi'});
// });

// Listen for requests
// app.listen(4000, function(){
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});