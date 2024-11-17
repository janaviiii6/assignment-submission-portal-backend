const User = require("../models/user");
const jwt = require("jsonwebtoken");


//Authentication

const handleUserRegister = async (req,res) => {
    const { name, email, password, role } = req.body;
    try{

        //Check if the user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser)
            return res.status(400).json({ message: "User already exists" });

        //Create new user
        const newUser = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({
            message: "User registered successfully!",
            data: newUser,
        });
    }
    catch(err) {
        //Hanlde errors
        if(err.name === "ValidationError")
            return res.status(400).json({ message: err.message });

        console.error("Error during registration: ", err);
        res.status(500).json({ message: "Server error, please try again." });
    }
};


const handleUserLogin = async (req,res) => {
    try{
        const { email, password } = req.body;

        //Check if the user already exists
        const user = await User.findOne({ email });
        if(!user) 
            return res.status(404).json({ message: "User not found" });


        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid)
            res.status(401).json({ message: "Invalid email or password" });

        //Generate Token
        const token = user.generateAuthToken();


        res.status(200).json({ 
            message: "Login Successful!",
            token: token
        });
    } 
    catch(err) {
        console.error("Error during login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


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

module.exports = { handleUserRegister, handleUserLogin, getAllAdmins };