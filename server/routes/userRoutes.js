const express=require("express")
const userRoutes=express.Router()
const userController=require("../controller/userController")
const authenticateToken = require('../Middleware/jwt')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // Adjust your uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


userRoutes.post("/signup",userController.upload.single('profilepic'),userController.signup)
userRoutes.post("/login",userController.Login)
userRoutes.post("/googleSignup",userController.googleSignup)
userRoutes.post("/googleSignin",userController.googleSignin)
userRoutes.get('/singleUser', userController.SingleUser);
userRoutes.post('/change-password', authenticateToken, userController.changeNewPassword);

userRoutes.post("/forgot-password", userController.sendOtpToEmail);
userRoutes.post("/verify-Otp", userController.verifyOtp);
userRoutes.post("/reset-password", userController.resetPasswordWithOtp);
// updateuser
userRoutes.post("/updateUser/:id", upload.single('profilepic'), userController.updateUser);

module.exports = userRoutes;