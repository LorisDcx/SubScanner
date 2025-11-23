import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase-admin";
import { AnalysisResult } from "@/types/analysis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getToken(req: NextRequest) {
  const authorization = req.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer (.+)$/i);
  if (match) {
    return match[1];
  }

  const cookies = req.cookies.get("token");
  return cookies?.value;
}

export async function DELETE(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing analysis id" }, { status: 400 });
    }

    const docRef = adminDb.collection("users").doc(userId).collection("analyses").doc(id);
    const docSnapshot = await docRef.get();
    if (!docSnapshot.exists) {
      return NextResponse.json({ error: "Analysis not found" }, { status: 404 });
    }

    await docRef.delete();
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("[API/analyses] DELETE error", error);
    const message = error instanceof Error ? error.message : "Failed to delete analysis";
    const status = message.toLowerCase().includes("token") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const body = (await req.json()) as {
      source?: string;
      analysis: AnalysisResult;
    };

    if (!body?.analysis) {
      return NextResponse.json({ error: "Missing analysis payload" }, { status: 400 });
    }

    const userId = decoded.uid;
    const docRef = adminDb.collection("users").doc(userId).collection("analyses");

    const dedupeKey = `${body.source ?? "unknown"}-${body.analysis.totalMonthly.toFixed(2)}-${body.analysis.subscriptions.length}`;

    const snapshot = await docRef.where("dedupeKey", "==", dedupeKey).limit(5).get();

    for (const doc of snapshot.docs) {
      const existing = doc.data();
      const existingDate = existing.createdAt ? new Date(existing.createdAt) : null;
      if (existingDate && Date.now() - existingDate.getTime() < 1000 * 60 * 5) {
        await doc.ref.delete();
      }
    }

    const newDoc = await docRef.add({
      userId,
      createdAt: new Date().toISOString(),
      source: body.source ?? "analyze",
      dedupeKey,
      analysis: body.analysis,
    });

    return NextResponse.json({ id: newDoc.id }, { status: 201 });
  } catch (error) {
    console.error("[API/analyses] POST error", error);
    const message = error instanceof Error ? error.message : "Failed to save analysis";
    const status = message.toLowerCase().includes("token") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) {
      return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const docRef = adminDb
      .collection("users")
      .doc(userId)
      .collection("analyses")
      .orderBy("createdAt", "desc")
      .limit(5);

    const snapshot = await docRef.get();
    const analyses = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data()) }));

    return NextResponse.json({ analyses }, { status: 200 });
  } catch (error) {
    console.error("[API/analyses] GET error", error);
    const message = error instanceof Error ? error.message : "Failed to load analyses";
    const status = message.toLowerCase().includes("token") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
