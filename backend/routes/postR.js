const express=require('express')
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('wow nice')
})

router.post('/',(req,res)=>{
    res.send('post baby')
});

module.exports= router;