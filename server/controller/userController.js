const UserModel = require("../model/userModel");
const OtpModel = require("../model/Otp");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;
const multer = require('multer');
const nodemailer = require("nodemailer");
// In-memory OTP store (replace with Redis or DB in production)
const otpStore = new Map();  // key: email, value: { otp, expiresAt }

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'upload/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
module.exports.upload = upload;

const normalizePath = (file) => file ? file.path.replace(/\\\\/g, '/').replace(/\\/g, '/') : '';

module.exports.signup = async (req, res) => {
    try {
        // 1. Extract the file (profile pic)
        const profilePicPath = req.file ? `uploads/${req.file.filename}` : '';
        req.body.name = req.body.fname + " " + req.body.lname

        // 2. Hash the password
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        }

        // 3. Create user with profilepic path
        const newUser = new UserModel({
            ...req.body,
            profilepic: profilePicPath, // ✅ Correct full path
        });

        const savedUser = await newUser.save();

        res.status(200).json({
            status: "Signup Successfully.",
            data: savedUser,
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.Login = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        var data = await UserModel.findOne({ email })

        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, data.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const userResponse = data.toObject();
        delete userResponse.password;

        // ✅ Create JWT token
        const token = jwt.sign(
            {
                userId: data._id,
                email: data.email,
            },
            process.env.JWT_SECRET, // Make sure this is defined in your .env
            { expiresIn: '8h' }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            data: data
        });

        res.status(200).json({
            status: "Signup Successfully.",
            data
        })
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.googleSignup = async (req, res) => {
    try {
        const { email, username = "" } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            const newUser = await UserModel.create({
                email,
                username,
                password: "",
                conPassword: ""
            });

            const userResponse = newUser.toObject();
            delete userResponse.password;
            delete userResponse.conPassword;

            return res.status(201).json({
                message: "Google user created successfully",
                data: userResponse
            });
        } else {
            const userResponse = user.toObject();
            delete userResponse.password;
            delete userResponse.conPassword;

            return res.status(200).json({
                message: "User already exists",
                data: userResponse
            });
        }

    } catch (error) {
        console.error("Google Signup Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.googleSignin = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        var user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found. Please sign up first." });
        }

        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.conPassword;

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET, // Make sure this is defined in your .env
            { expiresIn: '8h' }
        );

        return res.status(200).json({
            message: "Signin successful",
            token,
            data: userResponse
        });

    } catch (error) {
        console.error("Google Signin Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports.SingleUser = async (req, res) => {
    try {
        // Get token from headers
        const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Fetch user by ID
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User fetched successfully',
            data: user,
        });
    } catch (error) {
        console.error('SingleUser Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports.changeNewPassword = async (req, res) => {
    try {
        const userId = req.user; // Set by authenticateToken middleware
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password do not match" });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.conPassword = ""; // Optional

        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Password Change Error:", error);
        res.status(500).json({
            message: 'Error changing password',
            error: error.message,
        });
    }
};

/**
 * Send OTP to user email for forgot password
 */
module.exports.sendOtpToEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await UserModel.findOne({ email: normalizedEmail });

        if (!user) {
            return res.status(404).json({ message: "User not found with this email" });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

        // Save OTP to DB
        await OtpModel.deleteMany({ email: normalizedEmail }); // Clear previous OTPs
        const otpData = await OtpModel.create({
            email: normalizedEmail,
            otp,
            expiresAt
        });

        // Send email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
            to: normalizedEmail,
            subject: "Your OTP for Password Reset",
            html: `<h3>Your OTP: <b>${otp}</b></h3><p>Valid for 5 minutes.</p>`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "OTP sent to your email" });

    } catch (err) {
        console.error("OTP Send Error:", err);
        res.status(500).json({ 
            message: "Failed to send OTP", 
            error: err.message 
        });
    }
};

// ✅ Add this to your controller file
module.exports.verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const normalizedEmail = email.toLowerCase().trim();

        // Find the most recent OTP for this email
        const otpRecord = await OtpModel.findOne({ 
            email: normalizedEmail 
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ 
                message: "No OTP request found for this email" 
            });
        }

        // Check if OTP matches
        if (otp !== otpRecord.otp) {
            return res.status(400).json({ 
                message: "Invalid OTP" 
            });
        }

        // Check if OTP is expired
        if (otpRecord.expiresAt < new Date()) {
            await OtpModel.deleteMany({ email: normalizedEmail });
            return res.status(400).json({ 
                message: "OTP has expired" 
            });
        }

        // OTP is valid
        res.status(200).json({ 
            message: "OTP verified successfully",
            email: normalizedEmail 
        });

    } catch (err) {
        console.error("OTP Verification Error:", err);
        res.status(500).json({ 
            message: "Failed to verify OTP", 
            error: err.message 
        });
    }
};
/**
 * Verify OTP and reset password
 */
module.exports.resetPasswordWithOtp = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        // Verify OTP first
        const otpRecord = await OtpModel.findOne({ 
            email: normalizedEmail 
        }).sort({ createdAt: -1 });

        if (!otpRecord) {
            return res.status(400).json({ 
                message: "No OTP request found or OTP expired" 
            });
        }

        if (otp !== otpRecord.otp) {
            return res.status(400).json({ 
                message: "Invalid OTP" 
            });
        }

        if (otpRecord.expiresAt < new Date()) {
            await OtpModel.deleteMany({ email: normalizedEmail });
            return res.status(400).json({ 
                message: "OTP has expired" 
            });
        }

        // Update password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await UserModel.findOneAndUpdate(
            { email: normalizedEmail }, 
            { password: hashedPassword }
        );

        // Clean up OTP
        await OtpModel.deleteMany({ email: normalizedEmail });

        res.status(200).json({ 
            message: "Password reset successfully" 
        });

    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ 
            message: "Failed to reset password", 
            error: err.message 
        });
    }
};
