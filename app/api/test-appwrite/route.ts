import { createAdminClient } from "@/appwrite/config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { databases } = createAdminClient();
    const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID;

    if (!DATABASE_ID) {
      return NextResponse.json(
        {
          status: "error",
          message: "NEXT_PUBLIC_DATABASE_ID is missing",
        },
        { status: 500 }
      );
    }

    // Attempt to list documents to verify 'documents.read' scope
    // We use 'users' collection as it's used in the webhook
    const result = await databases.listDocuments(DATABASE_ID, "users", []);

    return NextResponse.json({
      status: "success",
      message: "Appwrite connection successful",
      details: {
        databaseId: DATABASE_ID,
        documentsFound: result.total,
        apiKeyConfigured: true,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        message: error.message,
        code: error.code,
        details:
          "If code is 401, check API Key scopes (documents.read, documents.write). If code is 403, check API Key validity.",
      },
      { status: 500 }
    );
  }
}
