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
    const data =  query.length>0?query[0]:`User with id ${req.params.id} not found`;
     res.json(data);
})



router.post("/", async (req,res)=>{
    const operation = await userModel.addUser(req.body);
    operation ? res.json(operation) : res.status(422).json(operation);
})

router.post("/:id", async (req,res)=>{
    const operation = await userModel.updateUser(req.params.id,req.body);
    operation ? res.json(operation) : res.status(422).json(operation);
})


router.delete("/:id", async (req,res)=>{
    const operation = await userModel.deleteUser(req.params.id);
    res.json(operation);
})

module.exports = router;