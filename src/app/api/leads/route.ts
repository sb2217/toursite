import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

// GET /api/leads - Fetch all leads (Protected)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(leads);
  } catch (error) {
    console.error("Fetch Leads API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create a new lead (Public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      destination,
      packageSlug,
      travelDate,
      adults,
      children,
      budget,
      message,
    } = body;

    // Simple validation
    if (!name || !email || !phone || !destination) {
      return NextResponse.json(
        { error: "Name, email, phone, and destination are required fields" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        destination,
        packageSlug: packageSlug || null,
        travelDate: travelDate || null,
        adults: adults ? parseInt(adults) : 1,
        children: children ? parseInt(children) : 0,
        budget: budget || null,
        message: message || null,
        status: "NEW",
      },
    });

    console.log("New Lead Received successfully: ", lead);

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully! Our team will contact you shortly.",
      leadId: lead.id,
    });
  } catch (error) {
    console.error("Create Lead API Error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry. Please try again later." },
      { status: 500 }
    );
  }
}

// PATCH /api/leads - Update lead status or notes (Protected)
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
    const { leadId, status, notes } = body;

    if (!leadId) {
      return NextResponse.json(
        { error: "Lead ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error("Update Lead API Error:", error);
    return NextResponse.json(
      { error: "Failed to update lead status" },
      { status: 500 }
    );
  }
}
