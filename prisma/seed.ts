import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required for seeding.");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Hashing password "admin123"
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  // Seed User
  await prisma.user.upsert({
    where: { email: "admin@enchantingholidays.com" },
    update: {},
    create: {
      email: "admin@enchantingholidays.com",
      password: hashedPassword,
      name: "Admin Operations",
      role: "ADMIN",
    },
  });

  // Seed Settings
  await prisma.setting.upsert({
    where: { id: "global" },
    update: {},
    create: {
      id: "global",
      phone1: "+91 9450204681",
      phone2: "+91 6290350925",
      email1: "info@theenchantingholidays.com",
      email2: "enchantingholidaysvns@gmail.com",
      whatsapp: "+919450204681",
      address: "S-19/132-5A, Near PWD Office (Varuna Bridge), Varanasi - 221002, Uttar Pradesh, India",
      facebook: "https://facebook.com/theenchantingholidays",
      instagram: "https://instagram.com/theenchantingholidays",
      youtube: "https://youtube.com/c/theenchantingholidays",
    },
  });

  // Seed Destinations
  const destinations = [
    {
      name: "Varanasi",
      slug: "varanasi",
      description: "Varanasi, also known as Kashi or Banaras, is one of the world's oldest continually inhabited cities. Situated on the banks of the sacred Ganges River, it represents the spiritual heart of Hinduism, where life, death, and liberation merge seamlessly.",
      whyVisit: "To witness the mesmerizing evening Ganga Aarti, take a sunrise boat ride, explore ancient temples like Kashi Vishwanath, and walk the historical narrow lanes.",
      bestTime: "October to March (Pleasant weather, ideal for sightseeing)",
      attractions: JSON.stringify([
        { name: "Kashi Vishwanath Temple", description: "The legendary golden spire temple dedicated to Lord Shiva." },
        { name: "Dashashwamedh Ghat", description: "The main ghat where the spectacular evening Ganga Aarti takes place daily." },
        { name: "Sarnath", description: "The sacred site just 10km away where Lord Buddha delivered his first sermon." },
        { name: "Assi Ghat", description: "A serene ghat popular for Subah-e-Banaras sunrise rituals and yoga." }
      ]),
      image: "/images/varanasi.png",
      gallery: "/images/varanasi.png;/images/hero.png",
      isPopular: true
    },
    {
      name: "Ayodhya",
      slug: "ayodhya",
      description: "Ayodhya is the legendary birthplace of Lord Rama and an ancient city of immense religious significance. Nestled along the Sarayu River, it is a town filled with temples, gardens, and ghats that resonate with the tales of the Ramayana.",
      whyVisit: "To pay respects at the grand Ram Janmabhoomi Temple, explore Kanak Bhawan, watch the sunset at Sarayu River Ghats, and experience the cultural heritage of Ram ki Paidi.",
      bestTime: "October to March (Comfortable climate for temple hopping)",
      attractions: JSON.stringify([
        { name: "Shree Ram Janmabhoomi Mandir", description: "The magnificent temple marking the birthplace of Lord Rama." },
        { name: "Kanak Bhawan", description: "A beautiful temple gifted to Sita by Kaikeyi, housing gold-crowned idols." },
        { name: "Hanuman Garhi", description: "A 10th-century temple fort dedicated to Lord Hanuman, guarding the city." },
        { name: "Ram ki Paidi", description: "A series of beautiful ghats along the Sarayu River, illuminated beautifully at night." }
      ]),
      image: "/images/ayodhya.png",
      gallery: "/images/ayodhya.png",
      isPopular: true
    },
    {
      name: "Prayagraj",
      slug: "prayagraj",
      description: "Formerly known as Allahabad, Prayagraj is famous for the Triveni Sangam—the sacred confluence of three rivers: the Ganges, the Yamuna, and the mythical Saraswati. It is the site of the massive Kumbh Mela.",
      whyVisit: "To take a holy dip at the Sangam, visit the massive Akbar Fort, explore the Anand Bhawan (historic home of the Nehru family), and seek blessings at the reclining Hanuman Temple.",
      bestTime: "October to March (Kumbh and Magh Mela occur in January-February)",
      attractions: JSON.stringify([
        { name: "Triveni Sangam", description: "The holy point of confluence where travelers take boat rides for ritual baths." },
        { name: "Allahabad Fort", description: "An grand fort built by Emperor Akbar on the banks of Yamuna." },
        { name: "Anand Bhawan", description: "A double-story mansion transformed into a museum of India's independence movement." },
        { name: "Patalpuri Temple & Akshaya Vat", description: "An underground temple housing a sacred immortal banyan tree." }
      ]),
      image: "/images/prayagraj.png",
      gallery: "/images/prayagraj.png",
      isPopular: true
    },
    {
      name: "Bodhgaya",
      slug: "bodhgaya",
      description: "Bodhgaya is the birthplace of Buddhism, where Prince Siddhartha attained supreme enlightenment under the Bodhi Tree and became Lord Buddha. It attracts pilgrims and meditators from all over the world.",
      whyVisit: "To meditate under the sacred Bodhi Tree, visit the Mahabodhi Temple (UNESCO World Heritage Site), and explore international monasteries built by Thailand, Japan, and Tibet.",
      bestTime: "November to February (Cool weather, ideal for meditation and visits)",
      attractions: JSON.stringify([
        { name: "Mahabodhi Temple", description: "The iconic temple marking the exact spot of Buddha's enlightenment." },
        { name: "Bodhi Tree", description: "A direct descendant of the original tree under which Siddhartha sat." },
        { name: "Great Buddha Statue", description: "An imposing 80-foot stone statue of Buddha in meditation pose." },
        { name: "Thai Monastery", description: "A beautiful monastery exhibiting traditional Thai architectural gold details." }
      ]),
      image: "/images/bodhgaya.png",
      gallery: "/images/bodhgaya.png",
      isPopular: false
    }
  ];

  for (const dest of destinations) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: dest,
      create: dest,
    });
  }

  // Seed Packages
  const packages = [
    {
      name: "Spiritual Varanasi 2-Day Tour",
      slug: "spiritual-varanasi-2-day-tour",
      destinationSlug: "varanasi",
      duration: "2 Days / 1 Night",
      price: 4999.00,
      offerPrice: 4299.00,
      overview: "Experience the profound spiritual energy of Varanasi. Over two days, you will witness the legendary evening Ganga Aarti, take a boat ride at sunrise along the ghats, visit Sarnath where Lord Buddha gave his first sermon, and seek blessings at the Kashi Vishwanath temple.",
      highlights: "Evening Ganga Aarti ceremony at Dashashwamedh;Sunrise boat ride on the Ganges;Guided tour of Sarnath Buddhist site;Special Darshan at Kashi Vishwanath Temple;Walk through the ancient heritage lanes of Kashi",
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival, Sarnath Tour & Evening Ganga Aarti", description: "Arrive in Varanasi. Our representative will meet and transfer you to your hotel. In the afternoon, visit Sarnath, the sacred Buddhist pilgrimage site. In the evening, witness the breathtaking Ganga Aarti at Dashashwamedh Ghat by boat." },
        { day: 2, title: "Sunrise Boat Ride, Kashi Vishwanath & Departure", description: "Start the day with a serene sunrise boat ride on the Ganges, witnessing daily rituals. Visit the iconic Kashi Vishwanath Temple, Annapurna Mandir, and BHU Vishwanath Temple. Transfer to airport/railway station for your onward journey." }
      ]),
      inclusions: "Comfortable hotel accommodation with breakfast;Private air-conditioned vehicle for sightseeing;Dedicated local tour guide;Boat ride fees for Aarti & Sunrise;All applicable taxes & driver allowances",
      exclusions: "Airfare or Train tickets;Monument entry tickets;Meals other than breakfast;Personal expenses (laundry, tips, etc.);Camera/video fees",
      hotelInfo: "3-star standard heritage hotels near the Ghats (e.g., Hotel Temple on Ganges or similar). Upgrade to 4/5-star available on request.",
      transportInfo: "Private AC Sedan (Sedan/SUV depending on group size) with professional driver.",
      mealsInfo: "Daily buffet breakfast at the hotel.",
      difficulty: "Easy",
      season: "Year-round",
      images: "/images/varanasi.png;/images/hero.png",
      isFeatured: true
    },
    {
      name: "The Sacred Spiritual Triangle: Varanasi, Prayagraj & Ayodhya",
      slug: "sacred-spiritual-triangle-varanasi-prayagraj-ayodhya",
      destinationSlug: "varanasi",
      duration: "5 Days / 4 Nights",
      price: 15999.00,
      offerPrice: 13999.00,
      overview: "Embark on the ultimate pilgrimage covering the core of India's spiritual triangle. Visit Kashi (Varanasi) for rituals and heritage, Prayagraj for the holy confluence of Triveni Sangam, and Ayodhya to experience the birthplace of Lord Rama.",
      highlights: "Full Varanasi sightseeing & Aarti;Triveni Sangam holy dip at Prayagraj;Shree Ram Janmabhoomi temple visit in Ayodhya;Hanuman Garhi & Kanak Bhawan in Ayodhya;Comfortable private transfers throughout the route",
      itinerary: JSON.stringify([
        { day: 1, title: "Arrival in Varanasi & Evening Aarti", description: "Arrive in Varanasi. Meet our team and check in. Evening dedicated to witnessing the spectacular Ganga Aarti from a reserved boat." },
        { day: 2, title: "Sunrise Ganges & Varanasi Temples", description: "Sunrise boat ride and heritage walk. Return to hotel for breakfast. Visit Kashi Vishwanath, Sankat Mochan, Kal Bhairav temples, and BHU. Overnight stay in Varanasi." },
        { day: 3, title: "Varanasi to Prayagraj Sightseeing", description: "Drive to Prayagraj (120 km / 2.5 hrs). Visit Triveni Sangam (confluence of Ganga, Yamuna & Saraswati) for boat ride and holy dip. Visit Akbar Fort, Reclining Hanuman Temple, and Anand Bhawan. Overnight in Prayagraj." },
        { day: 4, title: "Prayagraj to Ayodhya Sightseeing", description: "Drive to Ayodhya (170 km / 3.5 hrs). Check in. Visit the magnificent Ram Janmabhoomi Temple, Kanak Bhawan, Hanuman Garhi temple, and enjoy a peaceful evening at Ram ki Paidi. Overnight in Ayodhya." },
        { day: 5, title: "Ayodhya to Varanasi & Departure", description: "Morning boat ride in Sarayu River (optional). Drive back to Varanasi airport/railway station for departure (or transfer directly from Ayodhya station)." }
      ]),
      inclusions: "4 Nights accommodation in selected standard hotels;Daily breakfast;All transfers & sightseeing in AC Sedan/SUV;Local guides in Varanasi & Ayodhya;Boat ride at Ganga and Triveni Sangam",
      exclusions: "Lunch and dinner;Personal tipping/gratuities;Monument entry fees;Any travel insurance",
      hotelInfo: "Standard/Deluxe hotels: Hotel Meraden Grand (Varanasi), Hotel Kanha Shyam (Prayagraj), Hotel Ramprastha (Ayodhya) or similar.",
      transportInfo: "Private AC Sedan/SUV for the entire circle route from Varanasi to Varanasi.",
      mealsInfo: "Daily buffet breakfast at all hotels.",
      difficulty: "Easy",
      season: "October to April",
      images: "/images/ayodhya.png;/images/prayagraj.png;/images/varanasi.png",
      isFeatured: true
    },
    {
      name: "The Sacred Buddhist Circuit Tour",
      slug: "sacred-buddhist-circuit-tour",
      destinationSlug: "bodhgaya",
      duration: "6 Days / 5 Nights",
      price: 18999.00,
      offerPrice: null,
      overview: "Trace the life and footsteps of Lord Buddha on this profound circuit. Travel from Varanasi's Sarnath where he gave his first sermon, to Bodhgaya where he attained enlightenment under the Bodhi tree, and Rajgir/Nalanda where he taught scriptures.",
      highlights: "Sarnath stupas and museum in Varanasi;Mahabodhi Temple and Bodhi Tree in Bodhgaya;Gridhakuta Hill (Vulture Peak) in Rajgir;Ancient ruins of Nalanda University;Peaceful stays with meditation options",
      itinerary: JSON.stringify([
        { day: 1, title: "Arrive Varanasi & Sarnath visit", description: "Arrive in Varanasi. Visit Sarnath, Dhamek Stupa, and the Ashoka Pillar. Overnight in Varanasi." },
        { day: 2, title: "Varanasi to Bodhgaya", description: "Drive to Bodhgaya (250 km / 5.5 hrs). Check in. Visit the UNESCO heritage Mahabodhi Temple and the Bodhi Tree in the evening. Overnight in Bodhgaya." },
        { day: 3, title: "Bodhgaya Monasteries & Sightseeing", description: "Explore the international Buddhist monasteries of Bodhgaya (Thai, Japanese, Bhutanese). Visit the massive 80-foot Buddha statue and the Niranjana River. Overnight in Bodhgaya." },
        { day: 4, title: "Excursion to Rajgir & Nalanda", description: "Drive to Rajgir (80 km). Visit Gridhakuta Hill, Vishwa Shanti Stupa, and Venu Vana. Continue to Nalanda (15 km) to explore the ruins of the world's oldest university. Return to Bodhgaya for overnight." },
        { day: 5, title: "Bodhgaya to Varanasi", description: "Drive back to Varanasi. Spend the afternoon shopping for Banarasi silks or exploring ghats. Evening Ganga Aarti. Overnight in Varanasi." },
        { day: 6, title: "Departure", description: "After breakfast, transfer to Varanasi airport/railway station for departure." }
      ]),
      inclusions: "5 Nights deluxe accommodation;Daily breakfast;All travel in comfortable AC Sedan/SUV;Guide fees and monument entry charges;Boat ride in Varanasi",
      exclusions: "Lunch and dinner;Personal porterage or camera fees;Tips for driver and guides;Airfare/Train tickets",
      hotelInfo: "Deluxe accommodation: Royal Residency (Bodhgaya), Amaya 15th (Varanasi) or similar.",
      transportInfo: "AC Sedan/SUV with state carrier permits for UP and Bihar.",
      mealsInfo: "Buffet breakfasts included. Monasteries offer lunch on request.",
      difficulty: "Easy",
      season: "November to March",
      images: "/images/bodhgaya.png",
      isFeatured: false
    }
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }

  // Seed Blog Posts
  const blogs = [
    {
      title: "The Spiritual Guide to Varanasi: Top Rituals & Experiences",
      slug: "spiritual-guide-to-varanasi-rituals-experiences",
      content: "Varanasi, Kashi, or Banaras—no matter what you call it, this city is the ultimate spiritual destination. Here is a curated guide to the top experiences every traveler should seek out: \n\n1. **The Evening Ganga Aarti**: Witnessed at Dashashwamedh Ghat, this ritual is an choreographed offering of fire, incense, and chants to River Ganga. It is best enjoyed from a boat.\n\n2. **Sunrise boat ride**: The morning light at Assi Ghat during Subah-e-Banaras offers a quiet, meditative window into local faith as priests perform fire offerings and classical singers perform ragas.\n\n3. **Walking the Heritage lanes**: The alleyways connecting the ghats are thousands of years old. Walking through them leads to hidden shrines, silk weavers, and street vendors selling Kachori Sabzi and Lassi.\n\nMake sure to hire a verified local guide to understand the deep history behind every corner.",
      category: "Destination Guides",
      tags: "Varanasi,Spiritual Travel,Ganga Aarti,India Pilgrimage",
      authorName: "Operations Director",
      image: "/images/varanasi.png",
      readTime: "4 mins",
      isPublished: true
    },
    {
      title: "Exploring Ayodhya: Birthplace of Lord Rama and Spiritual Renaissance",
      slug: "exploring-ayodhya-birthplace-lord-rama-renaissance",
      content: "Ayodhya has recently undergone a major transformation, emerging as a world-class spiritual tourism hub. As the birthplace of Lord Rama, the city possesses deep cultural roots. \n\n**Top Places to Visit in Ayodhya:**\n* **Ram Janmabhoomi Temple**: The focal point of the town, presenting stunning modern stone architecture.\n* **Hanuman Garhi**: A temple fort reached by climbing 76 steps, where Lord Hanuman is said to live and guard the city.\n* **Kanak Bhawan**: Famous for its beautiful architecture and golden idols.\n* **Sarayu River Aarti**: The evening Aarti along the Sarayu River offers a peaceful alternative to Varanasi's bustling ghats.\n\nPlan for a 1-2 day itinerary to properly cover all sites.",
      category: "Pilgrimage Guides",
      tags: "Ayodhya,Ram Mandir,Sarayu River,Lord Rama",
      authorName: "Pilgrimage Specialist",
      image: "/images/ayodhya.png",
      readTime: "5 mins",
      isPublished: true
    }
  ];

  for (const blog of blogs) {
    await prisma.blogPost.upsert({
      where: { slug: blog.slug },
      update: blog,
      create: blog,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
