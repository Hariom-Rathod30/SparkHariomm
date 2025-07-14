"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { demandForecast, DemandForecastOutput, DemandForecastInput } from "@/ai/flows/demand-forecaster";
import { inventoryData, InventoryItem } from "@/lib/inventory-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Loader2, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function DemandForecasterPage() {
  const [prediction, setPrediction] = useState<DemandForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const inventoryForForecasting = useMemo(() => {
    return inventoryData.filter(item => item.location.type === 'store' || item.stock > 50);
  }, []);

  const handleItemSelect = async (item: InventoryItem) => {
    setSelectedItem(item);
    setPrediction(null);
    setIsLoading(true);
    try {
      const input: DemandForecastInput = {
        productName: item.name,
        zipCode: item.location.zipCode,
        historicalSalesData: item.marketData.historicalSalesData,
        socialMediaTrends: item.marketData.socialMediaTrends,
        localEventData: item.marketData.localEventData,
      }
      const result = await demandForecast(input);
      setPrediction(result);
    } catch (error) {
      console.error("Error fetching demand forecast:", error);
      toast({
        title: "Error",
        description: "Failed to fetch demand forecast. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Predictive Demand Intelligence</h1>
        <p className="text-muted-foreground mt-1">
          Anticipate market shifts with hyper-local demand forecasting for the Indian market. Ensure the right product is always at the right place, at the right time.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select a Product to Forecast</CardTitle>
            <CardDescription>
              Choose a product from the live inventory feed to analyze.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                {inventoryForForecasting.map((item) => (
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
                        <p className="text-sm text-muted-foreground">Location: {item.location.name}</p>
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
              <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-accent" />Forecasting Engine</CardTitle>
              <CardDescription>
                {selectedItem ? `Forecast for ${selectedItem.name} in Pincode ${selectedItem.location.zipCode}` : "Real-time predictive insights for India will appear here."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(isLoading || prediction) && (
              <div className="bg-secondary/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-lg mb-2">Analysis Input</h3>
                {selectedItem && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p><span className="font-medium text-muted-foreground">Product:</span> {selectedItem.name}</p>
                    <p><span className="font-medium text-muted-foreground">Pincode:</span> {selectedItem.location.zipCode}</p>
                    <p className="col-span-2"><span className="font-medium text-muted-foreground">Market Signals:</span> {selectedItem.marketData.socialMediaTrends}</p>
                    <p className="col-span-2"><span className="font-medium text-muted-foreground">Local Events:</span> {selectedItem.marketData.localEventData}</p>
                  </div>
                )}
              </div>
              )}
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-muted-foreground">Forecasting demand in India...</p>
                </div>
              )}
              {prediction && (
                <div className="space-y-6 animate-in fade-in-50">
                  <div>
                    <h3 className="font-semibold mb-2 text-muted-foreground">Predicted Demand</h3>
                    <p className="text-2xl font-bold text-primary">{prediction.predictedDemand}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-muted-foreground">Confidence Score</h3>
                    <div className="flex items-center gap-4">
                      <Progress value={prediction.confidenceLevel * 100} className="w-full" />
                      <span className="font-bold text-lg text-primary">
                        {Math.round(prediction.confidenceLevel * 100)}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-muted-foreground">Key Demand Drivers</h3>
                    <p className="text-card-foreground/90">{prediction.factorsInfluencingDemand}</p>
                  </div>
                </div>
              )}
              {!isLoading && !prediction && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Wand2 className="h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">Select an item to generate a forecast.</p>
                  </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
