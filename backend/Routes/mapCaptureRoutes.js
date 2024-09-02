const express = require('express');
const router = express.Router();
const mapCaptureController = require('../controllers/mapCaptureController');

router.post('/save', mapCaptureController.saveCapture);
router.get('/captures', mapCaptureController.getCaptures);
router.get('/top-captures', mapCaptureController.getTopCaptures);
router.get('/by-email/:email', mapCaptureController.getCapturesByEmail); // New route


module.exports = router;
