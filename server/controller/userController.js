const UserModel = require("../model/userModel");


module.exports.signup = async (req, res) => {
    try {
        
    } catch (error) {
        console.error('Error adding blog:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

