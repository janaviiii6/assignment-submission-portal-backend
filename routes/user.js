const express = require("express");
const { handleUserRegister } = require("../controllers/user");
const router = express.Router();

router.post("/register",handleUserRegister);

module.exports = router;

