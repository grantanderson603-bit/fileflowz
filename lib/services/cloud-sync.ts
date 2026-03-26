/**
 * Cloud Sync Service
 * Manages Dropbox and Google Drive integration through tRPC backend routes.
 * Access tokens are stored client-side and passed to the server for each request.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApiBaseUrl } from "@/constants/oauth";
import * as Auth from "@/lib/_core/auth";

export interface CloudFile {
  id: string;
  name: string;
  path: string;
  size: number;
  modifiedTime: Date;
  mimeType?: string;
  provider: "dropbox" | "google-drive";
  isDirectory: boolean;
  syncStatus: "synced" | "syncing" | "pending" | "error";
}

export interface CloudSyncConfig {
  provider: "dropbox" | "google-drive";
  accessToken: string;
  refreshToken?: string;
  expiresAt?: Date;
}

export interface SyncOptions {
  autoSync?: boolean;
  conflictResolution?: "local" | "remote" | "manual";
  selectiveSync?: string[];
}

// Storage keys for persisting cloud tokens
const DROPBOX_TOKEN_KEY = "fileflow_dropbox_token";
const GDRIVE_TOKEN_KEY = "fileflow_gdrive_token";
const GDRIVE_REFRESH_KEY = "fileflow_gdrive_refresh_token";

// Helper to call tRPC backend
async function callTRPC(procedure: string, input: Record<string, unknown>): Promise<any> {
  const baseUrl = getApiBaseUrl();
  const token = await Auth.getSessionToken();

  const response = await fetch(`${baseUrl}/api/trpc/${procedure}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`tRPC call failed (${response.status}): ${err}`);
  }

  const data = await response.json();
  return data?.result?.data ?? data;
}

// Helper to call tRPC query (GET with input encoded)
async function queryTRPC(procedure: string, input: Record<string, unknown>): Promise<any> {
  const baseUrl = getApiBaseUrl();
  const token = await Auth.getSessionToken();
  const encoded = encodeURIComponent(JSON.stringify({ json: input }));

  const response = await fetch(`${baseUrl}/api/trpc/${procedure}?input=${encoded}`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`tRPC query failed (${response.status}): ${err}`);
  }

  const data = await response.json();
  return data?.result?.data ?? data;
}

/**
 * Cloud Sync Manager
 * Single entry point for all cloud storage operations.
 */
export class CloudSyncManager {
  private dropboxToken: string | null = null;
  private gdriveToken: string | null = null;
  private gdriveRefreshToken: string | null = null;
  private syncIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();

  /**
   * Load saved tokens from storage
   */
  async loadTokens(): Promise<void> {
    try {
      this.dropboxToken = await AsyncStorage.getItem(DROPBOX_TOKEN_KEY);
      this.gdriveToken = await AsyncStorage.getItem(GDRIVE_TOKEN_KEY);
      this.gdriveRefreshToken = await AsyncStorage.getItem(GDRIVE_REFRESH_KEY);
    } catch (error) {
      console.warn("Failed to load cloud tokens:", error);
    }
  }

  /**
   * Connect Dropbox - exchange OAuth code for access token
   */
  async connectDropbox(code: string, redirectUri: string): Promise<void> {
    const result = await callTRPC("cloudSync.connectDropbox", { code, redirectUri });
    this.dropboxToken = result.accessToken;
    await AsyncStorage.setItem(DROPBOX_TOKEN_KEY, result.accessToken);
  }

  /**
   * Connect Google Drive - exchange OAuth code for access token
   */
  async connectGoogleDrive(code: string, redirectUri: string): Promise<void> {
    const result = await callTRPC("cloudSync.connectGoogleDrive", { code, redirectUri });
    this.gdriveToken = result.accessToken;
    await AsyncStorage.setItem(GDRIVE_TOKEN_KEY, result.accessToken);
    if (result.refreshToken) {
      this.gdriveRefreshToken = result.refreshToken;
      await AsyncStorage.setItem(GDRIVE_REFRESH_KEY, result.refreshToken);
    }
  }

