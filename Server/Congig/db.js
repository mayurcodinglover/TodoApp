import mongoose from "mongoose";

const connectdb=async()=>{
    try {
        await mongoose.connect("mongodb+srv://hedaumayur2003:64fU8a59Na7T6PPQ@cluster0.saixtve.mongodb.net/TodoDB");
        console.log("db connected");
    } catch (error) {
        console.log("error while connecting to mongodb",error.message);
    }
}

export default connectdb;