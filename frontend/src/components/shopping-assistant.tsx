"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mic,
  MicOff,
  ImagePlus,
  X,
  ShoppingCart,
  Star,
  Bell,
  Brain,
  Languages,
  Sparkles,
  Loader2,
  CalendarPlus,
  Baby,
  Clock,
  Wallet,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sendChatRequest, type AIResponse } from "@/lib/api";
import { downloadICS } from "@/lib/ics";

const SAMPLE_PROMPTS = [
  "I'm traveling next week with my 8-month-old baby and need diapers, rash cream, snacks and maybe a stroller under 500 AED.",
  "أحتاج مستلزمات لطفلي حديث الولادة - حفاضات وملابس وزجاجات رضاعة",
  "Looking for a thoughtful gift for my friend who just had a baby girl, budget 200 AED",
  "My toddler is starting daycare next month, what do I need?",
];

export function ShoppingAssistant({ selectedModel }: { selectedModel?: string }) {
  const [input, setInput] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setImageBase64(reader.result as string);
      reader.readAsDataURL(file);
    },
    []
  );

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? prev + " " + transcript : transcript));
    };
    recognition.onerror = () => setError("Voice recording failed. Please try again.");
    recognition.onend = () => setIsRecording(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  }, [isRecording]);

  const handleSubmit = async () => {
    if (!input.trim() && !imageBase64) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await sendChatRequest(
        input || "Analyze this product image",
        imageBase64,
        selectedModel
      );
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSample = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-8 mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mumz-soft-pink dark:bg-mumz-pink/10 text-mumz-pink text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" /> Powered by Gemini AI
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Your Smart{" "}
          <span className="mumz-gradient-text">Shopping Partner</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Tell us what you need — by text, voice, or image — and we&apos;ll create a
          personalized shopping list, recommend products, and set reminders.
          In English and Arabic.
        </p>
      </motion.section>

      {/* Input Area */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-2xl mx-auto mb-10"
      >
        <div className="mumz-glass rounded-2xl p-4 mumz-glow border border-border/50">
          <Textarea
            id="main-input"
            placeholder="E.g. I'm traveling next week with my 8-month-old baby..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            className="min-h-[100px] resize-none border-0 bg-transparent focus-visible:ring-0 text-base"
          />

          {/* Image preview */}
          <AnimatePresence>
            {imageName && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 px-3 py-2 mt-2 rounded-lg bg-mumz-soft-pink dark:bg-mumz-pink/10 text-sm"
              >
                <ImagePlus className="w-4 h-4 text-mumz-pink" />
                <span className="truncate flex-1">{imageName}</span>
                <button
                  onClick={() => {
                    setImageBase64(null);
                    setImageName(null);
                  }}
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                id="upload-image-btn"
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-mumz-soft-pink dark:hover:bg-mumz-pink/10"
                onClick={() => fileRef.current?.click()}
                title="Upload image"
              >
                <ImagePlus className="w-5 h-5 text-mumz-pink" />
              </Button>
              <div className="relative">
                <Button
                  id="voice-btn"
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${
                    isRecording
                      ? "bg-red-500/10 text-red-500"
                      : "hover:bg-mumz-soft-purple dark:hover:bg-mumz-purple/10"
                  }`}
                  onClick={toggleRecording}
                  title={isRecording ? "Stop recording" : "Start recording"}
                >
                  {isRecording ? (
                    <MicOff className="w-5 h-5" />
                  ) : (
                    <Mic className="w-5 h-5 text-mumz-purple" />
                  )}
                </Button>
                {isRecording && (
                  <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-pulse-ring" />
                )}
              </div>
            </div>
            <Button
              id="submit-btn"
              onClick={handleSubmit}
              disabled={isLoading || (!input.trim() && !imageBase64)}
              className="mumz-gradient text-white rounded-full px-6 gap-2 hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isLoading ? "Thinking..." : "Ask AI"}
            </Button>
          </div>
        </div>

        {/* Sample prompts */}
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {SAMPLE_PROMPTS.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSample(p)}
              className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-mumz-pink hover:bg-mumz-soft-pink dark:hover:bg-mumz-pink/10 transition-colors text-muted-foreground hover:text-foreground truncate max-w-[260px]"
            >
              {p}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-48 rounded-2xl bg-card border shimmer"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Unsafe query warning */}
            {!result.parsed_info.is_safe && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20"
              >
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium mb-1">
                  <AlertTriangle className="w-5 h-5" />
                  Safety Notice
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-300">
                  {result.clarification_question ||
                    "I'm not able to provide medical advice. Please consult a healthcare professional."}
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Parsed Info Card */}
              <ResultCard
                icon={<Brain className="w-5 h-5" />}
                title="Parsed Context"
                index={0}
                gradient="from-mumz-pink/10 to-mumz-purple/10"
              >
                <div className="space-y-3">
                  {result.parsed_info.child_age && (
                    <InfoRow icon={<Baby className="w-4 h-4" />} label="Child Age" value={result.parsed_info.child_age} />
                  )}
                  {result.parsed_info.budget && (
                    <InfoRow icon={<Wallet className="w-4 h-4" />} label="Budget" value={result.parsed_info.budget} />
                  )}
                  {result.parsed_info.urgency && (
                    <InfoRow icon={<Clock className="w-4 h-4" />} label="Urgency" value={result.parsed_info.urgency} />
                  )}
                  {result.parsed_info.context && (
                    <InfoRow icon={<MapPin className="w-4 h-4" />} label="Context" value={result.parsed_info.context} />
                  )}
                </div>
              </ResultCard>

              {/* Shopping List Card */}
              <ResultCard
                icon={<ShoppingCart className="w-5 h-5" />}
                title="Shopping List"
                index={1}
                gradient="from-green-500/10 to-emerald-500/10"
              >
                <div className="space-y-2">
                  {result.shopping_list.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">{item.item}</span>
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            ×{item.quantity}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Badge
                            className={`text-[10px] ${
                              item.priority === "high"
                                ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                                : item.priority === "medium"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                                : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                            }`}
                          >
                            {item.priority}
                          </Badge>
                          {item.budget && (
                            <span className="text-[10px] text-muted-foreground">
                              {item.budget}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ResultCard>

              {/* Recommendations Card */}
              <ResultCard
                icon={<Star className="w-5 h-5" />}
                title="Recommendations"
                index={2}
                gradient="from-amber-500/10 to-orange-500/10"
              >
                <div className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-background/50 border">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-amber-500 shrink-0" />
                          <span className="text-sm font-semibold">{rec.name}</span>
                        </div>
                        <Badge className="bg-mumz-pink/10 text-mumz-pink shrink-0 text-xs">
                          {rec.price}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1.5 ml-6">{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </ResultCard>

              {/* Reminders Card */}
              <ResultCard
                icon={<Bell className="w-5 h-5" />}
                title="Reminders"
                index={3}
                gradient="from-blue-500/10 to-cyan-500/10"
                action={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs gap-1 text-mumz-purple hover:text-mumz-purple"
                    onClick={() => downloadICS(result.reminders)}
                  >
                    <CalendarPlus className="w-3.5 h-3.5" /> Export .ics
                  </Button>
                }
              >
                <div className="space-y-2">
                  {result.reminders.map((rem, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Bell className="w-3.5 h-3.5 mt-0.5 text-blue-500 shrink-0" />
                      <span>{rem}</span>
                    </div>
                  ))}
                </div>
              </ResultCard>

              {/* Confidence Card */}
              <ResultCard
                icon={<Sparkles className="w-5 h-5" />}
                title="Confidence"
                index={4}
                gradient="from-mumz-purple/10 to-violet-500/10"
              >
                <div className="flex flex-col items-center justify-center py-2">
                  <div className="relative w-24 h-24">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                      <circle
                        cx="50" cy="50" r="40" fill="none"
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${result.confidence_score * 2.51} 251`}
                        className={
                          result.confidence_score >= 70
                            ? "text-green-500"
                            : result.confidence_score >= 40
                            ? "text-amber-500"
                            : "text-red-500"
                        }
                        stroke="currentColor"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold">{result.confidence_score}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {result.confidence_score >= 70
                      ? "High confidence"
                      : result.confidence_score >= 40
                      ? "Moderate — some assumptions made"
                      : "Low — clarification needed"}
                  </p>
                  {result.needs_clarification && result.clarification_question && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 text-center bg-amber-50 dark:bg-amber-500/10 p-2 rounded-lg">
                      {result.clarification_question}
                    </p>
                  )}
                </div>
              </ResultCard>

              {/* Arabic Output Card */}
              <ResultCard
                icon={<Languages className="w-5 h-5" />}
                title="المخرجات العربية"
                index={5}
                gradient="from-teal-500/10 to-emerald-500/10"
              >
                <div className="space-y-3 text-right" dir="rtl">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">🛒 قائمة التسوق</h4>
                    <div className="space-y-1">
                      {result.arabic_output?.قائمة_التسوق?.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span>{item.item}</span>
                          <Badge variant="outline" className="text-[10px]">{item.priority}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">⏰ التذكيرات</h4>
                    <div className="space-y-1">
                      {result.arabic_output?.التذكيرات?.map((rem, i) => (
                        <p key={i} className="text-sm">{rem}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </ResultCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResultCard({
  icon,
  title,
  children,
  index,
  gradient,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  index: number;
  gradient: string;
  action?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className={`h-full mumz-glass overflow-hidden bg-gradient-to-br ${gradient}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <span className="text-mumz-pink">{icon}</span>
              {title}
            </CardTitle>
            {action}
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-mumz-purple">{icon}</span>
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
