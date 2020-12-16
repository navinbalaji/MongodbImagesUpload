const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://navin:navin@cluster0.pd7r7.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify: false },(err)=>{
if(err) 
{console.log(err);}
else{
    console.log("Mongoose connected ");
}

})


module.exports=mongoose;

