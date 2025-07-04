const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;

module.exports.signup = async (req, res) => {
    try {

         if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
        }
        var data=await UserModel.create(req.body)

        res.status(200).json({
            status:"Signup Successfully.",
            data
        })
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.Login = async (req, res) => {
    try {

         const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        var data=await UserModel.findOne({email})

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
            status:"Signup Successfully.",
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






