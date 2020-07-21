var jwt = require('jsonwebtoken')

module.exports = function (req,res,next) {
    var token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied')

    try{
        var verify = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verify;
        next();
    } catch(err){
        req.status(400).send('Invalid Token')
    }
}