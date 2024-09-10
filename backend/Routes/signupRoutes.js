const express = require('express');
const signUpController = require("../controllers/signupController");


const router= express.Router();

router.post("/register", signUpController.createUser);

module.exports=router;