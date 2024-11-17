const express = require("express");
const { getAllAdmins, uploadAssignment } = require("../controllers/user");
const router = express.Router();

router.get("/admins",getAllAdmins);

router.post("/upload",uploadAssignment);

module.exports = router;

