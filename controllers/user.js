const User = require("../models/user");

const handleUserRegister = async (req,res) => {
    const { name, email, password, role } = req.body;
    console.log(req.body);
    try{
        //Create new user
        const newUser = await User.create({
            name,
            email,
            password,
            role
        });


        res.status(201).json({
            message: "User registered successfully!",
            data: newUser
        })
    }
    catch(err) {
        //Hanlde errors
        if(err.name === "ValidationError")
            return res.status(400).json({ message: err.message });

        console.error("Error during registration: ", err);
        res.status(500).json({ message: "Server error, please try again." });
    }
};


module.exports = { handleUserRegister };