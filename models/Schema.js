const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
street:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
zip:{
    type:Number,
    required:true
}
})

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    address:[addressSchema]
})
module.exports=mongoose.model("schema",userSchema,"schema-collection");