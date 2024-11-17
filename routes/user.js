const express = require("express");
const { getAllAdmins } = require("../controllers/user");
const router = express.Router();

router.get("/admins",getAllAdmins);


module.exports = router;

