const express=require('express');

const router=express.Router();


router.get('/',(req,res)=>{
    res.status(200).json({
        message:" product index route",
    })
})

router.get('/product',(req,res)=>{
    res.status(200).json({
        message:" product product route",
    })
})
module.exports=router;