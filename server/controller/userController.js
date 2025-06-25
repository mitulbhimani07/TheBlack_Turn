const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
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




