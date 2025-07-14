const UserModel = require("../model/userModel");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const SALT_ROUNDS = 10;
const multer = require('multer');

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
    req.body.name=req.body.fname +" "+req.body.lname
    
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