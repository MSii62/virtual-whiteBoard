const Canvas= require('../Models/canvasModel')

const getAllCanvases= async(req,res)=>{
    const email=req.email;

    try{
        const canvases= await Canvas.getAllCanvases(email);
        res.status(200).json(canvases);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
    
}
module.exports={getAllCanvases};