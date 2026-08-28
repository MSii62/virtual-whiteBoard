const Canvas= require('../Models/canvasModel')

const createCanvas=async (req,res)=>{
    const email=req.email;
    const {name}=req.name;

    try {
        const newCanvas=await Canvas.createCanvasForUser(email,name);
        res.status(201).json(newCanvas);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
}

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
module.exports={getAllCanvases,createCanvas};