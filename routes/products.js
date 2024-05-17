const express   = require('express');
const bodyParser = require('body-parser');
const jwt       = require('jsonwebtoken');
const router    = express.Router();
const fs        = require('fs');
const path      = require('path');
const moment    = require('moment');
const mkdir     = require('mkdirp')
const Products  = require('../models/products_model');
// express().use(express.urlencoded({extended:true}))
router.get('/',(req,res)=>{
    res.send('From PRODUCTS_API side');
});

function fileUploadfn(req,res,next){
    let fileUpload      = {};
    let uploadedFlag    = false;
    let folderName      = '';
    if(req.files){
        // console.log(req.files);
        let files = Object.keys(req.files).map(x => (req.files[x]));
        // save files
        files.forEach( x => {
            let fileName = x.name;
            folderName = moment(Date()).format('YYYY-MM-DD');
            let fullPath = path.join(__dirname,'..','..','angCRUD_app-1/src/assets/',folderName);
            let folderCheck = fs.existsSync(fullPath);
            if(!folderCheck){
                mkdir(fullPath);
            }
            // let uploadFile = path.join(fullPath,'/', fileName)
            // console.log('uploadFile',uploadFile);
            fs.writeFile(path.join(__dirname,'..','..','angCRUD_app-1/src/assets/',folderName, fileName), x.data, (err) => {
                if (err) throw err;
                // else{
                    uploadedFlag = true
                    console.log(`File ${fileName} saved in ${uploadedFlag}.`);
                // }
            });
        });
        setTimeout(() => {
            req.body.fileData = {'flag':uploadedFlag,'folder':folderName}
            next()
        }, 2000);
        
    } else {
        req.body.fileData = {'flag':uploadedFlag,'folder':folderName}
        next()
    }
}

router.post('/add',fileUploadfn, (req,res)=>{
    let reqData         = req.body;
    let uploadedFlag    = req.body.fileData.flag;
    let folderName      = req.body.fileData.folder;
    
    let addPath = uploadedFlag ? folderName : '';
    reqData.addPath = addPath;
    let products = new Products({pName:reqData.name,pDesc:reqData.description,pPrice:reqData.price,fPath:reqData.addPath});
    products.save().then(resp => {
        res.send({'status':1,'msg':'File Received','res':resp});
    })
})

router.get('/load',(req,res)=>{
    Products.find({},{pName:1,pDesc:1,pPrice:1,fPath:1}).then(resp=>{
        res.status(201).send({'msg':'Products List Loaded','response':resp});
    })
})

module.exports = router;