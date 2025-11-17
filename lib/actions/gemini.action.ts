import { createAdminClient } from "@/appwrite/config";
import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

// 🔄 Poll until file becomes ACTIVE
// 🔄 Poll until file becomes ACTIVE
async function waitUntilActive(fileName: string, retries = 10, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    const file = await ai.files.get({ name: fileName }); // 👈 must be just the string ID
    if (file.state === "ACTIVE") return file;
    console.log(`File ${fileName} still ${file.state}, waiting...`);
    await new Promise((res) => setTimeout(res, delayMs));
  }
  throw new Error(
    `File ${fileName} did not become ACTIVE after ${retries} retries`
  );
}

export async function createVideoFeedback({
  storageId,
}: {
  storageId: string;
}) {
  const { storage } = createAdminClient();

  // 1️⃣ Get file metadata
  const fileMetadata = await storage.getFile({
    bucketId: process.env.NEXT_PUBLIC_BUCKET_ID,
    fileId: storageId,
  });

  // 2️⃣ Download file
  const fileDownload = await storage.getFileDownload(
    process.env.NEXT_PUBLIC_BUCKET_ID,
    storageId
  );
  const arrayBuffer = fileDownload;
  const blob = new Blob([arrayBuffer], {
    type: fileMetadata.mimeType || "video/mp4",
  });

  // 3️⃣ Upload to Gemini
  const uploaded = await ai.files.upload({
    file: blob,
    config: { mimeType: fileMetadata.mimeType || "video/mp4" },
  });
  console.log("Uploaded file:", uploaded);

  // 4️⃣ Wait until ACTIVE
  const activeFile = await waitUntilActive(uploaded.name);
  console.log("File is ACTIVE:", activeFile);

  // 5️⃣ Generate content
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent([
      createPartFromUri(activeFile.uri, activeFile.mimeType),
      `Analyze this training video of an athlete. Provide 3 short, actionable coaching tips. Focus on form, safety, and improvement.'
`,
    ]),
  });

  console.log(response.text);
  return response.text;
}
