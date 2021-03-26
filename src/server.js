// Libs imports
const express = require('express');
require('dotenv').config();

// Route imports
const userRouter = require('./controlers/Users');

const app = express();

// Apply middlewares
app.use(express.json());

// Apply routes
app.use('/users',userRouter);


app.listen(process.env.PORT||3000, ()=>console.log("Listening on http://localhost:3000"))

