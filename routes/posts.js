var express = require("express");
var router = express.Router();
var verify = require('./verifyToken')

router.get('/',verify,(req,res)=>{
    res.son({posts:{
        tilte:'Welcome To Con Fusion',
        description:'Nice Ambience'
    }})
})

module.exports = router;
