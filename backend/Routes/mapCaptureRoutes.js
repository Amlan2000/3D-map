const express = require('express');
const router = express.Router();
const mapCaptureController = require('../controllers/mapCaptureController');

router.post('/save', mapCaptureController.saveCapture);
router.get('/captures', mapCaptureController.getCaptures);
router.get('/top-captures', mapCaptureController.getTopCaptures);

module.exports = router;
