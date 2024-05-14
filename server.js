const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT  = 4201;
const api   = require('./routes/api')
const app   = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api',api);
app.get('/',function(req,res){
    res.send('Connection made with express');
})

app.post('/addUser',function(req,res){
    console.log(req.body);
    res.status(200).send({'msg':'Data Received'});
})
app.post('/regForm',function(req,res){
    console.log(req.body);
    res.status(200).send({'msg':"User Registered",'response':req.body});
})

app.listen(PORT,function(){
    console.log("Server Running on localhost:"+PORT);
})