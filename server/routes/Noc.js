const express = require('express');
const route = express.Router();
const NOCController=require('../controller/NocformController')

route.post('/create', NOCController.upload.fields([
    { name: 'PANCardphoto', maxCount: 1 },
    { name: 'AadharCardFront', maxCount: 1 },
    { name: 'AadharCardBack', maxCount: 1 },
    { name: 'cancelledPassbook', maxCount: 1 }
]), NOCController.createNoc);

module.exports = route