const express = require("express");
const userModel = require('../models/UserModel');


const router = express.Router();

// Get all users
router.get("/", async (req,res)=>{
    const data = await userModel.getAllUsers();
    return res.json(data);
})

// Get specific user
router.get("/:id", async (req,res)=>{
    const query = await userModel.getSpecificUser(req.params.id);
    if(query.length>0){
        res.json(query[0]);
    }else{
        res.status(404).json(`User with id ${req.params.id} not found`)
    }
    
})


// Create a new user
router.post("/", async (req,res)=>{
    const operation = await userModel.addUser(req.body);
    operation.valid ? res.json(operation) : res.status(422).json(operation);
})

// Updae a user
router.post("/:id", async (req,res)=>{
    const operation = await userModel.updateUser(req.params.id,req.body);
    console.log(operation)
    operation.valid ? res.json(operation) : res.status(404).json(operation);
})

// Delete a user
router.delete("/:id", async (req,res)=>{
    const operation = await userModel.deleteUser(req.params.id);
    operation ===1 ? res.json("User Deleted succesfully") : res.status(404).json("User not found") 
})

module.exports = router;