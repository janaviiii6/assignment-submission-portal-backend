const express = require("express");
const router = express.Router();
const { viewAllAssignments } = require("../controllers/admin");

router.get("/assignments",viewAllAssignments);

module.exports = router;