require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const admin = require('firebase-admin');

// Firebase service account configuration
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const predictionController = require('./controllers/predictionController');
const paymentController = require('./controllers/paymentController'); // if needed
const authMiddleware = require('./middleware/authMiddleware');
const authRoutes = require('./routes/userRoutes'); // user auth routes here
const predictionRoutes = require('./routes/predictionRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

// Routes
app.use('/auth', authRoutes);
app.use('/predictions', predictionRoutes);
app.use('/notifications', notificationRoutes);

// Example route for betting predictions payment (20 Ksh)
app.post('/betting/predictions/payment', async (req, res) => {
  const { phoneNumber, amount } = req.body;
  // Here you can call your payment controller logic
  try {
    const paymentResult = await paymentController.initiatePayment(
      phoneNumber,
      amount,
      process.env.MPESA_STK_PUSH_URL
    );
    res.json(paymentResult);
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Payment processing error' });
  }
});

// Default Route
app.get('/', (req, res) => {
  res.render('home'); // Using EJS view engine, for example
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
