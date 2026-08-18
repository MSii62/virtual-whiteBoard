const express=require('express')
const {getAllCanvases}=require('../controllers/canvasController')
const authenticationMiddleware=require('../middlewares/authenticationMiddleware')

const router=express.Router();
router.get('/',authenticationMiddleware,getAllCanvases);

module.exports=router;