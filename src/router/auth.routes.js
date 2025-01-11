const { Router } = require("express");

const { body } = require("express-validator");

const { registerUser , loginUser , logOutUser } =  require("../controllers/auth.Controller.js");

const verifyJWT = require("../middlewares/auth.middleware.js");


const router = Router()

router.route("/register").post( registerUser )

router.route("/login").post(loginUser)

router.post(
    "/register",
    [
      body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    registerUser
  );
  
  // Login Route
  router.post(
    "/login",
    [
      body("email").isEmail().withMessage("Invalid email format"),
      body("password").exists().withMessage("Password is required"),
    ],
    loginUser
  );

  router.post("/logout", verifyJWT , logOutUser);
  




module.exports =  router