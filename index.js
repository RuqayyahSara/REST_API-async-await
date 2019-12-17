const express = require("express");
const config = require("config");

const dbConnect= require("./dbConnect");
const userSchema =require("./models/Schema");

const port = process.env.PORT || config.get("port");
const app = express();

app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));


// GET request - read by Id
app.get("/user/:id", async (req,res)=>{
    try{
        let users = await userSchema.findById(req.params.id);
        res.status(200).json(users);
        } catch(err){
        if(err)
        res.status(404).send("Cannot retrieve data");
    }
})

// GET request - read All
app.get("/user", async (req,res)=>{
    try{
        let users = await userSchema.find({});
        res.status(200).json(users);
        } catch(err){
        if(err)
        res.status(404).send("Cannot retrieve data");
    }
})

// POST request - create
app.post("/", async (req,res)=>{
 try{
    let newUser = new userSchema(req.body);
    let users = await newUser.save();
    res.json(users);

 } catch(err){
     if(err)
     res.status(404).send("Error in saving into Database");
 }
})

// PUT request - update by entering Id
app.put("/user/:id", async(req,res)=>{
    try{
    let users = await userSchema.findById(req.params.id);
    const {name, age} = req.body;
    users.name = name;
    users.age=age;
    // users.city= city;
    // users.zip=zip;

    let updatedUser = await users.save();
    res.json(updatedUser);
    }catch(err){
        if(err)
     res.status(404).send("Cannot update data");
    }
})

// DELETE request
// app.delete("/:id",async (req,res)=>{
//     try{
//      await userSchema.findOneAndDelete( {_id:req.params.id});
//     } catch(err){
//         if(err)
//         res.status(404).send("Cannot delete data from Database");
//     }
// })

app.listen(port,(error)=>{
    if(error)
    throw error;
    console.log(`Listening on port ${port}`);
})