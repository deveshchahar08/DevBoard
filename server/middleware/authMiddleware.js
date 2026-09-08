
const jwt = require("jsonwebtoken")

const protect = (req, res, next) =>{
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                message: "Not authorized, token missing"
            })
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("asli token data", decoded)

        req.user = decoded.userID || decoded.id || decoded._id;

        next()
    } catch(error){
        return res.status(401).json({
            message: "not authorized, token missing"
        })
    }
}

module.exports = protect