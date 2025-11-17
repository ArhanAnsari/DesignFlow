"use server";
import { createAdminClient } from "@/appwrite/config";

import { error } from "console";

// import { toast } from "sonner";

export async function signUp({
  email,
  username,

  firstName,
  lastName,
  clerkId,
}: {
  email: string;
  username: string;

  firstName: string;
  lastName: string;
  clerkId: string;
}) {
  const { databases } = await createAdminClient();
  try {
    const promise = databases.createRow(
      process.env.NEXT_PUBLIC_DATABASE_ID, // databaseId
      "users", // collectionId
      clerkId,
      {
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
      }
    );
    return { success: true };
  } catch (e) {
    console.log(e);
    return { success: false, error: error };
  }
}
