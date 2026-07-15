-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "packageSlug" TEXT,
    "travelDate" TEXT,
    "adults" INTEGER NOT NULL DEFAULT 1,
    "children" INTEGER NOT NULL DEFAULT 0,
    "budget" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "destinationSlug" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "offerPrice" REAL,
    "overview" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "itinerary" TEXT NOT NULL,
    "inclusions" TEXT NOT NULL,
    "exclusions" TEXT NOT NULL,
    "hotelInfo" TEXT,
    "transportInfo" TEXT,
    "mealsInfo" TEXT,
    "difficulty" TEXT NOT NULL DEFAULT 'Easy',
    "season" TEXT NOT NULL DEFAULT 'Year-round',
    "images" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "whyVisit" TEXT,
    "bestTime" TEXT NOT NULL,
    "attractions" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "gallery" TEXT NOT NULL,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "authorName" TEXT NOT NULL DEFAULT 'Travel Expert',
    "image" TEXT NOT NULL,
    "readTime" TEXT NOT NULL DEFAULT '5 mins',
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
    "phone1" TEXT NOT NULL DEFAULT '+91 9450204681',
    "phone2" TEXT NOT NULL DEFAULT '+91 6290350925',
    "email1" TEXT NOT NULL DEFAULT 'info@theenchantingholidays.com',
    "email2" TEXT NOT NULL DEFAULT 'enchantingholidaysvns@gmail.com',
    "whatsapp" TEXT NOT NULL DEFAULT '+919450204681',
    "address" TEXT NOT NULL DEFAULT 'S-19/132-5A, Near PWD Office (Varuna Bridge), Varanasi - 221002, Uttar Pradesh, India',
    "facebook" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "Package"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
