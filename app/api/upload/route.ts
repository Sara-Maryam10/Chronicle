import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { withAuth } from "@/middleware/auth";
import { requireRole } from "@/middleware/rbac";
import { withErrorHandler } from "@/middleware/errorHandler";

async function handler(_req: NextRequest): Promise<NextResponse> {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "chronicle/posts";

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    signature,
    timestamp,
    folder,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
}

export const POST = withAuth(requireRole("AUTHOR", withErrorHandler(handler)));
