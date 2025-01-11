const { ApiError } = require("../utils/apiError.js");
const asyncHandler  = require("../utils/asyncHandler.js");
const jwt = require("jsonwebtoken")
const User  = require("../models/user.model.js");

 const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
            
            res.status(401).json({ error: "Unauthorized request" });
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        console.log(user ,"ssss")
        if (!user) {
            
            
        res.status(401).json({ error: "Invalid Access Token" });
        }
    
        req.user = user;
        next()
    } catch (error) {
       
        res.status(401).json({ error: error?.message || "Invalid access token"});
    }
    
})

module.exports = verifyJWT