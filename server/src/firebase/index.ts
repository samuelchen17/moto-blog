import firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// connect to firebase admin
const serviceAccount = require("../firebase/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

export default firebaseAdmin;
