var express = require("express");
var router = express.Router();
var User = require('../model/User')

router.post('/register',async (req,res)=>{
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    try{
        var savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
})

// router.post('/login',(req,res)=>{

// })

module.exports = router;