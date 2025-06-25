const UserModel = require("../model/userModel");


module.exports.signup = async (req, res) => {
    try {
        
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



