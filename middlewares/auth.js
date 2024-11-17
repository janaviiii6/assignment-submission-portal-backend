const jwt = require("jsonwebtoken");


//Middleware to verify token
const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token)
        return res.status(401).json({ message: "No token provided. Access denied" });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if(err) 
            return res.status(403).json({ message: "Invalid token. Access denied" });

        req.user = decoded;
        //Proceeding with the next middleware 
        next(); 
    });
};

module.exports = { authenticateJWT };