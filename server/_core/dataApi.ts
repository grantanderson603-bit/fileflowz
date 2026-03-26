// Data API placeholder for future third-party API integrations
// Individual services (Dropbox, Google Drive, YouTube, etc.) now have their own direct API calls
// This file can be used for any generic external API integrations

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

/**
 * Generic external API call helper
 * For most services, use direct API calls instead of this function
 *
 * @param url - Full API endpoint URL
 * @param options - Request options
 * @returns API response
 */
export async function callExternalApi(
  url: string,
  options: RequestInit = {}
): Promise<unknown> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`API request failed (${response.status}): ${detail}`);
  }

  return response.json();
}
