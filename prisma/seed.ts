import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const projectsData = [
  {
    name: "Godrej Eden Estate Phase 3",
    location: "At Park World, Hinjawadi",
    typology: "Premium Plots",
    price: "₹ 2.50 Cr* Onwards",
    image: "/assets/project_plots.png",
    possession: "2027",
    highlights: [
      "Units - 247",
      "Land Parcel - 4.12 Acres",
      "There Are 3 Phases In This Project"
    ],
    rera: "P52100080345",
    category: "plots"
  },
  {
    name: "Godrej The Greenfront",
    location: "At Hinjewadi Phase 1, Pune",
    typology: "2 & 3 BHK Apartments",
    price: "₹ 1.15 Cr* Onwards",
    image: "/assets/project_towers_1.png",
    possession: "2029",
    tag1: "Payment Plan - 20:20:60",
    highlights: [
      "Token amount 2 lacs",
      "Special Discount: 3 Lacs",
      "High Street Amenities & Plaza"
    ],
    rera: "P52100079064",
    category: "apartments"
  },
  {
    name: "Godrej Evergreen Square",
    location: "At Hinjewadi Phase 3, Pune",
    typology: "2 & 3 BHK Apartments",
    price: "₹ 85 Lacs* Onwards",
    image: "/assets/project_towers_2.png",
    possession: null,
    tag1: "No PLC Charges | No FRC till 10th Floor",
    tag2: "Zero EMI for 36 Months",
    highlights: [
      "Payment Plan: 20:20:60",
      "Pay only 1% Every Month No Price Hike",
      "Spot Benefit Upto ₹ 3 Lacs*"
    ],
    rera: "P52100078240",
    category: "apartments"
  },
  {
    name: "The Aqua Retreat",
    location: "At Hinjewadi Phase 1, Pune",
    typology: "2 & 3 BHK Apartments",
    price: "₹ 1.10 Cr* Onwards",
    image: "/assets/project_waterfront.png",
    possession: null,
    tag1: "1% Payment Plan",
    highlights: [
      "Payment Plan: 20:80",
      "Spot Offers ₹ 3 Lacs",
      "Up To ₹14 Lakhs Launch Benefit"
    ],
    rera: "PM1260002500070",
    category: "apartments"
  },
  {
    name: "Godrej River Royale",
    location: "At Baner-Hinjewadi Road, Pune",
    typology: "3 and 4 BHK Apartments",
    price: "₹ 2.6 Cr* Onwards",
    image: "/assets/project_towers_1.png",
    possession: "2028",
    tag1: "Payment Plan - 25:25:25:25",
    highlights: [
      "Last Launch In Mahalunge Township",
      "Avail Of-Launch Benefits",
      "Units - 370"
    ],
    rera: "P52100052957",
    category: "apartments"
  },
  {
    name: "Godrej Elaris",
    location: "At Magarpatta, East Pune",
    typology: "2, 3 & 4 BHK Apartments",
    price: "₹ 1.69 Cr* Onwards",
    image: "/assets/project_towers_2.png",
    possession: null,
    highlights: [
      "Excellent freeway and city road access",
      "No of Towers : 08 Towers",
      "292 units on offer"
    ],
    rera: "PM1260002501385",
    category: "apartments"
  },
  {
    name: "Godrej Aqua Vista",
    location: "At Keshav Nagar, Pune",
    typology: "1, 2 & 3 BHK Apartments",
    price: "₹ 75 Lacs* Onwards",
    image: "/assets/project_waterfront.png",
    possession: null,
    highlights: [
      "Land Area: 3 Acres",
      "Amenities: 50+ Amenities",
      "Towers - 7"
    ],
    rera: "PM1260002500389",
    category: "apartments"
  },
  {
    name: "Godrej River Crest",
    location: "At Manjari Road, Kharadi, Pune",
    typology: "3 & 4 BHK Apartments",
    price: "₹ 2 Cr* Onwards",
    image: "/assets/project_towers_1.png",
    possession: null,
    highlights: [
      "Compact Building Footprint.",
      "100 Acre township",
      "Floors - 37"
    ],
    rera: "PM1260002400007",
    category: "apartments"
  },
  {
    name: "Godrej Skyline",
    location: "At Koregaon Park, Pune",
    typology: "3 & 4 BHK Apartments",
    price: "₹ 3.15 Cr* Onwards",
    image: "/assets/project_towers_2.png",
    possession: null,
    highlights: [
      "EOI Amount 3 BHK ₹ 20 Lakhs",
      "EOI Amount 4 BHK ₹ 25 Lakhs",
      "Units - 174"
    ],
    rera: "PM1260002400007",
    category: "apartments"
  },
  {
    name: "Godrej Emerald Water",
    location: "At Pimpri, Pune",
    typology: "1, 2, 3 & 4 BHK Homes",
    price: "₹ 80 Lacs* Onwards",
    image: "/assets/project_towers_1.png",
    possession: "2029",
    tag1: "Payment Plan - 25:25:25:25",
    highlights: [
      "Launch Benefit Up To ₹ 2 Lacs*",
      "Launching Around 1400 Apartments",
      "Floors - 32"
    ],
    rera: "P52100051200 / PP1260002500516",
    category: "apartments"
  }
];

async function main() {
  console.log("Seeding Database...");
  for (const project of projectsData) {
    const existing = await prisma.project.findUnique({
      where: { name: project.name }
    });

    if (!existing) {
      await prisma.project.create({
        data: project
      });
      console.log(`Seeded project: ${project.name}`);
    } else {
      console.log(`Project already exists, skipping: ${project.name}`);
    }
  }
  console.log("Seeding complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
