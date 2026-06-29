import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { storageService } from "@/lib/storage/StorageService";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

const DEFAULT_BANNER = {
  id: "global",
  imageUrl: "/assets/one_percent_plan.png", // fallback default if no image uploaded
  sec1Title: "Premium 2, 3 & 4 BHK",
  sec1Sub: "Starting At ₹82 Lacs*",
  sec2Title: "At Prime Locations",
  sec2Sub: "Of Pune",
  sec3Title: "Introducing The",
  sec3Sub: "1% Payment Plan",
  sec4Title: "New Launch",
  sec4Sub: "Projects",
};

export async function GET() {
  try {
    const settings = await prisma.promoBanner.findUnique({
      where: { id: "global" },
    });
    return NextResponse.json({
      success: true,
      data: settings || DEFAULT_BANNER,
    }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/promo-banner error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to fetch banner settings",
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. Auth check
    const session = await auth();
    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ success: false, error: "Content type must be multipart/form-data" }, { status: 400 });
    }

    const formData = await req.formData();
    const sec1Title = formData.get("sec1Title") as string || DEFAULT_BANNER.sec1Title;
    const sec1Sub = formData.get("sec1Sub") as string || DEFAULT_BANNER.sec1Sub;
    const sec2Title = formData.get("sec2Title") as string || DEFAULT_BANNER.sec2Title;
    const sec2Sub = formData.get("sec2Sub") as string || DEFAULT_BANNER.sec2Sub;
    const sec3Title = formData.get("sec3Title") as string || DEFAULT_BANNER.sec3Title;
    const sec3Sub = formData.get("sec3Sub") as string || DEFAULT_BANNER.sec3Sub;
    const sec4Title = formData.get("sec4Title") as string || DEFAULT_BANNER.sec4Title;
    const sec4Sub = formData.get("sec4Sub") as string || DEFAULT_BANNER.sec4Sub;

    // Fetch existing settings to check if there is an image to delete
    const existing = await prisma.promoBanner.findUnique({
      where: { id: "global" },
    });

    const imageFile = formData.get("image") as File | null;
    let imageUrl = existing?.imageUrl || DEFAULT_BANNER.imageUrl;
    const uploadLogs: string[] = [];

    if (imageFile) {
      const result = await storageService.uploadFile(imageFile, "assets");
      imageUrl = result.url;
      if (result.logs) {
        uploadLogs.push(...result.logs);
      }
      // Clean up previous custom image if it exists
      if (existing?.imageUrl && existing.imageUrl.startsWith("/assets/") && existing.imageUrl.includes("-")) {
        await storageService.deleteFile(existing.imageUrl);
      }
    }

    // Upsert banner settings
    const updated = await prisma.promoBanner.upsert({
      where: { id: "global" },
      update: {
        imageUrl,
        sec1Title,
        sec1Sub,
        sec2Title,
        sec2Sub,
        sec3Title,
        sec3Sub,
        sec4Title,
        sec4Sub,
      },
      create: {
        id: "global",
        imageUrl,
        sec1Title,
        sec1Sub,
        sec2Title,
        sec2Sub,
        sec3Title,
        sec3Sub,
        sec4Title,
        sec4Sub,
      },
    });

    return NextResponse.json({ success: true, data: updated, logs: uploadLogs }, { status: 200 });
  } catch (error: any) {
    console.error("POST /api/promo-banner error:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Failed to update banner settings",
    }, { status: 400 });
  }
}
