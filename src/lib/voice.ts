// ---------------------------------------------------------------------------
// Sarvam AI Text-to-Speech + Web Speech API voice input service
// ---------------------------------------------------------------------------

const SARVAM_API_URL = "https://api.sarvam.ai/text-to-speech";
const SARVAM_API_KEY = "sk_4aigtoe9_9RkFsAzxmBgVNSGdqIf8U0Ey";

interface SarvamTTSPayload {
  inputs: string[];
  target_language_code: string;
  speaker: string;
  model: string;
  pitch: number;
  pace: number;
  loudness: number;
  enable_preprocessing: boolean;
}

// ---------------------------------------------------------------------------
// Audio state
// ---------------------------------------------------------------------------

let currentAudio: HTMLAudioElement | null = null;
let isSpeakingFlag = false;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Clean markdown / table formatting from text before sending to TTS */
function cleanTextForSpeech(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\|[^|]*\|/g, " ") // table cells
    .replace(/[-]{2,}/g, " ") // dashes
    .replace(/^[-*]\s/gm, "") // bullet markers
    .replace(/\n+/g, ". ") // newlines to pauses
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

/** Split text into chunks of ~500 chars (Sarvam has input limits) */
function chunkText(text: string, maxLen = 500): string[] {
  const sentences = text.split(/(?<=[.!?।])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + " " + sentence).length > maxLen && current.length > 0) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? current + " " + sentence : sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  // If no chunks were created (no sentence breaks), split by maxLen
  if (chunks.length === 0 && text.length > 0) {
    for (let i = 0; i < text.length; i += maxLen) {
      chunks.push(text.slice(i, i + maxLen));
    }
  }

  return chunks;
}

// ---------------------------------------------------------------------------
// Sarvam AI TTS
// ---------------------------------------------------------------------------

async function fetchSarvamAudio(text: string): Promise<string | null> {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) return null;

  // Sarvam expects array of inputs; we send one chunk at a time
  const payload: SarvamTTSPayload = {
    inputs: [cleaned],
    target_language_code: "hi-IN",
    speaker: "meera",
    model: "bulbul:v2",
    pitch: 0,
    pace: 1.1,
    loudness: 1.5,
    enable_preprocessing: true,
  };

  try {
    const res = await fetch(SARVAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn("Sarvam TTS failed:", res.status, await res.text());
      return null;
    }

    const data = await res.json();
    // Sarvam returns { audios: ["base64..."] }
    if (data.audios && data.audios.length > 0) {
      return data.audios[0];
    }
    return null;
  } catch (err) {
    console.warn("Sarvam TTS error:", err);
    return null;
  }
}

function playBase64Audio(base64: string): Promise<void> {
  return new Promise((resolve, reject) => {
    stopSpeaking();
    const audio = new Audio(`data:audio/wav;base64,${base64}`);
    currentAudio = audio;
    isSpeakingFlag = true;

    audio.onended = () => {
      isSpeakingFlag = false;
      currentAudio = null;
      resolve();
    };
    audio.onerror = (e) => {
      isSpeakingFlag = false;
      currentAudio = null;
      reject(e);
    };

    audio.play().catch((e) => {
      isSpeakingFlag = false;
      currentAudio = null;
      reject(e);
    });
  });
}

// ---------------------------------------------------------------------------
// Browser Web Speech API fallback TTS
// ---------------------------------------------------------------------------

function speakWithBrowserTTS(text: string, onEnd?: () => void) {
  if (!window.speechSynthesis) {
    onEnd?.();
    return;
  }
  window.speechSynthesis.cancel();

  const cleaned = cleanTextForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleaned);

  // Pick a good voice
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find(
      (v) =>
        v.name.includes("Google") &&
        (v.name.includes("Female") || v.lang.startsWith("en"))
    ) ??
    voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female"))
    ) ??
    voices.find((v) => v.lang.startsWith("en")) ??
    voices[0];

  if (preferred) utterance.voice = preferred;
  utterance.rate = 1.0;
  utterance.pitch = 1.1;
  utterance.volume = 0.9;
  if (onEnd) utterance.onend = onEnd;

  isSpeakingFlag = true;
  window.speechSynthesis.speak(utterance);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Speak text using Sarvam AI TTS (with browser TTS fallback).
 * Returns a promise that resolves when speaking is done.
 */
export async function speakText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> {
  const cleaned = cleanTextForSpeech(text);
  if (!cleaned) {
    onEnd?.();
    return;
  }

  onStart?.();

  // Try Sarvam AI first
  const chunks = chunkText(cleaned);
  let usedSarvam = false;

  for (const chunk of chunks) {
    if (!isSpeakingFlag && usedSarvam) break; // was stopped

    const base64 = await fetchSarvamAudio(chunk);
    if (base64) {
      usedSarvam = true;
      try {
        await playBase64Audio(base64);
      } catch {
        // If playback fails, fall through to browser TTS
        break;
      }
    } else {
      // Sarvam failed for this chunk, fallback to browser
      break;
    }
  }

  // If Sarvam didn't work at all, use browser TTS
  if (!usedSarvam) {
    speakWithBrowserTTS(text, () => {
      isSpeakingFlag = false;
      onEnd?.();
    });
    return;
  }

  isSpeakingFlag = false;
  onEnd?.();
}

/** Stop any currently playing audio */
export function stopSpeaking() {
  isSpeakingFlag = false;

  // Stop HTML5 Audio (Sarvam)
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }

  // Stop browser TTS
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

/** Check if currently speaking */
export function getIsSpeaking(): boolean {
  return isSpeakingFlag;
}
