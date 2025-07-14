const express = require('express');
const route = express.Router();
const NOCController=require('../controller/NocformController')
const Auth=require("../Middleware/jwt")

route.post('/create', NOCController.upload.fields([
    { name: 'PANCardphoto', maxCount: 1 },
    { name: 'AadharCardFront', maxCount: 1 },
    { name: 'AadharCardBack', maxCount: 1 },
    { name: 'cancelledPassbook', maxCount: 1 },
    { name: 'Signature', maxCount: 1 }
]), Auth,NOCController.createNoc);
route.get('/viewNoc', NOCController.viewNoc);
route.get('/singleNoc',Auth, NOCController.singleViewNoc);

module.exports = route