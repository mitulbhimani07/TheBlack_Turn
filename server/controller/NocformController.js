const NOCModel = require('../model/NocformModel');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/'); // Save to upload/ folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports.upload = upload;

const normalizePath = (file) => {
    return file ? file.path.replace(/\\/g, '/') : '';
};

module.exports.createNoc = async (req, res) => {
    try {
        const { body, files } = req;

        // Convert all file paths to forward slashes
        const PANCardphoto = normalizePath(files['PANCardphoto']?.[0]);
        const AadharCardFront = normalizePath(files['AadharCardFront']?.[0]);
        const AadharCardBack = normalizePath(files['AadharCardBack']?.[0]);
        const cancelledPassbook = normalizePath(files['cancelledPassbook']?.[0]);
        const Signature = normalizePath(files['Signature']?.[0]);

        const nocData = {
            ...body,
            PANCardphoto,
            AadharCardFront,
            AadharCardBack,
            cancelledPassbook,
            Signature
        };

        const data = await NOCModel.create(nocData);

        res.status(200).json({
            status: "NOC Information Successfully Saved",
            data
        });
    } catch (error) {
        console.error('Error adding NOC Information:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
