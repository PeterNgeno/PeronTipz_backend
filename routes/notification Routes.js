const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to send a notification (admin only)
router.post('/send', authMiddleware.verifyAdmin, notificationController.sendNotification);

module.exports = router;
