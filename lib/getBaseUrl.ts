export function getBaseUrl() {
  // 1. If running inside the browser, use relative path "/"
  if (typeof window !== "undefined") {
    return "";
  }

  // 2. If running on Vercel (deployment)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. If running on Appwrite Cloud Production & you set custom domain
  if (process.env.NEXT_PUBLIC_APPWRITE_URL) {
    try {
      const url = new URL(process.env.NEXT_PUBLIC_APPWRITE_URL);
      return `${url.origin}`;
    } catch (error) {
      console.error("Invalid APPWRITE endpoint:", error);
    }
  }

  // 4. Fallback for Local Development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
