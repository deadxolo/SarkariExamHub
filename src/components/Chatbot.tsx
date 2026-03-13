import { useState, useRef, useEffect, useCallback } from "react";
import type React from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  Minimize2,
  Maximize2,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { getBotResponse, getSuggestionsForContext } from "@/lib/chatbot";
import {
  speakText as sarvamSpeak,
  stopSpeaking as sarvamStop,
} from "@/lib/voice";

// ---------------------------------------------------------------------------
// TypeScript declarations for Web Speech API (voice input)
// ---------------------------------------------------------------------------

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  links?: { label: string; to: string }[];
  timestamp: Date;
  verified?: boolean;
  source?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "sarkari-chatbot-history";
const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "Hi! I'm your SarkariExamHub assistant. Ask me about any government exam -- syllabus, pattern, eligibility, dates, salary, preparation tips, or anything else!",
  sender: "bot",
  timestamp: new Date(),
  verified: false,
};

const DEFAULT_SUGGESTIONS = [
  "Which exams are open?",
  "SSC CGL syllabus",
  "NEET exam pattern",
  "UPSC eligibility",
  "IBPS PO salary",
  "How to prepare for SSC",
];

// ---------------------------------------------------------------------------
// Audio helpers (Web Audio API oscillator for subtle sounds)
// ---------------------------------------------------------------------------

function playMessageSound(type: "send" | "receive") {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.05;

    if (type === "send") {
      osc.frequency.value = 600;
      osc.type = "sine";
    } else {
      osc.frequency.value = 800;
      osc.type = "sine";
    }

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // Audio not supported -- silently ignore
  }
}

// ---------------------------------------------------------------------------
// Speech helpers
// ---------------------------------------------------------------------------

function getSpeechRecognitionConstructor(): (new () => SpeechRecognition) | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

// ---------------------------------------------------------------------------
// localStorage helpers
// ---------------------------------------------------------------------------

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [INITIAL_MESSAGE];
    const parsed = JSON.parse(raw) as Message[];
    return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch {
    return [INITIAL_MESSAGE];
  }
}

function saveMessages(messages: Message[]) {
  try {
    // Keep at most 200 messages to avoid storage bloat
    const toSave = messages.slice(-200);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Storage full or unavailable
  }
}

