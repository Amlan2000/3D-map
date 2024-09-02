const express = require('express');
const router = express.Router();
const mapCaptureService = require('../service/mapCaptureService');

router.post('/save', mapCaptureService.saveCapture);
router.get('/captures', mapCaptureService.getCaptures);
router.get('/top-captures', mapCaptureService.getTopCaptures);
router.get('/by-email/:email', mapCaptureService.getCapturesByEmail);


module.exports = router;
