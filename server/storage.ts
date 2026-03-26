// Storage helpers for S3-compatible storage (Cloudflare R2, AWS S3, MinIO, etc.)
import { ENV } from "./_core/env";

export interface StoragePutResult {
  key: string;
  url: string;
}

export interface StorageGetResult {
  key: string;
  url: string;
}

/**
 * Upload a file to S3-compatible storage
 * Falls back to local filesystem if S3 is not configured
 *
 * @param relKey - Storage key/path
 * @param data - File content
 * @param contentType - MIME type
 * @returns Key and public URL
 */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<StoragePutResult> {
  if (!ENV.s3Endpoint || !ENV.s3AccessKey) {
    // Fallback: save to local filesystem for development
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const uploadDir = path.join(process.cwd(), "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      // Sanitize key for filesystem
      const fileName = relKey.replace(/\//g, "_");
      const filePath = path.join(uploadDir, fileName);

      const buffer = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
      await fs.writeFile(filePath, buffer);

      return {
        key: relKey,
        url: `/uploads/${fileName}`,
      };
    } catch (error) {
      throw new Error(
        `Filesystem storage failed and S3 not configured: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  // For production S3 storage, install @aws-sdk/client-s3
  // Example implementation:
  // import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
  // const s3 = new S3Client({ ... });
  // await s3.send(new PutObjectCommand({ ... }));

  throw new Error(
    "S3 upload not yet fully implemented. Install @aws-sdk/client-s3 and configure S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET for production storage."
  );
}

/**
 * Get a public URL for a file in storage
 *
 * @param relKey - Storage key/path
 * @returns Key and public URL
 */
export async function storageGet(relKey: string): Promise<StorageGetResult> {
  if (!ENV.s3Endpoint) {
    // Fallback: return local filesystem URL
    const fileName = relKey.replace(/\//g, "_");
    return {
      key: relKey,
      url: `/uploads/${fileName}`,
    };
  }

  // S3-compatible URL
  const publicUrl = ENV.s3PublicUrl || ENV.s3Endpoint;
  const bucket = ENV.s3Bucket || "fileflow";

  return {
    key: relKey,
    url: `${publicUrl}/${bucket}/${relKey}`,
  };
}

/**
 * Delete a file from storage
 *
 * @param relKey - Storage key/path
 */
export async function storageDelete(relKey: string): Promise<void> {
  if (!ENV.s3Endpoint || !ENV.s3AccessKey) {
    // Fallback: delete from local filesystem
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const uploadDir = path.join(process.cwd(), "uploads");
      const fileName = relKey.replace(/\//g, "_");
      const filePath = path.join(uploadDir, fileName);
      await fs.unlink(filePath);
    } catch (error) {
      console.warn(`Failed to delete file from filesystem: ${relKey}`, error);
    }
    return;
  }

  // For production S3 deletion, use @aws-sdk/client-s3
  throw new Error(
    "S3 deletion not yet implemented. Install @aws-sdk/client-s3 for production storage."
  );
}
