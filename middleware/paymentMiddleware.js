// Example placeholder for any payment-related middleware logic.
module.exports.validatePaymentData = (req, res, next) => {
  const { phoneNumber, amount } = req.body;
  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: 'Phone number and amount are required' });
  }
  next();
};
