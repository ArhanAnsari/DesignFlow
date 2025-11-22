import { createAdminClient } from "@/appwrite/config";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

// Initialize Gemini AI with error handling
const initializeGemini = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error(
      "Gemini API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY environment variable."
    );
  }

  return new GoogleGenAI({
    apiKey,
  });
};

let ai: GoogleGenAI;

try {
  ai = initializeGemini();
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
  throw error;
}

/**
 * Poll until uploaded file becomes ACTIVE in Gemini
 * @param fileName - Name of the file to check
 * @param retries - Maximum number of retry attempts (default: 10)
 * @param delayMs - Delay between retries in milliseconds (default: 1000)
 * @returns Active file object
 */
async function waitUntilActive(
  fileName: string,
  retries = 10,
  delayMs = 1000
) {
  for (let i = 0; i < retries; i++) {
    try {
      const file = await ai.files.get({ name: fileName });
      if (file.state === "ACTIVE") {
        console.log(`✅ File ${fileName} is now ACTIVE`);
        return file;
      }
      console.log(`⏳ File ${fileName} state: ${file.state} (${i + 1}/${retries})`);
      await new Promise((res) => setTimeout(res, delayMs));
    } catch (error) {
      console.error(`Error checking file status for ${fileName}:`, error);
      if (i === retries - 1) throw error;
    }
  }
  throw new Error(
    `File ${fileName} did not become ACTIVE after ${retries} retries`
  );
}

/**
 * Generate AI-powered feedback for uploaded video using Gemini
 * @param storageId - ID of the video file in Appwrite storage
 * @returns Feedback text from Gemini AI
 */
export async function createVideoFeedback({
  storageId,
}: {
  storageId: string;
}) {
  try {
    const { storage } = createAdminClient();
    const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;

    if (!bucketId) {
      throw new Error("Appwrite bucket ID not configured");
    }

    // 1️⃣ Get file metadata
    console.log(`📥 Fetching file metadata for ${storageId}...`);
    const fileMetadata = await storage.getFile({
      bucketId,
      fileId: storageId,
    });
    console.log(`📄 File info: ${fileMetadata.name} (${fileMetadata.sizeOriginal} bytes)`);

    // 2️⃣ Download file
    console.log(`⬇️ Downloading file from Appwrite...`);
    const fileDownload = await storage.getFileDownload(bucketId, storageId);
    const blob = new Blob([fileDownload], {
      type: fileMetadata.mimeType || "video/mp4",
    });

    // 3️⃣ Upload to Gemini
    console.log(`🚀 Uploading to Gemini Files API...`);
    const uploaded = await ai.files.upload({
      file: blob,
      config: { mimeType: fileMetadata.mimeType || "video/mp4" },
    });
    console.log(`✅ Uploaded to Gemini: ${uploaded.name}`);

    // 4️⃣ Wait until ACTIVE
    const activeFile = await waitUntilActive(uploaded.name || "");

    // 5️⃣ Generate content
    console.log(`🤖 Generating AI feedback...`);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: createUserContent([
        createPartFromUri(activeFile.uri || "", activeFile.mimeType || ""),
        `Analyze this video content. Provide:
1. Key insights or findings
2. 3 actionable recommendations
3. Potential areas for improvement

Format the response in a clear, professional manner suitable for business context.`,
      ]),
    });

    console.log(`✨ Feedback generated successfully`);
    return response.text;
  } catch (error) {
    console.error("❌ Error generating video feedback:", error);
    throw new Error(
      `Failed to generate feedback: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
