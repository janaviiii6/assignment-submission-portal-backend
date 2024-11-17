const Assignment = require("../models/assignment");
const User = require("../models/user");

const viewAllAssignments = async (req,res) => {
    try{

        //As in my payload userId+role is given
        const userId = req.user.userId;
        console.log(userId);

        const admin = await User.findById(userId).select('name');


        //Check if admin exists
        if(!admin)
            return res.status(404).json({ message: "Admin not found" });


        const adminName = admin.name;

        console.log(adminName);

        const assignments = await Assignment.find({ admin: userId })
                .populate('userId', 'name')
                .populate('admin', 'name')
                .lean();

        const assignmentDetails = assignments.map(assignment => ({
            _id: assignment._id,
            userName: assignment.userId.name,
            task: assignment.task,
            admin: assignment.admin.name,
            status: assignment.status,
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
        }));

        if(assignments.length === 0)
            return res.status(404).json({ message: "No assignments found for this admin" });

        return res.status(200).json({
            message: "Assignments retrieved successfully!",
            assignmentDetails,
        });
    }
    catch(err) {
        console.error("Error fetching assignments: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//Function to accept assignment 
const acceptAssignment = async(req,res) => {

    //Extracting assignment id from the url params
    const { id } = req.params;

    //Extracting userId from the bearer token
    const userId = req.user.userId;

    console.log(req.params.id);
    console.log(userId);

    try{
        //Find the assignment id
        const assignment = await Assignment.findById(id);

        //Check if the assignment exists 
        if(!assignment)
            return res.status(404).json({ message: "Assignment not found" });

        //Check if the admin in the assignment matches the current user
        if(assignment.admin.toString() !== userId)
            return res.status(403).json({ message: "Unauthorized: This assignment is not tagged to you" });

        //Check if the status is already 'accepted'
        if(assignment.status === 'accepted')
            return res.status(400).json({ message: "Assignment already accepted by admin" });

        
        //Update the assignment as accepted
        assignment.status = "accepted";

        //Save the updated assignment
        await assignment.save();

        return res.status(200).json({
            message: "Assignment updated successfully!",
            assignment,
        });
    } 
    catch(err) {
        console.error("Error accepting assignment: ", err);
        return res.status(500).json({ message: "Error accepting assignment. Please try again later." });
    }
};

//Function to reject assignment 
const rejectAssignment = async(req,res) => {

    //Extracting assignment id from the url params
    const { id } = req.params;

    //Extracting userId from the bearer token
    const userId = req.user.userId;

    console.log(req.params.id);
    console.log(userId);

    try{
        //Find the assignment id
        const assignment = await Assignment.findById(id);

        //Check if the assignment exists 
        if(!assignment)
            return res.status(404).json({ message: "Assignment not found" });

        //Check if the admin in the assignment matches the current user
        if(assignment.admin.toString() !== userId)
            return res.status(403).json({ message: "Unauthorized: This assignment is not tagged to you" });

        //Check if the status is already 'rejected'
        if(assignment.status === 'rejected')
            return res.status(400).json({ message: "Assignment already rejected by admin" });

        
        //Update the assignment as accepted
        assignment.status = "rejected";

        //Save the updated assignment
        await assignment.save();

        return res.status(200).json({
            message: "Assignment updated successfully!",
            assignment,
        });
    } 
    catch(err) {
        console.error("Error accepting assignment: ", err);
        return res.status(500).json({ message: "Error accepting assignment. Please try again later." });
    }
}

module.exports = { viewAllAssignments, acceptAssignment, rejectAssignment };