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