// ---------------------------------------------------------------------------
// Markdown renderer
// ---------------------------------------------------------------------------

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];

  let tableLines: string[] = [];
  let inTable = false;

  const flushTable = (key: string) => {
    if (tableLines.length < 2) {
      // Not a real table, render as normal lines
      tableLines.forEach((l, i) => {
        nodes.push(<span key={`${key}-tl-${i}`}>{renderInline(l)}</span>);
        nodes.push(<br key={`${key}-tbr-${i}`} />);
      });
    } else {
      // Parse as table
      const rows = tableLines
        .filter((l) => !l.match(/^\|[\s-|]+\|$/))
        .map((l) =>
          l
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim())
        );
      if (rows.length > 0) {
        const header = rows[0];
        const body = rows.slice(1);
        nodes.push(
          <div key={`${key}-table`} className="overflow-x-auto my-1">
            <table className="text-xs border-collapse w-full">
              <thead>
                <tr>
                  {header.map((h, i) => (
                    <th
                      key={i}
                      className="border border-gray-300 bg-gray-100 px-2 py-1 text-left font-semibold"
                    >
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="border border-gray-200 px-2 py-1"
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }
    tableLines = [];
    inTable = false;
  };

  lines.forEach((line, i) => {
    const key = `line-${i}`;

    // Table detection
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      tableLines.push(line.trim());
      return;
    } else if (inTable) {
      flushTable(key);
    }

    // Empty line
    if (line.trim() === "") {
      nodes.push(<br key={key} />);
      return;
    }

    // Bullet points
    if (/^(\s*)[-*]\s/.test(line)) {
      const indent = line.match(/^(\s*)/)?.[1]?.length ?? 0;
      const content = line.replace(/^\s*[-*]\s/, "");
      nodes.push(
        <div
          key={key}
          className="flex gap-1.5"
          style={{ paddingLeft: `${Math.min(indent, 4) * 6}px` }}
        >
          <span className="text-blue-500 shrink-0 mt-0.5">&#8226;</span>
          <span>{renderInline(content)}</span>
        </div>
      );
      return;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s(.*)$/);
      if (match) {
        nodes.push(
          <div key={key} className="flex gap-1.5">
            <span className="text-blue-500 shrink-0 font-medium">
              {match[1]}.
            </span>
            <span>{renderInline(match[2])}</span>
          </div>
        );
        return;
      }
    }

    // Normal line
    nodes.push(
      <span key={key}>
        {i > 0 && !nodes[nodes.length - 1]?.toString().includes("br") && (
          <br />
        )}
        {renderInline(line)}
      </span>
    );
  });

  // Flush any remaining table
  if (inTable) {
    flushTable("end");
  }

  return nodes;
}

function renderInline(text: string): React.ReactNode[] {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, j) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={j} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={j}>{part}</span>;
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);

  // Voice state
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [autoRead, setAutoRead] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();

  // Persist messages
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, interimTranscript]);

  // Focus input when opened
  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      sarvamStop();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Update suggestions based on last messages
  useEffect(() => {
    if (messages.length < 2) {
      setSuggestions(DEFAULT_SUGGESTIONS);
      return;
    }
    const lastBot = [...messages].reverse().find((m) => m.sender === "bot");
    const lastUser = [...messages].reverse().find((m) => m.sender === "user");
    if (lastBot && lastUser) {
      setSuggestions(
        getSuggestionsForContext(lastBot.text, lastUser.text)
      );
    }
  }, [messages]);

  // ---- Voice input ----
  const startListening = useCallback(() => {
    const SRConstructor = getSpeechRecognitionConstructor();
    if (!SRConstructor) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    // Cancel any current speech output
    sarvamStop();
    setIsSpeaking(false);

    const recognition = new SRConstructor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "hi-IN"; // Support Hindi; it also picks up English
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setInterimTranscript("");
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript;
        } else {
          interim += transcript;
        }
      }
      if (final) {
        setInput((prev) => (prev + " " + final).trim());
        setInterimTranscript("");
      } else {
        setInterimTranscript(interim);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimTranscript("");
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript("");
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // ---- Voice output (Sarvam AI TTS) ----
  const readMessage = useCallback((text: string) => {
    if (isSpeaking) {
      sarvamStop();
      setIsSpeaking(false);
      return;
    }
    sarvamSpeak(
      text,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  }, [isSpeaking]);

  // ---- Send message ----
  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) return;

      // Cancel any speech
      sarvamStop();
      setIsSpeaking(false);

      const userMsg: Message = {
        id: Date.now(),
        text: text.trim(),
        sender: "user",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setInterimTranscript("");
      setTyping(true);

      if (soundEnabled) playMessageSound("send");

      // Simulate typing delay (realistic)
      const delay = 400 + Math.random() * 800;
      setTimeout(() => {
        const response = getBotResponse(text);
        const botMsg: Message = {
          id: Date.now() + 1,
          text: response.text,
          sender: "bot",
          links: response.links,
          timestamp: new Date(),
          verified: response.verified,
          source: response.source,
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);

        if (soundEnabled) playMessageSound("receive");

        // Auto-read with Sarvam AI
        if (autoRead) {
          sarvamSpeak(
            response.text,
            () => setIsSpeaking(true),
            () => setIsSpeaking(false)
          );
        }
      }, delay);
    },
    [autoRead, soundEnabled]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleLink = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  const clearChat = () => {
    sarvamStop();
    setMessages([INITIAL_MESSAGE]);
    setSuggestions(DEFAULT_SUGGESTIONS);
  };

  // ---- Render ----
  const hasSpeechSupport = !!getSpeechRecognitionConstructor();

  return (
    <>
      {/* ---- Floating toggle button ---- */}
      <button
        onClick={() => {
          setOpen(!open);
          if (open) {
            sarvamStop();
            stopListening();
          }
        }}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer ${
          open
            ? "bg-gray-700 hover:bg-gray-800 rotate-0"
            : "bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 animate-bounce hover:animate-none"
        }`}
        style={{ animationDuration: "2s" }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Unread badge */}
      {!open && messages.length === 1 && (
        <span className="fixed bottom-[72px] right-6 z-50 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow pointer-events-none">
          1
        </span>
      )}

      {/* ---- Chat window ---- */}
      {open && (
        <div
          className={`fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ${
            minimized
              ? "bottom-24 right-6 h-14 w-[340px] sm:w-[380px]"
              : "bottom-24 right-6 h-[560px] w-[370px] sm:w-[400px] max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:top-0 max-sm:h-full max-sm:w-full max-sm:rounded-none max-sm:border-0"
          }`}
        >
          {/* ---- Header ---- */}
          <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 px-4 py-3 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    ExamHub Assistant
                  </p>
                  <p className="text-[11px] text-blue-200/80">
                    {isListening
                      ? "Listening..."
                      : isSpeaking
                        ? "Speaking..."
                        : "Ask about any government exam"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Auto-read toggle */}
                <button
                  onClick={() => {
                    setAutoRead(!autoRead);
                    if (autoRead) sarvamStop();
                  }}
                  className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer ${
                    autoRead
                      ? "bg-green-500/30 text-green-300"
                      : "bg-white/10 text-white/60 hover:text-white hover:bg-white/20"
                  }`}
                  title={autoRead ? "Auto-read ON" : "Auto-read OFF"}
                  aria-label="Toggle auto-read"
                >
                  {autoRead ? (
                    <Volume2 className="h-3.5 w-3.5" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5" />
                  )}
                </button>

                {/* Clear chat */}
                <button
                  onClick={clearChat}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                {/* Minimize/maximize */}
                <button
                  onClick={() => setMinimized(!minimized)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                  title={minimized ? "Expand" : "Minimize"}
                  aria-label={minimized ? "Expand" : "Minimize"}
                >
                  {minimized ? (
                    <Maximize2 className="h-3.5 w-3.5" />
                  ) : (
                    <Minimize2 className="h-3.5 w-3.5" />
                  )}
                </button>

                {/* Close (mobile) */}
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer sm:hidden"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ---- Content (hidden when minimized) ---- */}
          {!minimized && (
            <>
              {/* ---- Messages ---- */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50/80">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.sender === "bot" && (
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                    )}
                    <div className="max-w-[85%] flex flex-col gap-1">
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-white text-gray-800 border border-gray-200 rounded-bl-md shadow-sm"
                        }`}
                      >
                        <div className="whitespace-pre-wrap">
                          {msg.sender === "bot"
                            ? renderMarkdown(msg.text)
                            : msg.text}
                        </div>

                        {/* Links */}
                        {msg.links && msg.links.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {msg.links.map((link, i) => (
                              <button
                                key={i}
                                onClick={() => handleLink(link.to)}
                                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 cursor-pointer border border-blue-200 transition-colors"
                              >
                                {link.label}
                                <ArrowRight className="h-3 w-3" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bot message footer: verified badge, source, speaker */}
                      {msg.sender === "bot" && (
                        <div className="flex items-center gap-2 px-1">
                          {msg.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600">
                              <CheckCircle2 className="h-3 w-3" />
                              Verified
                            </span>
                          )}
                          {msg.source && (
                            <a
                              href={msg.source}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <ExternalLink className="h-2.5 w-2.5" />
                              Source
                            </a>
                          )}
                          <button
                            onClick={() => readMessage(msg.text)}
                            className="inline-flex items-center gap-0.5 text-[10px] font-medium text-gray-400 hover:text-blue-600 cursor-pointer transition-colors ml-auto"
                            title="Read aloud"
                            aria-label="Read message aloud"
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    {msg.sender === "user" && (
                      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600">
                        <User className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2 animate-in fade-in duration-200">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Bot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 border border-gray-200 shadow-sm">
                      <div className="flex gap-1">
                        <span
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Interim transcript */}
                {isListening && interimTranscript && (
                  <div className="flex justify-end gap-2 animate-in fade-in duration-200">
                    <div className="max-w-[85%] rounded-2xl rounded-br-md bg-blue-500/20 border border-blue-300 px-3.5 py-2.5 text-sm text-blue-700 italic">
                      {interimTranscript}...
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* ---- Quick suggestions ---- */}
              <div className="border-t border-gray-100 bg-white px-3 py-2 shrink-0">
                <p className="mb-1.5 text-[10px] font-medium text-gray-400 uppercase tracking-wide">
                  Suggestions
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-[52px] overflow-hidden">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 cursor-pointer transition-colors whitespace-nowrap"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* ---- Input ---- */}
              <form
                onSubmit={handleSubmit}
                className="border-t border-gray-200 bg-white px-3 py-3 shrink-0"
              >
                <div className="flex items-center gap-2">
                  {/* Mic button */}
                  {hasSpeechSupport && (
                    <button
                      type="button"
                      onClick={toggleListening}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all cursor-pointer ${
                        isListening
                          ? "bg-red-500 text-white shadow-lg shadow-red-500/30 animate-pulse"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                      }`}
                      title={isListening ? "Stop listening" : "Voice input"}
                      aria-label={
                        isListening ? "Stop listening" : "Start voice input"
                      }
                    >
                      {isListening ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </button>
                  )}

                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      isListening
                        ? "Listening... speak now"
                        : "Ask about any exam..."
                    }
                    className="flex-1 rounded-full border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                    disabled={typing}
                  />

                  {/* Sound toggle */}
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer ${
                      soundEnabled
                        ? "text-gray-400 hover:text-gray-600"
                        : "text-gray-300"
                    }`}
                    title={soundEnabled ? "Sound ON" : "Sound OFF"}
                    aria-label="Toggle sound effects"
                  >
                    {soundEnabled ? (
                      <Volume2 className="h-3.5 w-3.5" />
                    ) : (
                      <VolumeX className="h-3.5 w-3.5" />
                    )}
                  </button>

                  {/* Send button */}
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}

      {/* ---- Inline styles for animations ---- */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom-2 {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-in {
          animation: fade-in 0.3s ease-out, slide-in-from-bottom-2 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
