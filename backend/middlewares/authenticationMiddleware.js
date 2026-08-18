const jwt =require('jsonwebtoken')
const User = require('../models/userModel')
const SECRET_KEY= process.env.SECRET_KEY;

const authenticationMiddleware= async(req,res,next)=>{
    const token=req.header('Authorization').replace('Bearer ','');
    if(!token){
        return res.status(401).json({message:'authentication failed'});   
    }
    try{
        const decoded=jwt.verify(token.replace("Bearer ",""),SECRET_KEY);
        req.email=decoded.email;
        next();
    }
    catch(error){
        res.status(401).json({message:'authentication failed'});
    }

}
module.exports=authenticationMiddleware;

