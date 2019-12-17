const mongoose = require("mongoose");
const config=require("config");

const url = config.get("mongodbUrl");
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,options,(err)=>{
    if(err)
    console.log(err);
    console.log("Database connected successfully");
})