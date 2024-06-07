import jwt from 'jsonwebtoken'
import User from '../Model/user.js'

export const registeruser=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }
        user=new User({
            username,
            email,
            password
        });
        await user.save();
        const payload={
            id:user._id
        };

        const token=jwt.sign(payload,'todosec',{expiresIn:'1h'})
        res.status(201).json({status:"success",token,user});
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const loginuser =async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user)
            {
                
                return res.status(400).json({message:"Invalid Credentials"})
            }
            
        const isMatch=await user.matchPassword(password);

        if(!isMatch)
            {
                console.log("notpassed");
                return res.status(400).json({message:"Invalid credentials"});
            }

            const payload={
                id:user._id
            }
            const token=jwt.sign(payload,'todosec',{expiresIn:'1h'});

            res.json({token,user});
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const verifyToken=(req,res,next)=>{
    const token=req.body.token|| req.headers['authorization'];
    if(!token)
        {
            return res.status(403).send({auth:false,message:"no token provided"})
        }
        jwt.verify(token,'todosec',(err,decode)=>{
            if(err){
                return res.status(403).send({auth:false,message:"Failed to authentication provided"})
            }
            req.userid=decode.id;
            next();
        })
}

export const validatetoken=async (req,res)=>{
    const user=await User.findOne({_id:req.userid})
    res.status(200).json({success:true,user:user})
}