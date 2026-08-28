const express=require('express')
const {getAllCanvases,createCanvas}=require('../controllers/canvasController')
const authenticationMiddleware=require('../middlewares/authenticationMiddleware')

const router=express.Router();
router.get('/',authenticationMiddleware,getAllCanvases);
router.post('/',authenticationMiddleware,createCanvas);

module.exports=router;