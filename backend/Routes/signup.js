const express = require('express');
const signUpController = require("../controllers/signup");


const router= express.Router();

router.post("/register", signUpController.createUser);

module.exports=router;