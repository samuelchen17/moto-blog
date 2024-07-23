import firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// connect to firebase admin
const serviceAccountKey = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

export default firebaseAdmin;
