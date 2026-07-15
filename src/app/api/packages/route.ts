import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/packages - Fetch all packages (Public/Protected)
export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Fetch Packages API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch packages" },
      { status: 500 }
    );
  }
}

// POST /api/packages - Create new package (Protected)
export async function POST(request: Request) {
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
      name,
      destinationSlug,
      duration,
      price,
      offerPrice,
      overview,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      hotelInfo,
      transportInfo,
      mealsInfo,
      images,
      isFeatured,
    } = body;

    if (!name || !destinationSlug || !duration || !price || !overview) {
      return NextResponse.json(
        { error: "Name, destination, duration, price, and overview are required fields" },
        { status: 400 }
      );
    }

    const slug = generateSlug(name);

    const newPackage = await prisma.package.create({
      data: {
        name,
        slug,
        destinationSlug,
        duration,
        price: parseFloat(price),
        offerPrice: offerPrice ? parseFloat(offerPrice) : null,
        overview,
        highlights: highlights || "",
        itinerary: itinerary || "[]",
        inclusions: inclusions || "",
        exclusions: exclusions || "",
        hotelInfo: hotelInfo || null,
        transportInfo: transportInfo || null,
        mealsInfo: mealsInfo || null,
        images: images || "/images/hero.png",
        isFeatured: isFeatured === true,
        status: "PUBLISHED",
      },
    });

    return NextResponse.json({ success: true, package: newPackage });
  } catch (error: any) {
    console.error("Create Package API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create package" },
      { status: 500 }
    );
  }
}

// PATCH /api/packages - Update package (Protected)
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
      id,
      name,
      destinationSlug,
      duration,
      price,
      offerPrice,
      overview,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      hotelInfo,
      transportInfo,
      mealsInfo,
      images,
      isFeatured,
      status,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (name !== undefined) {
      updateData.name = name;
      updateData.slug = generateSlug(name);
    }
    if (destinationSlug !== undefined) updateData.destinationSlug = destinationSlug;
    if (duration !== undefined) updateData.duration = duration;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (offerPrice !== undefined) updateData.offerPrice = offerPrice ? parseFloat(offerPrice) : null;
    if (overview !== undefined) updateData.overview = overview;
    if (highlights !== undefined) updateData.highlights = highlights;
    if (itinerary !== undefined) updateData.itinerary = itinerary;
    if (inclusions !== undefined) updateData.inclusions = inclusions;
    if (exclusions !== undefined) updateData.exclusions = exclusions;
    if (hotelInfo !== undefined) updateData.hotelInfo = hotelInfo;
    if (transportInfo !== undefined) updateData.transportInfo = transportInfo;
    if (mealsInfo !== undefined) updateData.mealsInfo = mealsInfo;
    if (images !== undefined) updateData.images = images;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured === true;
    if (status !== undefined) updateData.status = status;

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, package: updatedPackage });
  } catch (error: any) {
    console.error("Update Package API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update package" },
      { status: 500 }
    );
  }
}

// DELETE /api/packages - Delete package (Protected)
export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    await prisma.package.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Package deleted successfully" });
  } catch (error: any) {
    console.error("Delete Package API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete package" },
      { status: 500 }
    );
  }
}
