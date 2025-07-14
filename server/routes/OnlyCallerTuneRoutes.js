const express = require('express');
const router = express.Router();
const OnlyCallerTuneCTR = require('../controller/OnlyCallerTuneController')
const verifyUser = require('../Middleware/jwt');
router.post('/create', verifyUser, OnlyCallerTuneCTR.createOnlyCallerTune);
router.get('/view', OnlyCallerTuneCTR.viewOnlyCallerTuneData);

module.exports = router