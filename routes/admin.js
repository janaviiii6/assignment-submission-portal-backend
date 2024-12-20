const express = require("express");
const router = express.Router();
const { viewAllAssignments, acceptAssignment, rejectAssignment } = require("../controllers/admin");


//Route for fetching all the assignments
router.get("/assignments",viewAllAssignments);

//Route to accept the assignment
router.post("/assignment/:id/accept",acceptAssignment);

//Route to reject the assignment
router.post("/assignment/:id/reject",rejectAssignment);

module.exports = router;