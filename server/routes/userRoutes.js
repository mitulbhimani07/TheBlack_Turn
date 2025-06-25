const express=require("express")
const userRoutes=express.Router()
const userController=require("../controller/userController")
userRoutes.post("/signup",userController.signup)


module.exports = userRoutes;