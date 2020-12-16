const mongoose = require('mongoose');


const photoSchema=mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports=mongoose.model("userphoto",photoSchema);