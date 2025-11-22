/**
 * Gemini AI Utilities and Constants
 * Centralized configuration and helper functions for Gemini integration
 */

export const GEMINI_CONFIG = {
  model: "gemini-2.0-flash",
  videoModels: ["gemini-2.0-flash", "gemini-2.0-flash-exp", "gemini-1.5-pro"],
  maxRetries: 10,
  retryDelayMs: 1000,
  supportedVideoTypes: [
    "video/mp4",
    "video/mpeg",
    "video/mov",
    "video/avi",
    "video/flv",
    "video/mkv",
    "video/mpg",
    "video/webm",
    "video/wmv",
    "video/3gpp",
  ],
};

/**
 * Prompt templates for different use cases
 */
export const GEMINI_PROMPTS = {
  videoAnalysis: `Analyze this video content. Provide:
1. Key insights or findings
2. 3 actionable recommendations
3. Potential areas for improvement

Format the response in a clear, professional manner suitable for business context.`,

  leadAnalysis: `Analyze the information about this potential lead. Provide:
1. Lead quality score (1-10)
2. Key characteristics and fit
3. Recommended outreach strategy
4. Potential objections and how to address them`,

  contentReview: `Review this content and provide:
1. Key strengths
2. Areas for improvement
3. Engagement potential
4. Recommended changes for better performance`,

  salesCopy: `Create compelling sales copy for this product/service. Include:
1. Attention-grabbing headline
2. Key benefits (3-5 points)
3. Social proof element
4. Clear call-to-action`,
};

/**
 * Validate if file type is supported for Gemini
 */
export const isVideoTypeSupported = (mimeType: string): boolean => {
  return GEMINI_CONFIG.supportedVideoTypes.includes(mimeType);
};

/**
 * Format file size for readable output
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};
