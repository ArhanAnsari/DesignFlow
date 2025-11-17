import { Client, Databases, Account, TablesDB, Storage } from "node-appwrite";
const createAdminClient = () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.NEXT_PUBLIC_API_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};
const createSessionClient = async (session) => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
  if (session) {
    client.setSession(session);
  }
  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
};
export { createAdminClient, createSessionClient };
