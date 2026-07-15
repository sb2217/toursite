import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// GET /api/settings - Fetch global settings (Public)
export async function GET() {
  try {
    const settings = await prisma.setting.findFirst({
      where: { id: "global" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Fetch Settings API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PATCH /api/settings - Update settings (Protected)
export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      phone1,
      phone2,
      email1,
      email2,
      whatsapp,
      address,
      facebook,
      instagram,
      youtube,
    } = body;

    const settings = await prisma.setting.upsert({
      where: { id: "global" },
      update: {
        phone1,
        phone2,
        email1,
        email2,
        whatsapp,
        address,
        facebook,
        instagram,
        youtube,
      },
      create: {
        id: "global",
        phone1: phone1 || "+91 9450204681",
        phone2: phone2 || "+91 6290350925",
        email1: email1 || "info@theenchantingholidays.com",
        email2: email2 || "enchantingholidaysvns@gmail.com",
        whatsapp: whatsapp || "+919450204681",
        address: address || "S-19/132-5A, Near PWD Office (Varuna Bridge), Varanasi - 221002, Uttar Pradesh, India",
        facebook,
        instagram,
        youtube,
      },
    });

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("Update Settings API Error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
