const express = require("express");
const mongoose = require("mongoose");
const connectDB = require ("./src/db/index.js");
const cors = require("cors")
require("dotenv").config({path:"./.env"});
const {app} = require("./src/app.js")
const path = require("path");

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// Middleware to parse JSON
app.use(express.json());


app.use(express.static(path.resolve(__dirname, "frontend", "build")));
console.log(path.resolve(__dirname) ,"ee")
app.get("*", (req, res) => {
    console.log(path.resolve(__dirname, "frontend", "build") ,"ee")
    
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
