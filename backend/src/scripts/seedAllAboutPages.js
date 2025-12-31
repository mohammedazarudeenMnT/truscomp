/**
 * Master seed script for all About Pages
 * Runs all about page seed scripts in sequence
 *
 * Usage: node seedAllAboutPages.js
 */

import { connectDB } from "../config/database.js";
import dotenv from "dotenv";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedScripts = [
  "seedOurTeamPageData.js",
  "seedSoftwareArchitecturePageData.js",
  "seedVisionMissionPageData.js",
  "seedTimelinesPageData.js",
];

async function seedAllAboutPages() {
  try {
    console.log("🚀 Starting All About Pages Seeding...\n");
    console.log("=" .repeat(60));

    // Connect to database once
    console.log("\n📡 Connecting to database...");
    await connectDB();
    console.log("✅ Connected to MongoDB\n");

    let successCount = 0;
    let failCount = 0;

    // Run each seed script
    for (const script of seedScripts) {
      console.log("=" .repeat(60));
      console.log(`\n🌱 Running: ${script}\n`);
      console.log("=" .repeat(60));

      try {
        const scriptPath = path.join(__dirname, script);
        execSync(`node "${scriptPath}"`, {
          stdio: "inherit",
          cwd: path.join(__dirname, "../../.."),
        });
        successCount++;
        console.log(`\n✅ ${script} completed successfully!\n`);
      } catch (error) {
        failCount++;
        console.error(`\n❌ ${script} failed!`);
        console.error(error.message);
      }
    }

    // Summary
    console.log("\n" + "=" .repeat(60));
    console.log("📊 SEEDING SUMMARY");
    console.log("=" .repeat(60));
    console.log(`✅ Successful: ${successCount}/${seedScripts.length}`);
    console.log(`❌ Failed: ${failCount}/${seedScripts.length}`);
    console.log("=" .repeat(60));

    if (failCount === 0) {
      console.log("\n🎉 All about pages seeded successfully!");
      console.log("\n📋 Pages Ready:");
      console.log("   ✓ Our Team");
      console.log("   ✓ Software Architecture");
      console.log("   ✓ Vision, Mission & Values");
      console.log("   ✓ Timelines & Milestones");
      console.log("\n🌐 Visit:");
      console.log("   • http://localhost:3000/about/our-team");
      console.log("   • http://localhost:3000/about/software-architecture-the-engine-behind-our-solution");
      console.log("   • http://localhost:3000/about/vision-mission-and-core-values");
      console.log("   • http://localhost:3000/about/timelines-and-milestones");
    } else {
      console.log("\n⚠️  Some seed scripts failed. Please check the errors above.");
    }

    process.exit(failCount === 0 ? 0 : 1);
  } catch (error) {
    console.error("\n❌ Fatal error in master seed script:");
    console.error(error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

seedAllAboutPages();
