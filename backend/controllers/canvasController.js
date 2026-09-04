const Canvas= require('../Models/canvasModel')

const createCanvas=async (req,res)=>{
    const email=req.email;
    const {name}=req.body;

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

const loadCanvas=async(req,res)=>{
    const canvasId=req.params.id;
    const email=req.email;

    try{const canvas=await Canvas.loadCanvas(email,canvasId);
        res.status(200).json(canvas);
    }catch(error){
        res.status(400).json({message:error.message})
    }
}
module.exports={getAllCanvases,createCanvas,loadCanvas};