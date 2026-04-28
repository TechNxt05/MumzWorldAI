"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Loader2,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Award,
  ThumbsUp,
  Scale,
  BookOpen,
  Languages,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getProducts, sendCompareRequest, type Product, type ComparisonResponse } from "@/lib/api";

export function CompareAI({ selectedModel }: { selectedModel?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [intent, setIntent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ComparisonResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((e) => console.error("Failed to load products", e));
  }, []);

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      if (prev.length >= 5) return prev; // max 5
      return [...prev, id];
    });
  };

  const handleCompare = async () => {
    if (selectedIds.length < 2) {
      setError("Please select at least 2 products to compare.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await sendCompareRequest(selectedIds, intent, selectedModel);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mumz-purple/10 text-mumz-purple text-sm font-medium mb-4">
          <Scale className="w-4 h-4" /> Grounded Product Comparison
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Find Your <span className="mumz-gradient-text">Perfect Match</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          Select up to 5 products and tell us what matters most to you. Our AI will analyze the specs and reviews to help you decide.
        </p>
      </motion.section>

      {/* Input Area */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {/* Product Selection */}
        <div className="md:col-span-1 mumz-glass rounded-2xl p-4 mumz-glow border border-border/50 max-h-[400px] overflow-y-auto">
          <h3 className="font-semibold text-sm mb-3 sticky top-0 bg-background/80 backdrop-blur-md pb-2 z-10 flex justify-between items-center">
            Select Products
            <Badge variant="secondary" className="text-[10px]">{selectedIds.length}/5</Badge>
          </h3>
          <div className="space-y-2">
            {products.map((p) => (
              <label
                key={p.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  selectedIds.includes(p.id)
                    ? "border-mumz-purple bg-mumz-purple/5"
                    : "border-border hover:bg-muted/50"
                }`}
              >
                <Checkbox
                  checked={selectedIds.includes(p.id)}
                  onCheckedChange={() => toggleProduct(p.id)}
                  className="mt-0.5"
                  disabled={!selectedIds.includes(p.id) && selectedIds.length >= 5}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{p.brand} • {p.price} AED</p>
                </div>
              </label>
            ))}
            {products.length === 0 && (
              <div className="text-center text-sm text-muted-foreground py-10">
                Loading products...
              </div>
            )}
          </div>
        </div>

        {/* Intent & Actions */}
        <div className="md:col-span-2 mumz-glass rounded-2xl p-4 mumz-glow border border-border/50 flex flex-col">
          <h3 className="font-semibold text-sm mb-3">Your Requirements (Optional)</h3>
          <Textarea
            placeholder="E.g. I need a compact stroller for taxi use and apartment storage under 900 AED..."
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="flex-1 min-h-[150px] resize-none border-0 bg-transparent focus-visible:ring-0 text-base"
          />

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground max-w-[200px]">
              AI will normalize specs and compare features based on your needs.
            </p>
            <Button
              onClick={handleCompare}
              disabled={isLoading || selectedIds.length < 2}
              className="bg-mumz-purple text-white hover:bg-mumz-purple/90 rounded-full px-6 gap-2 transition-opacity"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {isLoading ? "Analyzing..." : "Compare Selected"}
            </Button>
          </div>
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

      {/* Loading Skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            <div className="h-24 rounded-2xl bg-card border shimmer" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-64 rounded-2xl bg-card border shimmer" />
              <div className="h-64 rounded-2xl bg-card border shimmer" />
            </div>
            <div className="h-48 rounded-2xl bg-card border shimmer" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {result && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            {/* Bilingual Summary Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="mumz-glass bg-gradient-to-br from-mumz-purple/10 to-violet-500/10 border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-mumz-purple font-semibold mb-2">
                    <Sparkles className="w-5 h-5" /> AI Recommendation
                  </div>
                  <p className="text-sm leading-relaxed">{result.final_summary_en}</p>
                </CardContent>
              </Card>
              <Card className="mumz-glass bg-gradient-to-bl from-teal-500/10 to-emerald-500/10 border-0 text-right" dir="rtl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-start gap-2 text-teal-600 dark:text-teal-400 font-semibold mb-2">
                    <Languages className="w-5 h-5" /> التوصية
                  </div>
                  <p className="text-sm leading-relaxed">{result.final_summary_ar}</p>
                </CardContent>
              </Card>
            </div>

            {/* Winner & Best For */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="md:col-span-1 border-mumz-purple/30 bg-mumz-purple/5">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <Award className="w-12 h-12 text-mumz-purple mb-3" />
                  <h3 className="text-sm font-medium text-muted-foreground">Overall Best</h3>
                  <p className="text-xl font-bold mt-1 text-foreground">
                    {products.find(p => p.id === result.overall_best)?.name || result.overall_best}
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-amber-500" /> Best For Specific Needs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(result.best_for).map(([need, id], i) => (
                      <div key={i} className="bg-muted/50 p-3 rounded-lg flex items-start gap-3 border">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{need}</p>
                          <p className="text-sm font-medium">{products.find(p => p.id === id)?.name || id}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Table */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted/30 pb-4 border-b">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Scale className="w-4 h-4 text-blue-500" /> Feature Comparison
                </CardTitle>
              </CardHeader>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/10 text-muted-foreground text-xs uppercase bg-muted/30">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Dimension</th>
                      {result.products_compared.map((id) => (
                        <th key={id} className="px-6 py-3 font-semibold w-1/4">
                          {products.find((p) => p.id === id)?.name || id}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {result.comparison_dimensions.map((dim, i) => (
                      <tr key={i} className="hover:bg-muted/10">
                        <td className="px-6 py-4 font-medium capitalize border-r bg-muted/5">
                          {dim.replace(/_/g, " ")}
                        </td>
                        {result.products_compared.map((id) => {
                          const score = result.dimension_scores[id]?.[dim];
                          const isWinner = result.winner_by_dimension[dim] === id;
                          return (
                            <td key={id} className={`px-6 py-4 ${isWinner ? "bg-green-500/5" : ""}`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-lg">{score}/10</span>
                                </div>
                                {isWinner && <Badge className="bg-green-500 hover:bg-green-600 text-[10px]">Winner</Badge>}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Tradeoffs & Citations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" /> Key Tradeoffs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.tradeoffs.map((tradeoff, i) => (
                      <li key={i} className="text-sm flex items-start gap-2 text-muted-foreground">
                        <span className="text-amber-500 mt-0.5">•</span> {tradeoff}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" /> Citations & Evidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.citations.map((citation, i) => (
                      <li key={i} className="text-xs italic flex items-start gap-2 text-muted-foreground bg-muted/30 p-2 rounded-md border border-border/50">
                        <span className="text-blue-500 mt-0.5 font-bold">"</span> {citation} <span className="text-blue-500 mt-0.5 font-bold">"</span>
                      </li>
                    ))}
                  </ul>
                  {result.unsupported_questions.length > 0 && (
                    <div className="mt-4 pt-3 border-t">
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">Could not answer based on data:</p>
                      <ul className="space-y-1">
                        {result.unsupported_questions.map((q, i) => (
                          <li key={i} className="text-xs text-muted-foreground flex items-center gap-1">
                            <X className="w-3 h-3 text-amber-500" /> {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              <span>Confidence Score:</span>
              <Badge variant={result.confidence > 80 ? "default" : "secondary"}>{result.confidence}%</Badge>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
