const express = require('express');
const router = express.Router();
const OnlyCallerTuneCTR = require('../controller/OnlyCallerTuneController')
router.post('/create',OnlyCallerTuneCTR.createOnlyCallerTune)

module.exports = router