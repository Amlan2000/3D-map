const jwt = require("jsonwebtoken");
const {secretKey}= require("../configuration/jwtConfig");


function generateToken (user)
{
    const payload = {
        id:user._id,
        email: user.email,
        
    }

    // console.log("secret key in generate token: "+ secretKey)
    return jwt.sign(payload,secretKey,{expiresIn:"1h"});
}

module.exports ={generateToken}