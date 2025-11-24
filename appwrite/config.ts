import { Client, Databases, Account, Storage } from "node-appwrite";

/**
 * Create an admin client for server-side operations
 * Uses API key for full access to all collections and buckets
 */
const createAdminClient = () => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) {
    console.error("Appwrite Config Error: Missing variables", {
      hasEndpoint: !!endpoint,
      hasProject: !!projectId,
      hasKey: !!apiKey,
    });
    throw new Error(
      "Missing Appwrite configuration. Please ensure NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, and APPWRITE_API_KEY are set."
    );
  }

  console.log("Appwrite Admin Client Initialized", {
    endpoint,
    projectId,
    keyLength: apiKey.length, // Log length to verify it's not empty/malformed
  });

  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

/**
 * Create a session client for client-side operations
 * Uses session authentication for secure user-specific operations
 */
const createSessionClient = async (session: string | null) => {
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
  const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

  if (!endpoint || !projectId) {
    throw new Error(
      "Missing Appwrite configuration. Please ensure NEXT_PUBLIC_APPWRITE_ENDPOINT and NEXT_PUBLIC_APPWRITE_PROJECT_ID are set."
    );
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId);

  if (session) {
    client.setSession(session);
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};

export { createAdminClient, createSessionClient };
