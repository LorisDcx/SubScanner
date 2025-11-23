import fs from "fs";
import path from "path";
import { cert, getApps, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function loadServiceAccount(): ServiceAccount {
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

  throw new Error("Missing Firebase admin credentials. Set FIREBASE_ADMIN_KEY_BASE64, FIREBASE_ADMIN_KEY or FIREBASE_ADMIN_KEY_PATH.");
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
