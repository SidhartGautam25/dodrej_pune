import { prisma } from "../lib/db";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  try {
    const projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        gallery: true,
        floorPlans: true,
        reraQrImage: true,
      }
    });
    console.log("Projects in database:");
    console.log(JSON.stringify(projects, null, 2));
  } catch (err) {
    console.error("Error fetching projects:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
