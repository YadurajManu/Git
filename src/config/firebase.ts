import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

let serviceAccount: admin.ServiceAccount | undefined;

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } else {
    // Fallback for local dev if file exists, or just use default google credentials
    // For now we will rely on GOOGLE_APPLICATION_CREDENTIALS or default app initialization
    // eslint-disable-next-line no-console
    console.warn('No FIREBASE_SERVICE_ACCOUNT env var found. Attempting default credentials.');
  }
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT', error);
}

if (!admin.apps.length) {
  const adminConfig: admin.AppOptions = {
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
  };

  admin.initializeApp(adminConfig);
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;
