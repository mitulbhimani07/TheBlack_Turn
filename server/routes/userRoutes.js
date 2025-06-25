const express=require("express")
const userRoutes=express.Router()

userRoutes.post("/signup",userController.signup)


module.exports = userRoutes;