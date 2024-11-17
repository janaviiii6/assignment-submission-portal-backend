const jwt = require("jsonwebtoken");


//Middleware to verify token
const authenticateJWT = async (req, res, next) => {
    try{
        const authHeader = req.header('Authorization');

        if(!authHeader || !authHeader.startsWith('Bearer ')) 
            return res.status(404).json({ message: "No token provided. Access denied" });

        const token = authHeader.replace('Bearer ', '');

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err) 
                return res.status(403).json({ message: "Invalid token. Access denied" });
    
            req.user = decoded;
            console.log("Authenticated user:", decoded);
            //Proceeding with the next middleware 
            next(); 
        });
    } catch(err) {
        console.error("Error in authenticateJWT middleware:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { authenticateJWT };