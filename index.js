const express = require('express');
const app = express();
require('dotenv').config();
const mongoose=require('mongoose');
require("./config/database");
const userSchema=require('./models/user');
const photoSchema=require('./models/photoupload');
const path=require("path");
const fs=require('fs');
const cors=require('cors');
var multer  = require('multer');
var os=require('os');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname);
    }
  })
   
  var upload = multer({ storage: storage })
 
  
//routes

const userRoute=require('./routes/user/index');
const productRoute=require('./routes/product/index');

app.use(cors());
app.use(express.json());
app.use('/user',userRoute);
app.use('/product',productRoute);
app.use(express.static("uploads"));




app.get('/',async (req,res)=>{
const all=await userSchema.find();
res.status(200).json(all);
})

app.get('/add',async (req,res)=>{

   const one=userSchema({
       username:"navin",
       Password:"navin",
       email:"navin@gmail.com",
   })

    const result=await one.save();

})



app.get('/name',async (req,res)=>{

    const resul=await userSchema.find({
        email:"navin@navin.com",
    })
    console.log(resul);

})

app.get('/delete',async(req,res)=>{
 const resr=await userSchema.deleteMany({
        username:"navinbalaji",
    })

})

app.get('/update', async(req,res)=>{
    const useremail="navin@navin.com";

    const updateDoc=await userSchema.updateOne({
         email:useremail,
    })
    console.log("update route "+updateDoc);
})


app.put('/update/:id', async(req,res)=>{
    const para=req.params.id;
           console.log(req.body);

   const dd= await userSchema.findOneAndUpdate({_id:para},req.body,{new: true},(err,docs)=>{
       if(err) console.log(err);
       console.log("docs"+docs);
   })
   ///console.log(dd)
   res.status(200).json({
       "ok":"ok",
   })
  
})



app.post('/upload',upload.single('photo'),async (req,res)=>{
    //console.log(req.name);
    const photoResult=photoSchema({
        name: req.file.filename,
        desc: req.file.mimetype,
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    })
    
    const ss=await photoResult.save();
    
    console.log(ss);
   res.status(200).json({
       name:ss.name,
       message:"Successfully Uploaded !"
   })
})


app.get("/photo/:id",async(req,res)=>{

    const id=req.params.id;
     const photofind=await photoSchema.find({
        name:id,
    })
    console.log(photofind);
    // var resultphotopath = photofind[0].path.substring(8, photofind[0].path.length);
    // console.log(os);
    // res.status(200).json({
    //     path:`localhost:3000/${resultphotopath}`,
    //     message:"Successful",
    // })
    res.status(200).json({
        img:photofind[0].img.contentType,
        otherData:photofind[0].img.data.toString('base64'),
    })
    
})




const port =process.env.PORT||8000;

app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
})