  /**
   * Check if a provider is connected
   */
  isConnected(provider: "dropbox" | "google-drive"): boolean {
    return provider === "dropbox" ? !!this.dropboxToken : !!this.gdriveToken;
  }

  /**
   * List files from a cloud provider
   */
  async listFiles(provider: "dropbox" | "google-drive", path?: string): Promise<CloudFile[]> {
    if (provider === "dropbox") {
      if (!this.dropboxToken) throw new Error("Dropbox not connected");
      const result = await queryTRPC("cloudSync.listDropboxFiles", {
        path: path || "",
        accessToken: this.dropboxToken,
      });
      return (result.files || []).map((f: any) => ({
        ...f,
        modifiedTime: new Date(f.modifiedTime),
        syncStatus: f.syncStatus || "synced",
      }));
    } else {
      if (!this.gdriveToken) throw new Error("Google Drive not connected");
      const result = await queryTRPC("cloudSync.listGoogleDriveFiles", {
        folderId: path || "root",
        accessToken: this.gdriveToken,
      });
      return (result.files || []).map((f: any) => ({
        ...f,
        modifiedTime: new Date(f.modifiedTime),
        syncStatus: f.syncStatus || "synced",
      }));
    }
  }

  /**
   * Upload a file to a cloud provider
   */
  async uploadFile(
    provider: "dropbox" | "google-drive",
    fileName: string,
    fileUrl: string,
    remotePath?: string
  ): Promise<CloudFile> {
    const accessToken = provider === "dropbox" ? this.dropboxToken : this.gdriveToken;
    if (!accessToken) throw new Error(`${provider} not connected`);

    const result = await callTRPC("cloudSync.uploadFile", {
      provider,
      fileName,
      fileUrl,
      accessToken,
      remotePath,
    });
    return {
      ...result.file,
      modifiedTime: new Date(result.file.modifiedTime),
    };
  }

  /**
   * Delete a file from a cloud provider
   */
  async deleteFile(provider: "dropbox" | "google-drive", fileId: string): Promise<void> {
    const accessToken = provider === "dropbox" ? this.dropboxToken : this.gdriveToken;
    if (!accessToken) throw new Error(`${provider} not connected`);

    await callTRPC("cloudSync.deleteFile", { provider, fileId, accessToken });
  }

  /**
   * Get sync status for all providers
   */
  async getSyncStatus() {
    return queryTRPC("cloudSync.syncStatus", {});
  }

  /**
   * Disconnect a provider
   */
  async disconnect(provider: "dropbox" | "google-drive"): Promise<void> {
    if (provider === "dropbox") {
      this.dropboxToken = null;
      await AsyncStorage.removeItem(DROPBOX_TOKEN_KEY);
    } else {
      this.gdriveToken = null;
      this.gdriveRefreshToken = null;
      await AsyncStorage.removeItem(GDRIVE_TOKEN_KEY);
      await AsyncStorage.removeItem(GDRIVE_REFRESH_KEY);
    }
  }

  /**
   * Start auto-sync polling for a provider
   */
  startAutoSync(provider: "dropbox" | "google-drive", intervalMs = 30000): void {
    this.stopAutoSync(provider);

    const interval = setInterval(async () => {
      try {
        await this.listFiles(provider);
      } catch (error) {
        console.error(`Auto-sync error for ${provider}:`, error);
      }
    }, intervalMs);

    this.syncIntervals.set(provider, interval);
  }

  /**
   * Stop auto-sync for a provider
   */
  stopAutoSync(provider: "dropbox" | "google-drive"): void {
    const interval = this.syncIntervals.get(provider);
    if (interval) {
      clearInterval(interval);
      this.syncIntervals.delete(provider);
    }
  }
}

// Singleton instance
export const cloudSyncManager = new CloudSyncManager();

export default CloudSyncManager;
