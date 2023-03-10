// const dotenv = require('dotenv');
// dotenv.config();
//console.log(process.env.FIREBASE_API_KEY)

module.exports = {
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
  connectionString: process.env.MDB_CONNECTION_STRING,
};
