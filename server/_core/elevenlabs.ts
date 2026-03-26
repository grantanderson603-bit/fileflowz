import { ENV } from "./env";

export interface VoiceSynthesisResult {
  audioBuffer: Buffer;
  contentType: string;
}

export interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels?: Record<string, string>;
  description?: string;
  preview_url?: string;
}

/**
 * Synthesize speech from text using ElevenLabs API
 *
 * @param text - The text to synthesize into speech
 * @param options - Synthesis options including voice ID and model
 * @returns Audio buffer and content type
 */
export async function synthesizeSpeech(
  text: string,
  options: { voiceId?: string; modelId?: string } = {}
): Promise<VoiceSynthesisResult> {
  if (!ENV.elevenLabsApiKey) {
    throw new Error("ELEVENLABS_API_KEY is required for voice synthesis");
  }

  const voiceId = options.voiceId || "21m00Tcm4TlvDq8ikWAM"; // Rachel - default voice
  const modelId = options.modelId || "eleven_multilingual_v2";

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": ENV.elevenLabsApiKey,
    },
    body: JSON.stringify({
      text,
      model_id: modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`ElevenLabs error: ${response.status} ${err}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    audioBuffer: Buffer.from(arrayBuffer),
    contentType: "audio/mpeg",
  };
}

/**
 * Get list of available voices from ElevenLabs
 *
 * @returns Array of available voices
 */
export async function getVoices(): Promise<Voice[]> {
  if (!ENV.elevenLabsApiKey) {
    throw new Error("ELEVENLABS_API_KEY is required");
  }

  const response = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: {
      "xi-api-key": ENV.elevenLabsApiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch voices: ${response.status}`);
  }

  const data = await response.json();
  return data.voices.map((v: any) => ({
    voice_id: v.voice_id,
    name: v.name,
    category: v.category,
    labels: v.labels,
    description: v.description,
    preview_url: v.preview_url,
  }));
}
