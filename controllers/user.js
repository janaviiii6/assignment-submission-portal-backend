const User = require("../models/user");

// normal routes function
const getAllAdmins = async (req,res) => {
    try{
        const admins = await User.find({ role: 'admin' }).select('name email');

        if(admins.length === 0)
            return res.status(404).json({ message: "No admins found." });

        res.status(200).json({
            message: "Admins fetched successfully!",
            admins
        });
    }
    catch(err) {
        console.error("Error fetching admins: ", err);
        res.status(500).json({ message: "Server error" });  

    }
}


module.exports = { getAllAdmins };