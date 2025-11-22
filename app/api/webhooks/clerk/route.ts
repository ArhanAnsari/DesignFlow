// app/api/webhooks/clerk/route.ts (Example for Next.js App Router)

import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { createAdminClient } from "@/appwrite/config";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET; // Ensure this is in your .env.local

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env.local"
    );
  }

  // Get the headers from the incoming request
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If any required headers are missing, return an error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: No Svix headers", { status: 400 });
  }

  // Get the raw body of the request
  const payload = await req.json();
  const body = JSON.stringify(payload); // Svix needs the raw string body

  // Create a new Svix instance with your secret
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
    return new Response("Error: Invalid signature", { status: 400 });
  }

  // Extract the event type from the webhook payload
  const eventType = evt.type;
  const resolvedDatabaseId = process.env.NEXT_PUBLIC_DATABASE_ID!;
  const resolvedUsersTableId = "users";

  const { databases } = createAdminClient();

  // Handle the different event types
  switch (eventType) {
    case "user.created":
      {
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          username,
          image_url,
          created_at,
        } = evt.data;
        try {
          await databases.createRow(
            resolvedDatabaseId,
            resolvedUsersTableId,
            id,
            {
              email: email_addresses[0]?.email_address || "",
              firstName: first_name || "",
              lastName: last_name || "",
              username: username || "",
              photo: image_url || "",
              createdAt: created_at
                ? new Date(created_at).toISOString()
                : new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          );
          console.log(`User ${id} created in Appwrite Tables`);
        } catch (error) {
          console.error("Error creating user in Appwrite:", error);
          return new Response("Error creating user in Appwrite", {
            status: 500,
          });
        }
      }
      break;

    case "user.updated":
      {
        const {
          id,
          email_addresses,
          first_name,
          last_name,
          username,
          image_url,
        } = evt.data;
        try {
          await databases.updateRow(
            resolvedDatabaseId,
            resolvedUsersTableId,
            id,
            {
              email: email_addresses[0]?.email_address || "",
              firstName: first_name || "",
              lastName: last_name || "",
              username: username || "",
              photo: image_url || "",
              updatedAt: new Date().toISOString(),
            }
          );
          console.log(`User ${id} updated in Appwrite Tables`);
        } catch (error) {
          console.error("Error updating user in Appwrite:", error);
          return new Response("Error updating user in Appwrite", {
            status: 500,
          });
        }
      }
      break;

    case "user.deleted":
      {
        const { id } = evt.data;
        if (!id) {
          console.error("Received user.deleted event without an id");
          return new Response("Error deleting user in Appwrite", {
            status: 400,
          });
        }

        try {
          await databases.deleteRow(
            resolvedDatabaseId,
            resolvedUsersTableId,
            id
          );
          console.log(`User ${id} deleted from Appwrite Tables`);
        } catch (error) {
          console.error("Error deleting user from Appwrite:", error);
          return new Response("Error deleting user from Appwrite", {
            status: 500,
          });
        }
      }
      break;

    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  // Return a 200 OK response to Clerk
  return new Response("Webhook received and processed", { status: 200 });
}
