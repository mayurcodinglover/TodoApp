import jwt from 'jsonwebtoken'
import User from '../Model/user.js'
import asyncHandler from 'express-async-handler'

const protect=asyncHandler(async(req,res,next)=>{
    let authheader=req.headers.authorization;
    if(!authheader|| !authheader.startsWith("Bearer")){
        res.status(401);
        throw new Error('Not authorized: No token provided');
    }
    const token=authheader.split(' ')[1];
    if(!token)
        {
            res.status(401);
        throw new Error('Not authorized: No token provided');
        }
        try{
            const decoded=jwt.verify(token,process.env.SECRET_KEY || 'todosec');
            if(!decoded.id)
                {
                    res.status(401);
                    throw new Error('Not authorized: Invalid token');
                }
                
            req.user=await User.findById(decoded.id).select('-password');
            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized: User not found');
            }
            next();
        }
        catch(error)
        {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized,token failed');
        }
    }
    
);

export default protect