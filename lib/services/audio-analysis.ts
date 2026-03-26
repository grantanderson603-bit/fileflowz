/**
 * Audio Analysis Service
 * Bridges client-side components to the backend tRPC audio routes.
 * Falls back to local mock data if the backend call fails.
 */

export interface AudioMetadata {
  bpm: number;
  genre: string;
  key: string;
  timeSignature: string;
  duration: number;
  confidence: {
    bpm: number;
    genre: number;
    key: number;
  };
}

export interface ChordProgression {
  chord: string;
  type: "major" | "minor" | "dominant" | "diminished" | "augmented";
  bar: number;
  confidence: number;
  frequency: number;
}

export interface SongStructure {
  name: string;
  startTime: number;
  endTime: number;
  bars: string;
  color: string;
}

export interface AudioAnalysisResult {
  metadata: AudioMetadata;
  chords: ChordProgression[];
  structure: SongStructure[];
  waveform: number[];
  notes: string[];
}

// We import the tRPC vanilla client helper so this service can be used
// outside of React components (e.g. in plain async functions).
import { getApiBaseUrl } from "@/constants/oauth";
import * as Auth from "@/lib/_core/auth";

async function callBackend(
  procedure: string,
  input: Record<string, unknown>
): Promise<any> {
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
    throw new Error(`Backend call failed: ${response.status}`);
  }

  const data = await response.json();
  // tRPC wraps the result in { result: { data } }
  return data?.result?.data ?? data;
}

/**
 * Audio Analysis Service
 * Calls backend tRPC endpoints, falls back to defaults on error.
 */
export class AudioAnalysisService {
  /**
   * Full audio analysis via backend LLM
   */
  static async analyzeAudio(audioUrl: string): Promise<AudioAnalysisResult> {
    try {
      return await callBackend("audio.analyze", { audioUrl });
    } catch (error) {
      console.warn("Audio analysis backend call failed, using fallback:", error);
      return this.getFallbackResult();
    }
  }

  static async detectBPM(audioUrl: string): Promise<number> {
    try {
      const result = await callBackend("audio.detectBPM", { audioUrl });
      return result.bpm ?? 128;
    } catch {
      return 128;
    }
  }

  static async detectGenre(audioUrl: string): Promise<string> {
    try {
      const result = await callBackend("audio.detectGenre", { audioUrl });
      return result.genre ?? "Pop";
    } catch {
      return "Pop";
    }
  }

  static async detectChords(audioUrl: string): Promise<ChordProgression[]> {
    try {
      const result = await callBackend("audio.detectChords", { audioUrl });
      return result.chords ?? [];
    } catch {
      return [
        { chord: "C", type: "major", bar: 1, confidence: 0.98, frequency: 440 },
        { chord: "Am", type: "minor", bar: 2, confidence: 0.96, frequency: 440 },
        { chord: "F", type: "major", bar: 3, confidence: 0.94, frequency: 349 },
        { chord: "G", type: "major", bar: 4, confidence: 0.97, frequency: 392 },
      ];
    }
  }

  static async detectKey(audioUrl: string): Promise<string> {
    try {
      const result = await callBackend("audio.detectKey", { audioUrl });
      return result.key ?? "C Major";
    } catch {
      return "C Major";
    }
  }

  static async getWaveform(audioUrl: string): Promise<number[]> {
    try {
      const result = await callBackend("audio.getWaveform", { audioUrl });
      return result.waveform ?? generateWaveform();
    } catch {
      return generateWaveform();
    }
  }

  static async analyzeSongStructure(audioUrl: string): Promise<SongStructure[]> {
    try {
      const result = await callBackend("audio.analyzeSongStructure", { audioUrl });
      return result.structure ?? [];
    } catch {
      return [
        { name: "Intro", startTime: 0, endTime: 15, bars: "1-4", color: "#3B82F6" },
        { name: "Verse 1", startTime: 15, endTime: 45, bars: "5-12", color: "#8B5CF6" },
        { name: "Chorus", startTime: 45, endTime: 75, bars: "13-20", color: "#EC4899" },
        { name: "Verse 2", startTime: 75, endTime: 105, bars: "21-28", color: "#8B5CF6" },
        { name: "Chorus", startTime: 105, endTime: 135, bars: "29-36", color: "#EC4899" },
        { name: "Outro", startTime: 135, endTime: 160, bars: "37-42", color: "#10B981" },
      ];
    }
  }

  static async extractNotes(audioUrl: string): Promise<string[]> {
    try {
      const result = await callBackend("audio.extractNotes", { audioUrl });
      return result.notes ?? ["C4", "E4", "G4", "A4", "C5"];
    } catch {
      return ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5"];
    }
  }

  static getFallbackResult(): AudioAnalysisResult {
    return {
      metadata: {
        bpm: 128,
        genre: "Pop",
        key: "C Major",
        timeSignature: "4/4",
        duration: 160,
        confidence: { bpm: 0.95, genre: 0.87, key: 0.92 },
      },
      chords: [
        { chord: "C", type: "major", bar: 1, confidence: 0.98, frequency: 440 },
        { chord: "Am", type: "minor", bar: 2, confidence: 0.96, frequency: 440 },
        { chord: "F", type: "major", bar: 3, confidence: 0.94, frequency: 349 },
        { chord: "G", type: "major", bar: 4, confidence: 0.97, frequency: 392 },
      ],
      structure: [
        { name: "Intro", startTime: 0, endTime: 15, bars: "1-4", color: "#3B82F6" },
        { name: "Verse 1", startTime: 15, endTime: 45, bars: "5-12", color: "#8B5CF6" },
        { name: "Chorus", startTime: 45, endTime: 75, bars: "13-20", color: "#EC4899" },
      ],
      waveform: generateWaveform(),
      notes: ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5"],
    };
  }
}

function generateWaveform(): number[] {
  return Array.from({ length: 40 }, (_, i) => 10 + Math.sin(i * 0.5) * 20 + Math.random() * 15);
}

export default AudioAnalysisService;
