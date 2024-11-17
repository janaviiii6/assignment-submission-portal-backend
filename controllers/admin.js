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

        const assignments = await Assignment.find({ admin: adminName })
                .populate('userId', 'name')
                .lean();

        const assignmentDetails = assignments.map(assignment => ({
            _id: assignment._id,
            userName: assignment.userId.name,
            task: assignment.task,
            admin: assignment.admin,
            status: assignment.status,
            createdAt: assignment.createdAt,
            updatedAt: assignment.updatedAt,
        }));

        if(assignments.length === 0)
            return res.status(404).json({ message: "No assignments found for this admin" });

        res.status(200).json({
            message: "Assignments retrieved successfully!",
            assignmentDetails,
        });
    }
    catch(err) {
        console.error("Error fetching assignments: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { viewAllAssignments };