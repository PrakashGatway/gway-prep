import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ track: session?.role !== "admin" }, { headers: { "Cache-Control": "no-store" } });
}
