require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');
const fs = require('fs');

// Read service account from JSON
const serviceAccountPath = path.join(__dirname, 'service-account.json');
let serviceAccount;
if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = require(serviceAccountPath);
} else {
    console.error('Service account file not found!');
    process.exit(1);
}

// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL || "https://peron-tips-ltd.firebaseio.com"
});

const authRoutes = require('./routes/userRoutes'); 
const predictionRoutes = require('./routes/predictionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Add Payment Routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// Routes
app.use('/auth', authRoutes);
app.use('/predictions', predictionRoutes);
app.use('/notifications', notificationRoutes);
app.use('/payment', paymentRoutes); // This ensures payment routes are handled

// Default Route
app.get('/', (req, res) => {
    res.send('SangPoint Backend Running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
