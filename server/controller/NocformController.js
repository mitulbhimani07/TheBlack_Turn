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
            Signature,
            userId: req.user

            

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
module.exports.viewNoc = async (req, res) => {
    try {
        const viewNocData = await NOCModel.find();

        res.status(200).json({
            status: true,
            message: "Fetched all NOC data successfully",
            data: viewNocData,
        });

    } catch (error) {
        console.error('Error fetching NOC data:', error);

        res.status(500).json({
            status: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};
module.exports.singleViewNoc = async (req, res) => {
  try {
    const userId = req.user; // from middleware

    const nocData = await NOCModel.findOne({ userId });

    if (!nocData) {
      return res.status(404).json({
        status: false,
        message: "NOC data not found for this user"
      });
    }

    res.status(200).json({
      status: true,
      message: "Fetched NOC data successfully",
      data: nocData,
    });
  } catch (error) {
    console.error('Error fetching NOC data:', error);
    res.status(500).json({
      status: false,
      message: 'Internal Server Error',
      error: error.message
    });
  }
};
