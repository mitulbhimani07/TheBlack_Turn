const express=require("express")
const userRoutes=express.Router()
const userController=require("../controller/userController")
userRoutes.post("/signup",userController.signup)
userRoutes.post("/googleSignup",userController.googleSignup)
userRoutes.post("/googleSignin",userController.googleSignin)



module.exports = userRoutes;