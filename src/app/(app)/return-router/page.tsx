"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { returnRouter, ReturnRouterOutput, ReturnRouterInput } from "@/ai/flows/return-router";
import { inventoryData, InventoryItem } from "@/lib/inventory-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RotateCw, Wand2, BadgeCheck, HandHeart, Hammer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function ReturnRouterPage() {
  const [disposition, setDisposition] = useState<ReturnRouterOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const { toast } = useToast();

  const returnedItems = useMemo(() => {
    return inventoryData.filter(item => item.returnInfo);
  }, []);

  const handleItemSelect = async (item: InventoryItem) => {
    setSelectedItem(item);
    setDisposition(null);
    setIsLoading(true);
    try {
      const reader = new FileReader();
      const imageBlob = await fetch(item.imageUrl).then(res => res.blob());
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        const photoDataUri = reader.result as string;
        const input: ReturnRouterInput = {
          productDescription: `${item.description}. Condition: ${item.returnInfo?.condition}.`,
          originalPrice: item.originalPrice,
          returnReason: item.returnInfo?.returnReason || 'No reason provided',
          localDemand: item.marketData.localDemand,
          costEffectivenessFactors: item.marketData.costEffectivenessFactors,
          photoDataUri: photoDataUri,
        };
        const result = await returnRouter(input);
        setDisposition(result);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching return disposition:", error);
      toast({
        title: "Error",
        description: "Failed to determine disposition. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const DispositionIcon = ({ type }: { type: string | undefined }) => {
    switch (type) {
      case 'resale': return <BadgeCheck className="h-10 w-10 text-green-500" />;
      case 'donation': return <HandHeart className="h-10 w-10 text-blue-500" />;
      case 'liquidation': return <Hammer className="h-10 w-10 text-red-500" />;
      default: return <Wand2 className="h-12 w-12 text-muted-foreground/50" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Select a Returned Item</CardTitle>
          <CardDescription>
            Choose an item from the returns queue to process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {returnedItems.map((item) => (
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
                      <p className="text-sm text-muted-foreground">Condition: {item.returnInfo?.condition}</p>
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
            <CardTitle className="flex items-center gap-2"><RotateCw className="text-accent"/>Intelligent Return Router</CardTitle>
            <CardDescription>
              {selectedItem ? `Routing analysis for ${selectedItem.name}`: "The optimal routing decision will appear here."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing disposition paths...</p>
              </div>
            )}
            {disposition && (
              <div className="text-center space-y-4 animate-in fade-in-50">
                 <DispositionIcon type={disposition.disposition} />
                <Badge variant="outline" className="text-lg capitalize py-1 px-4 border-2">
                  {disposition.disposition}
                </Badge>
                <p className="text-muted-foreground">{disposition.reasoning}</p>
              </div>
            )}
            {!isLoading && !disposition && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <DispositionIcon type={undefined} />
                    <p className="mt-4 text-muted-foreground">Select a returned item to determine its optimal route.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
