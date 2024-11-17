const express = require("express");
const { handleUserRegister, handleUserLogin, getAllAdmins } = require("../controllers/user");
const router = express.Router();
const { authenticateJWT } = require("../middlewares/auth");

router.post("/register",handleUserRegister);

router.post("/login",handleUserLogin);

router.get("/admins",authenticateJWT ,getAllAdmins);


module.exports = router;

