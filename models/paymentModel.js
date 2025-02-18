const admin = require('firebase-admin');
const db = admin.firestore();

exports.createPayment = async (paymentData) => {
  const ref = await db.collection('payments').add({
    ...paymentData,
    paymentDate: new Date().toISOString(),
  });
  return { id: ref.id, ...paymentData };
};

exports.getPaymentById = async (paymentId) => {
  const doc = await db.collection('payments').doc(paymentId).get();
  if (!doc.exists) throw new Error('Payment not found');
  return { id: doc.id, ...doc.data() };
};
