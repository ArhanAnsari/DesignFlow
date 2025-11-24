const fs = require("fs");
const path = require("path");
const { Client, Databases } = require("node-appwrite");

// 1. Load Environment Variables from .env.local
const envPath = path.join(__dirname, ".env");
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found!");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
const envVars = {};
console.log("--- Parsing .env file ---");
envContent.split("\n").forEach((line) => {
  const match = line.match(/^\s*([^=]+?)\s*=\s*(.*)?$/);
  if (match) {
    const key = match[1].trim();
    let value = match[2] ? match[2].trim() : "";
    value = value.replace(/^["']|["']$/g, ""); // Remove quotes
    envVars[key] = value;
    // Log found keys (masking value)
    console.log(`Found key: ${key}`);
  }
});

const endpoint = envVars.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = envVars.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = envVars.APPWRITE_API_KEY;
const databaseId = envVars.NEXT_PUBLIC_DATABASE_ID;

console.log("--- Configuration ---");
console.log("Endpoint:", endpoint);
console.log("Project ID:", projectId);
console.log("API Key Length:", apiKey ? apiKey.length : "MISSING");
console.log("Database ID:", databaseId);

if (!endpoint || !projectId || !apiKey || !databaseId) {
  console.error("Error: Missing required environment variables.");
  process.exit(1);
}

// 2. Initialize Client
const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);

// 3. Test Connection and Permissions
async function testConnection() {
  try {
    console.log("\n--- Testing Database Access (listDocuments) ---");
    // Try to list documents from "users" collection to check read permissions
    // We use a limit of 1 to be quick
    const result = await databases.listDocuments(
      databaseId,
      "users",
      [] // queries
    );
    console.log('✅ Success! Can read from "users" collection.');
    console.log(`Found ${result.total} documents.`);
  } catch (error) {
    console.error("❌ Error reading documents:", error.message);
    if (error.code === 401) {
      console.error(
        '   -> This confirms the API Key is missing "documents.read" scope or is invalid.'
      );
    }
  }

  try {
    console.log("\n--- Testing Database Write (createDocument - Dry Run) ---");
    // We won't actually create one to avoid garbage, but if we fail auth it happens before validation usually.
    // Actually, let's try to create a document with a simplified payload and immediately delete it,
    // or just rely on the read test if that failed.
    // If read failed, write will likely fail too.

    const testId = "test_connectivity_" + Date.now();
    await databases.createDocument(databaseId, "users", testId, {
      email: "test@example.com",
      username: "test_connectivity",
      firstName: "Test",
      lastName: "Connectivity",
      // Add other required fields if any, assuming these are enough based on route.ts
    });
    console.log('✅ Success! Can write to "users" collection.');

    // Clean up
    await databases.deleteDocument(databaseId, "users", testId);
    console.log("✅ Success! Cleaned up test document.");
  } catch (error) {
    console.error("❌ Error writing/deleting document:", error.message);
    if (error.code === 401) {
      console.error(
        '   -> This confirms the API Key is missing "documents.write" scope.'
      );
    }
  }
}

testConnection();
