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
// users.address.push({city:req.body.city,street:req.body.street,zip:req.body.zip});
app.put("user/:id",async (req,res)=>{
    try{
    let users = await userSchema.findOneAndUpdate({_id:req.params.id,"address.id":req.params.id},{$set:{
        name : req.body.name,
        age: req.body.age,
        "address.$.street" :req.body.address.street,
        "address.$.zip" :req.body.address.zip
        
    }},{upsert:true});
} catch(err){
    if(err)
    throw err;
    res.send("Error in Modification");
}
})

app.put("user/:id",(req,res)=>{
    userSchema.findOneAndUpdate({_id:req.params.id}, (err,newForm)=>{
        if(err)
            throw err;
    const {name, age} = req.body;
    newForm.name = name;
    newForm.age = age;
    newForm.address.push({city:req.body.city,street:req.body.street,zip:req.body.zip});

    newForm.save((err)=>{
        if(err){
            res.status(404).send("Error in updating database");
        }
        res.json(newForm);
          });
        });     
});

// DELETE request
app.delete("/:id",(req,res)=>{
    userSchema.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            throw err;
        }
        res.send("Data has been successfully deleted.");
    });
});

// DELETE request - Delete all
app.delete("/",(req,res)=>{
    userSchema.remove({}, (err)=>{
        if(err){
            throw err;
        }
        res.send("Data has been successfully deleted.");
    });
});

app.listen(port,(error)=>{
    if(error)
    throw error;
    console.log(`Listening on port ${port}`);
})