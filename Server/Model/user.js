import mongoose, { mongo } from "mongoose";
import bcrypt from 'bcrypt'

const userschema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
});

userschema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
    catch(err){
        next(err);
    }
});

userschema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

const User=mongoose.model("User",userschema);

export default User