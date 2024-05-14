const express   = require('express');
const jwt       = require('jsonwebtoken');
const router    = express.Router();
const User      = require('../models/users');
const mongoose = require('mongoose');
// const db = "mongodb+srv://snpradeep6:f1jRGXIWgSlcZwqq@cluster11.qd1k2uq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster11";
const db2 = "mongodb+srv://snpradeep6:f1jRGXIWgSlcZwqq@cluster11.qd1k2uq.mongodb.net/loggers_db"

const dbConnection = async () =>{
    await mongoose.connect(db2)
    console.log(`Connected with,${mongoose.connection.host}`);
}
dbConnection()

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send({msg:'UnAuthorised Requestttttttt'});
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send({msg:'UnAuthorised Request-Token is Not Valid'});
    }
    let payload = jwt.verify(token,'testProjects');
    if(!payload){
        return res.status(401).send({msg:'UnAuthorised Request-Token is Mismatch'});
    }
    next();
}
router.get('/',(req,res)=>{
    res.send('From Route side');
});
router.get('/usersList',verifyToken,(req,res)=>{
    User.find().then((resp)=>{
        // console.log(resp);
        res.status(200).json({'msg':'Record Added Successfully','response':resp})
    })
})
router.post('/register',async (req,res)=>{
    
    let request = req.body;
    let loggerData = request;
    let loggers = new User(loggerData)
    // console.log(loggers);
    await loggers.save().then(response => {
        let payload = {subject : response._id}
        let token   = jwt.sign(payload,'testProjects');
        // console.log('Response Data=>',response);
        res.status(202).send({'status':202,'msg':'Record Added Successfully','response':response,'token':token});
    })

})

router.post('/login',async(req,res)=>{
    let request = req.body;
    console.log(request);
    User.findOne({uEmail:request.uEmail}).then((response) =>{
        if(!response){
            res.status(401).send({'status':401,'msg':'User Not Found','response':response});
        } else if(response.uPass !== request.uPass){
            res.status(500).send({'status':500,'msg':'Incorrect Password','response':response});
        } else {
            let payload = {subject : response._id}
            let token   = jwt.sign(payload,'testProjects');
            res.status(202).send({'status':202,'msg':'User Found','response':response,'token':token});
        }
        
    })
    
})
module.exports = router; 