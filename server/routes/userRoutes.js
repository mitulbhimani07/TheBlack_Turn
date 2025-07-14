const express=require("express")
const userRoutes=express.Router()
const userController=require("../controller/userController")
userRoutes.post("/signup",userController.upload.single('profilepic'),userController.signup)
userRoutes.post("/login",userController.Login)
userRoutes.post("/googleSignup",userController.googleSignup)
userRoutes.post("/googleSignin",userController.googleSignin)



module.exports = userRoutes;