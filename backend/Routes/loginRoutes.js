const express= require("express");
const cors = require("cors");
const {login}= require("../controllers/loginController");


const router = express.Router();

router.use(cors());

router.post("/login",login);

module.exports= router;