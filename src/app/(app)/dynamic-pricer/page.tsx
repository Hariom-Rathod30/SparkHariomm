
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { DynamicPricerOutput } from "@/ai/flows/dynamic-pricer";
import { inventoryData, InventoryItem } from "@/lib/inventory-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Loader2, Wand2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function DynamicPricerPage() {
  const [recommendation, setRecommendation] = useState<DynamicPricerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const inventoryForPricing = useMemo(() => {
    return inventoryData;
  }, []);

  const handleItemSelect = async (item: InventoryItem) => {
    setSelectedItem(item);
    setRecommendation(null);
    setIsLoading(true);
    
    // Simulate AI call with a timeout
    setTimeout(() => {
        const priceDrop = item.originalPrice * (Math.random() * (0.15 - 0.05) + 0.05); // 5-15% drop
        const suggestedPrice = item.originalPrice - priceDrop;

        const dummyRecommendation: DynamicPricerOutput = {
            suggestedPrice: suggestedPrice,
            reasoning: "Price adjusted to stay competitive with online sellers while maximizing margin based on current market trends in electronics.",
        };

        setRecommendation(dummyRecommendation);
        setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Agile Pricing Engine</h1>
        <p className="text-muted-foreground mt-1">
          Leverage real-time market intelligence to set the perfect price. Maximize revenue and maintain a competitive edge in the dynamic Indian market with AI-driven pricing strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select a Product for Pricing</CardTitle>
            <CardDescription>
              Choose a product from the live inventory feed to analyze.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {inventoryForPricing.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemSelect(item)}
                    disabled={isLoading}
                    className={cn(
                      "w-full text-left p-4 rounded-lg border transition-all disabled:opacity-50",
                      selectedItem?.id === item.id
                        ? "bg-secondary ring-2 ring-primary"
                        : "hover:bg-secondary/80"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md"
                        data-ai-hint={item.dataAiHint}
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.sku}</p>
                        <p className="text-sm text-muted-foreground">Cost: ₹{item.cost.toFixed(2)}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 sticky top-24">
          <Card className="min-h-[500px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><DollarSign className="text-accent" />Dynamic Pricing Engine</CardTitle>
              <CardDescription>
                {selectedItem ? `Pricing analysis for ${selectedItem.name}` : "The optimal, data-driven price will appear here."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(isLoading || recommendation) && (
                <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-lg mb-2">Analysis Input</h3>
                  {selectedItem && (
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <p><span className="font-medium text-muted-foreground">Product Cost:</span> ₹{selectedItem.cost.toFixed(2)}</p>
                      <p><span className="font-medium text-muted-foreground">Original Price:</span> ₹{selectedItem.originalPrice.toFixed(2)}</p>
                      <p className="col-span-2"><span className="font-medium text-muted-foreground">Competitor Prices:</span> {selectedItem.marketData.competitorPrices}</p>
                      <p className="col-span-2"><span className="font-medium text-muted-foreground">Market Trends:</span> {selectedItem.marketData.marketTrends}</p>
                    </div>
                  )}
                </div>
              )}
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">Analyzing market data...</p>
                </div>
              )}
              {recommendation && (
                <div className="space-y-6 animate-in fade-in-50 text-center">
                  <div>
                      <h3 className="font-semibold text-muted-foreground mb-2">Recommended Price Point</h3>
                      <p className="text-5xl font-bold text-primary">₹{recommendation.suggestedPrice.toFixed(2)}</p>
                  </div>
                  <div className="line-through text-muted-foreground text-lg">
                      Original: ₹{selectedItem?.originalPrice.toFixed(2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-muted-foreground mb-2">Strategic Reasoning</h3>
                    <p className="text-card-foreground/90">{recommendation.reasoning}</p>
                  </div>
                </div>
              )}
              {!isLoading && !recommendation && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Wand2 className="h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">Select a product to generate a price recommendation.</p>
                  </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
