const jwt =require('jsonwebtoken')
const User = require('../Models/userModel')
const SECRET_KEY= process.env.JWT_SECRET;

const authenticationMiddleware= async(req,res,next)=>{
    try{
    const token=req.header('Authorization').replace('Bearer ','');
    if(!token){
        return res.status(401).json({message:'authentication failed'});   
    }
   
        const decoded=jwt.verify(token,SECRET_KEY);
        req.email=decoded.email;
        next();
    }
    catch(error){
        res.status(401).json({message:'authentication failed'});
    }

}
module.exports=authenticationMiddleware;

