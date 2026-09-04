const express=require('express')
const {getAllCanvases,createCanvas,loadCanvas}=require('../controllers/canvasController')
const authenticationMiddleware=require('../middlewares/authenticationMiddleware')

const router=express.Router();
router.get('/',authenticationMiddleware,getAllCanvases);
router.post('/',authenticationMiddleware,createCanvas);
router.get('/load/:id',authenticationMiddleware,loadCanvas);

module.exports=router;