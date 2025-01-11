const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler.js")
const ApiResponse = require("../utils/apiResponse.js")
const ApiError = require("../utils/apiError.js")
const User = require("../models/user.model.js");

// User Registration

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        
        res.status(500).json({ error: "All fields are required" });
    }
}


exports.registerUser = asyncHandler( async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });

  }

  
 


  const {name, email, password  } = req.body
  //console.log("email: ", email);

  if (
      [name, email, password].some((field) => field?.trim() === "")
  ) {
     
      res.status(400).json({ error: "All fields are required" });
  }

  const existedUser = await User.findOne({  email })

  if (existedUser) {
    res.status(409).json({ error: "User with email already exists" });
     
  }
  
 

  const user = await User.create({
    name, email, password
  })

  const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
  )

  if (!createdUser) {
      
      res.status(500).json({ error: "Something went wrong while registering the user" });
  }

  return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered Successfully")
  )

});

// User Login
exports.loginUser = asyncHandler( async (req, res) => {
  
console.log(req.body, "ddd")
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body
    console.log(email);

    if (!email) {
       
        res.status(400).json({ error: "email is required" });
    }
    
    

    const user = await User.findOne({email })

    if (!user) {
        
        res.status(404).json({ error: "User does not exist" });
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
   
    res.status(401).json({ error: "Invalid user credentials" });
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

});

exports.logOutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})