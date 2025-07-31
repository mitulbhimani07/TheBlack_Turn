const express = require('express');
const router = express.Router();
const  feedbackcontroller  = require('../controller/Help&Support');
const Auth = require("../Middleware/jwt");

// Route to handle feedback submission
router.post('/feedbackcreate',Auth, feedbackcontroller.feedback);

module.exports = router;