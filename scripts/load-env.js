/**
 * Custom environment loader that prioritizes system environment variables
 * over .env file values. This ensures that deployment platform variables
 * (e.g., Railway) are not overridden by local .env values.
 */
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const lines = envContent.split("\n");

  lines.forEach((line) => {
    // Skip comments and empty lines
    if (!line || line.trim().startsWith("#")) return;

    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, ""); // Remove quotes

      // Only set if not already defined in environment
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

// Map server-side variables to Expo public client variables
const mappings = {
  GOOGLE_CLIENT_ID: "EXPO_PUBLIC_GOOGLE_CLIENT_ID",
  APPLE_CLIENT_ID: "EXPO_PUBLIC_APPLE_CLIENT_ID",
};

for (const [serverVar, expoVar] of Object.entries(mappings)) {
  if (process.env[serverVar] && !process.env[expoVar]) {
    process.env[expoVar] = process.env[serverVar];
  }
}
