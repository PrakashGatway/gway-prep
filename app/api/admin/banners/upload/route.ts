import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
import { getSession } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  if (!(await getSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose a WebP image" }, { status: 400 });
    if (file.type !== "image/webp" || !file.name.toLowerCase().endsWith(".webp")) {
      return NextResponse.json({ error: "Only WebP images are accepted" }, { status: 415 });
    }
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Image must be 10 MB or smaller" }, { status: 413 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await cloudinary.uploader.upload(
      `data:image/webp;base64,${buffer.toString("base64")}`,
      { folder: "cway-admin/banners", format: "webp", resource_type: "image" },
    );
    return NextResponse.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("[BANNER IMAGE UPLOAD]", error);
    return NextResponse.json({ error: "WebP image upload failed" }, { status: 500 });
  }
}
