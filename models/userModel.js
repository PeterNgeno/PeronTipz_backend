const admin = require('firebase-admin');
const db = admin.firestore();

exports.findByEmail = async (email) => {
  const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

exports.create = async (userData) => {
  const ref = await db.collection('users').add(userData);
  return { id: ref.id, ...userData };
};
