const User = require("../models/user");
const Assignment = require("../models/assignment");

// normal routes function
const getAllAdmins = async (req,res) => {
    try{
        const admins = await User.find({ role: 'admin' }).select('name email');

        if(admins.length === 0)
            return res.status(404).json({ message: "No admins found." });

        return res.status(200).json({
            message: "Admins fetched successfully!",
            admins
        });
    }
    catch(err) {
        console.error("Error fetching admins: ", err);
        return res.status(500).json({ message: "Server error" });  

    }
}

const uploadAssignment = async (req,res) => {
    const { task, admin: adminName } = req.body;
    const userId = req.user.userId;
    
    console.log(userId);
    console.log(req.body);
    
    try{

        const admin = await User.findOne({ name: adminName }).select('_id');

        const user = await User.findById(userId).select('name');

        if(!user)
            return res.status(404).json({ message: "User not found" })

        await Assignment.create({
            userId,
            task,
            admin: admin._id,
        });

        return res.status(201).json({ message: "Assignment uploaded successfully!" });
    }
    catch(err) {
        console.error("Error uploading assignment: ", err);
        return res.status(500).json({ message: "Error uploading assignment. Please try again later." });
    }
};  

module.exports = { getAllAdmins, uploadAssignment };