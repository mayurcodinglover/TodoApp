import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import connectdb from './Congig/db.js'
import route from './routes/authRoutes.js'

const app=express();
app.use(bodyParser.json());
app.use(cors());
connectdb();

app.use("/",route);
app.get("/",(req,res)=>{
    res.send("Welcome to my API");
})

app.listen("3000",(req,res)=>{
    console.log("server running on port 3000");
})