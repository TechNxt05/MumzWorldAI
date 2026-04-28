"use client";

import { useState } from "react";
import { Baby, Languages, Moon, Sun, Scale, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompareAI } from "@/components/compare-ai";
import { ShoppingAssistant } from "@/components/shopping-assistant";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"compare" | "assistant">("compare");
  const [showArabic, setShowArabic] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background blobs */}
      <div className="bg-blob w-[500px] h-[500px] bg-mumz-pink/30 top-[-100px] left-[-100px]" />
      <div className="bg-blob w-[400px] h-[400px] bg-mumz-purple/20 bottom-[-50px] right-[-50px]" />
      <div className="bg-blob w-[300px] h-[300px] bg-mumz-pink-light/20 top-[40%] right-[20%]" />

      {/* Top bar */}
      <header className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl mumz-gradient flex items-center justify-center">
              <Baby className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold mumz-gradient-text">Mumzworld</h1>
              <p className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold">
                AI Copilot
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowArabic(!showArabic)}
              className="rounded-full"
            >
              <Languages className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDark}
              className="rounded-full"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-muted/50 p-1 rounded-full border shadow-sm">
          <Button
            variant={activeTab === "compare" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("compare")}
            className={`rounded-full px-6 gap-2 ${activeTab === "compare" ? "bg-background text-foreground shadow-sm hover:bg-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Scale className="w-4 h-4" /> Compare AI
          </Button>
          <Button
            variant={activeTab === "assistant" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("assistant")}
            className={`rounded-full px-6 gap-2 ${activeTab === "assistant" ? "bg-background text-foreground shadow-sm hover:bg-background" : "text-muted-foreground hover:text-foreground"}`}
          >
            <ShoppingBag className="w-4 h-4" /> Assistant
          </Button>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowArabic(!showArabic)}
            className="rounded-full"
            title="Toggle Arabic"
          >
            <Languages className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDark}
            className="rounded-full"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      <main className="relative z-10">
        {activeTab === "compare" ? <CompareAI /> : <ShoppingAssistant />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-xs text-muted-foreground">
        Built with ❤️ for Mumzworld AI Internship — Track A | Amritanshu Yadav
      </footer>
    </div>
  );
}
