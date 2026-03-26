import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  size?: string;
  quality?: string;
};

export type GenerateImageResponse = {
  url?: string;
  revisedPrompt?: string;
};

/**
 * Generate an image using OpenAI DALL-E API
 *
 * @param options - Image generation parameters
 * @returns Generated image URL
 */
export async function generateImage(options: GenerateImageOptions): Promise<GenerateImageResponse> {
  if (!ENV.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is required for image generation");
  }

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ENV.openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: options.prompt,
      n: 1,
      size: options.size || "1024x1024",
      quality: options.quality || "standard",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Image generation failed: ${response.status} ${err}`);
  }

  const data = await response.json();
  return {
    url: data.data[0]?.url || "",
    revisedPrompt: data.data[0]?.revised_prompt,
  };
}
