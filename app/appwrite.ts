import { Client, Account, Databases, ID, Storage } from "appwrite";

// Initialize Appwrite Client
const initializeAppwrite = () => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    console.warn(
      "Appwrite credentials not configured. Please set NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID"
    );
  }

  const client = new Client();
  if (endpoint && projectId) {
    client.setEndpoint(endpoint).setProject(projectId);
  }
  return client;
};

export const client = initializeAppwrite();

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export { ID } from "appwrite";

// Export constants for database operations
export const APPWRITE_CONFIG = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  bucketId: process.env.NEXT_PUBLIC_BUCKET_ID!,
  leadsCollectionId: process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID,
  clientsCollectionId: process.env.NEXT_PUBLIC_CLIENTS_COLLECTION_ID,
};
