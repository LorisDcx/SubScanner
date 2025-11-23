import { NextRequest, NextResponse } from "next/server";
import { analyzeCsv } from "@/lib/analyze-csv";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "Missing CSV file" }, { status: 400 });
    }

    const text = await (file as Blob).text();
    const analysis = analyzeCsv(text);

    // Log pour debug : total + nombre d'abonnements
    console.log("/api/analyze result", {
      totalMonthly: analysis.totalMonthly,
      totalYearly: analysis.totalYearly,
      subscriptionsCount: analysis.subscriptions.length,
      sample: analysis.subscriptions.slice(0, 5),
    });

    return NextResponse.json(analysis, { status: 200 });
  } catch (error) {
    console.error("/api/analyze error", error);
    return NextResponse.json({ error: "Failed to analyze CSV" }, { status: 500 });
  }
}
