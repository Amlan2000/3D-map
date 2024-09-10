const crypto = require("crypto");

const secretKey= crypto.randomBytes(32).toString('hex');

// console.log("secret key:"+ secretKey )
module.exports={
    secretKey: secretKey
}