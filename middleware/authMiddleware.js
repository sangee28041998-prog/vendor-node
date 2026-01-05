const jwt = require("jsonwebtoken");

// Function to authenticate and authorize based on allowed user's role
const authMiddleware = (allowedRoles = []) => {
    // Function Currying
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        // Condition to validate the token is in right format
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({message: "Unauthorized: No Token Provided"});
        }

        // Bearer na.dsja.dfdajdna,djfaskjdbfklasjdfajdbsfakjldsf
        // [Bearer] [na.dalkdngadnfgadfasdf]
        const token = authHeader.split(" ")[1];

        try{
            // Decode the Token
            const decoded = jwt.verify(token, process.env.secret_key);
            req.user = decoded;

            if(allowedRoles.length === 0){
                return next();
            }

            if(!allowedRoles.includes(decoded.role)){
                return res.status(403).json({message: "Forbidden: You don't have access to this resource"});
            }

            next();
        }catch(err){
            return res.status(401).json({message: "Unauthorized: Invalid Token"});
        }
    }
};

module.exports = authMiddleware;