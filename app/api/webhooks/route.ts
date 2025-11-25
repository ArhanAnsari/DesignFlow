import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { createAdminClient } from "@/appwrite/config";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return new Response("Error: Missing Webhook Secret", { status: 500 });
  }

  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  // Get the body
  const body = await req.text();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  const eventType = evt.type;
  const { databases } = createAdminClient();
  const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID!;
  const USERS_COLLECTION_ID = "users";

  console.log(`Received webhook with type: ${eventType}`);

  try {
    switch (eventType) {
      case "user.created": {
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          username,
          image_url,
        } = evt.data;

        const user = {
          email: email_addresses[0]?.email_address || "",
          firstName: first_name || "",
          lastName: last_name || "",
          username: username || "",
          photo: image_url || "",
        };

        await databases.createDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          id,
          user
        );
        console.log(`User ${id} created in Appwrite.`);
        break;
      }

      case "user.updated": {
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          username,
          image_url,
        } = evt.data;

        const user = {
          email: email_addresses[0]?.email_address || "",
          firstName: first_name || "",
          lastName: last_name || "",
          username: username || "",
          photo: image_url || "",
        };

        await databases.updateDocument(
          DATABASE_ID,
          USERS_COLLECTION_ID,
          id,
          user
        );
        console.log(`User ${id} updated in Appwrite.`);
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;
        if (!id) {
          console.error("User deleted event missing ID");
          return new Response("Error: Missing user ID", { status: 400 });
        }

        await databases.deleteDocument(DATABASE_ID, USERS_COLLECTION_ID, id);
        console.log(`User ${id} deleted from Appwrite.`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (error) {
    console.error(`Error handling event ${eventType}:`, error);
    return new Response(`Error handling event: ${error}`, { status: 500 });
  }

  return new Response("Webhook received", { status: 200 });
}
