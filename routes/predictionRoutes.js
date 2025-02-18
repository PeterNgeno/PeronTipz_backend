const express = require('express');
const router = express.Router();
const predictionController = require('../controllers/predictionController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all betting predictions (requires payment verification in a real scenario)
router.get('/', authMiddleware.verifyUser, predictionController.getPredictions);

// Route to update a prediction (admin only)
router.post('/update', authMiddleware.verifyAdmin, predictionController.updatePrediction);

module.exports = router;
