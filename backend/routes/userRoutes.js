const {userRegister, loginUser,getUserProfile}=require('../controllers/userControllers');

const router=require('express').Router();

router.post('/register',userRegister);
router.post('/login',loginUser);
router.get('/profile',getUserProfile)

module.exports=router;
