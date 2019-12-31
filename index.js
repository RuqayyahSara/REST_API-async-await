const express = require("express");
const config = require("config");

const dbConnect= require("./dbConnect");
const userSchema =require("./models/Schema");

const port = process.env.PORT || config.get("port");
const app = express();

app.use(express.json({extended:false}));
app.use(express.urlencoded({extended:false}));


// GET request - get user by Id
app.get("/user/:id", async (req,res)=>{
    try{
        let users = await userSchema.findById(req.params.id);
        res.status(200).json(users);
        } catch(err){
        if(err)
        res.status(404).send("Cannot retrieve data");
    }
})

// GET request - get all users
app.get("/user", async (req,res)=>{
    try{
        let users = await userSchema.find({});
        res.status(200).json(users);
        } catch(err){
        if(err)
        res.status(404).send("Cannot retrieve data");
    }
})

// POST request - create user
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

// PUT request - Add address to user
app.put("/address/:id",async (req,res)=>{
    const {city,street,zip}=req.body;
    const addressField ={};
    addressField.city=city;
    addressField.street=street;
    addressField.zip=zip;
    try{
    let users = await userSchema.findById(req.params.id);
    users.address.unshift(addressField);
    let updatedUser = await users.save();
    res.json(updatedUser);
} catch(err){
    if(err)
    throw err;
    res.status(404).send("Cannot add address");
}
})

// app.put("user/:id", async (req,res)=>{
//     // let user= await userSchema.findOne({id:req.params.id});
//     let {name,age}=req.body;
//     // const userField={};
//     // userField.name=name;
//     // userField.age=age;
//     try{
//    let user = await userSchema.findOneAndUpdate(
//     {_id: req.params.id},
//     {$set:{name:name, age:age}},
//     {$upsert: true}
//     );
//    res.json(user);
//    }
//    catch(err){
//     res.status(400).send("Cannot Update profile");
//    }
// })
        
// DELETE request
app.delete("/:id",async (req,res)=>{
    try{
    let user = userSchema.findByIdAndRemove(req.params.id);
        res.send("Data has been successfully deleted.");
    }
    catch(err){
        res.status(400).send("Cannot delete user");
    }
});


app.listen(port,(error)=>{
    if(error)
    throw error;
    console.log(`Listening on port ${port}`);
})

// request to update the user