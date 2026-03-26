export const ENV = {
  jwtSecret: process.env.JWT_SECRET ?? "change-me-in-production",
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",

  // AI/LLM
  openaiApiKey: process.env.OPENAI_API_KEY ?? "",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? "",
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  perplexityApiKey: process.env.PERPLEXITY_API_KEY ?? "",

  // Voice & Audio
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY ?? "",

  // Cloud Storage APIs
  dropboxAppKey: process.env.DROPBOX_APP_KEY ?? "",
  dropboxAppSecret: process.env.DROPBOX_APP_SECRET ?? "",
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",

  // Apple Sign-In
  appleClientId: process.env.APPLE_CLIENT_ID ?? "",
  appleTeamId: process.env.APPLE_TEAM_ID ?? "",

  // File Storage (S3-compatible / Cloudflare R2)
  s3Endpoint: process.env.S3_ENDPOINT ?? "",
  s3AccessKey: process.env.S3_ACCESS_KEY ?? "",
  s3SecretKey: process.env.S3_SECRET_KEY ?? "",
  s3Bucket: process.env.S3_BUCKET ?? "fileflow",
  s3PublicUrl: process.env.S3_PUBLIC_URL ?? "",

  // App
  appUrl: process.env.APP_URL ?? "http://localhost:8081",
  port: parseInt(process.env.PORT ?? "3000"),
};
