var express = require("express");
var router = express.Router();
var User = require('../model/User')

//var
var Joi = require('@hapi/joi');

var schema = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()

})

router.post('/register',async (req,res)=>{

    //Validating user
    var {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    // if(validation)
    // res.send(validation)

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