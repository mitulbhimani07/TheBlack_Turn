const express=require("express")
const userRoutes=express.Router()
const userController=require("../controller/userController")
userRoutes.post("/signup",userController.signup)
userRoutes.post("/login",userController.Login)
userRoutes.post("/googleSignup",userController.googleSignup)


module.exports = userRoutes;