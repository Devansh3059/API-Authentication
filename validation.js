//Register Valdiation
var Joi = require('@hapi/joi');

var registerValidation = data =>{
    var schema = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
    
    })
    return schema.validate(data);
}

//Login Validation
var loginValidation = data =>{
    var schema = Joi.object({
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
    
    })
    return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;