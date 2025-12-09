"use server";
import { account, databases, ID } from "@/app/appwrite";
import { createAdminClient, createSessionClient } from "@/appwrite/config";
import auth from "@/auth";
import { Query } from "appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// ============================== Auth

export async function loginWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false };
  }
}
export async function signUp({
  email,
  username,
  password,
  firstName,
  lastName,
}: {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}) {
  const { databases } = await createAdminClient();
  try {
    const session = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "users", // collectionId
      session.$id,
      {
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
      }
    );
    return { success: true };
  } catch (e: any) {
    console.log(e);
    return { success: false, error: e?.message || "Unknown error" };
  }
}
// Login
export async function createSession({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("session", session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, message: e?.message || "Unknown error" };
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  auth.sessionCookie = (await cookies()).get("session");

  if (auth.sessionCookie) {
    try {
      const { account } = await createSessionClient(auth.sessionCookie.value);
      await account.deleteSession("current");
    } catch (error) {}
  }

  (await cookies()).delete("session");
  auth.user = null;
  auth.sessionCookie = null;
  redirect("/sign-in");
}
// ============================== GET USER PROFILE BY ID
export async function getUserProfileByID({ id }: { id: string }) {
  try {
    const { databases } = await createAdminClient();
    const user = await databases.getDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "users", // collectionId
      id
    );
    return { succes: true, data: user };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

// Client Management
export async function createClient({
  name,
  email,
  phone,
  address,
  company,
  note,
  userId,
}: {
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  note: string;
  userId: string;
}) {
  try {
    const { databases } = await createAdminClient();
    const client = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "clients", // collectionId
      ID.unique(),
      {
        name: name,
        email: email,
        phone: phone,
        address: address,
        company: company,
        note: note,
        createdAt: new Date().toISOString(),
        userId: userId,
      }
    );
    return { success: true, data: client };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
export async function getClients({ userId }: { userId: string }) {
  try {
    const { databases } = await createAdminClient();
    const clients = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "clients", // collectionId
      [Query.equal("userId", userId)]
    );
    return { success: true, data: clients.documents };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
