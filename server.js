const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const multer      = require('multer');
const files     = require('express-fileupload');
const mongoose = require('mongoose');
// const db = "mongodb+srv://snpradeep6:f1jRGXIWgSlcZwqq@cluster11.qd1k2uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11";
const db2 = "mongodb+srv://snpradeep6:f1jRGXIWgSlcZwqq@cluster11.qd1k2uq.mongodb.net/loggers_db"

const dbConnection = async () =>{
    await mongoose.connect(db2)
    console.log(`Connected with,${mongoose.connection.host}`);
}
dbConnection()

const PORT  = 4201;
const api   = require('./routes/api')
const prod  = require('./routes/products')
const app   = express();
// const mutlet = multer();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(files());
app.use(cors());
app.use('/api',api);
app.use('/prod',prod);
// app.use(mutlet.array())
app.get('/',function(req,res){
    res.send('Connection made with express');
})

app.post('/addUser',function(req,res){
    console.log(req.body);
    res.status(200).send({'msg':'Data Received','response':req.body});
})
app.post('/regForm',function(req,res){
    console.log(req.body);
    res.status(200).send({'msg':"User Registered",'response':req.body});
})

app.listen(PORT,function(){
    console.log("Server Running on localhost:"+PORT);
})