const express = require("express");
const { handleUserRegister, handleUserLogin } = require("../controllers/auth");
const router = express.Router();


router.post("/register",handleUserRegister);

router.post("/login",handleUserLogin);


module.exports = router;