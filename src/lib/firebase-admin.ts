import fs from "fs";
import path from "path";
import { cert, getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function loadServiceAccount(): ServiceAccount {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (projectId && clientEmail && privateKey) {
    return {
      type: "service_account",
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey.replace(/\\n/g, "\n"),
      token_uri: "https://oauth2.googleapis.com/token",
      private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
      client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL,
      universe_domain: "googleapis.com",
    } as ServiceAccount;
  }

  if (process.env.FIREBASE_ADMIN_KEY_BASE64) {
    const decoded = Buffer.from(process.env.FIREBASE_ADMIN_KEY_BASE64, "base64").toString("utf-8");
    return JSON.parse(decoded);
  }

  if (process.env.FIREBASE_ADMIN_KEY) {
    return JSON.parse(process.env.FIREBASE_ADMIN_KEY);
  }

  if (process.env.FIREBASE_ADMIN_KEY_PATH) {
    const resolvedPath = path.resolve(process.cwd(), process.env.FIREBASE_ADMIN_KEY_PATH);
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Firebase admin key file not found at ${resolvedPath}`);
    }
    const file = fs.readFileSync(resolvedPath, "utf-8");
    return JSON.parse(file);
  }

  throw new Error("Missing Firebase admin credentials. Set FIREBASE_ADMIN_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY, FIREBASE_ADMIN_KEY_BASE64, FIREBASE_ADMIN_KEY or FIREBASE_ADMIN_KEY_PATH.");
}

const serviceAccount = loadServiceAccount();

const adminApp = getApps().length === 0
  ? initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    })
  : getApps()[0];

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
