import { LeadratService } from "../lib/services/LeadratService";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from the project's .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function runTest() {
  console.log("Starting LeadRat API Integration test...");
  
  const testLead = {
    name: "Test User Leadrat",
    phone: "9998887776",
    email: "test.leadrat@example.com",
    projectName: "Godrej River Royale",
    message: "This is a test lead to verify the LeadRat PUSH API integration.",
  };

  const success = await LeadratService.pushLead(testLead);
  console.log(`LeadRat CRM Push result: ${success ? "SUCCESS" : "FAILURE"}`);
}

runTest();
