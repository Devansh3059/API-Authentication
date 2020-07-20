var express = require("express");
var router = express.Router();
var User = require('../model/User')
var { registerValidation, loginValidation } = require("../validation")
var bcrypt = require('bcryptjs')

router.post('/register',async (req,res)=>{

    //Validating user
    console.log('Reached validation')
    var {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    console.log('Reached validated')
    // if(validation)
    // res.send(validation)

    //Check already exxisting user
    console.log('Reached check')
    var emailExist = await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')
    console.log('Reached checked')

    //Hashing
    var salt = await bcrypt.genSalt(10);
    var hashPass = await bcrypt.hash(req.body.password, salt);
    console.log('Reached hash')


    //Create New User
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPass
    });
    try{
        console.log('Reached save')
        var savedUser = await user.save();
        console.log('Reached saved')
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
 })

router.post('/login',async (req,res)=>{
    var {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    var user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('Email doesnt exists')
    var validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid Pass')

    res.send('Successfully Logged in')
}) 

module.exports = router;