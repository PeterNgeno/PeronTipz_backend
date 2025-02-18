// This is a dummy model using Firestore (or any database) for predictions.
// Replace with your actual data-access logic.
const admin = require('firebase-admin');
const db = admin.firestore();

exports.getAll = async () => {
  const snapshot = await db.collection('betting_predictions').get();
  const predictions = [];
  snapshot.forEach(doc => predictions.push({ id: doc.id, ...doc.data() }));
  return predictions;
};

exports.update = async (predictionId, data) => {
  const ref = db.collection('betting_predictions').doc(predictionId);
  await ref.update(data);
  return { id: predictionId, ...data };
};
