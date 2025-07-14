
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { ReturnRouterOutput } from "@/ai/flows/return-router";
import { inventoryData, InventoryItem } from "@/lib/inventory-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RotateCw, Wand2, BadgeCheck, HandHeart, Hammer, ArrowRight, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Disposition extends ReturnRouterOutput {
  reroute?: {
    from: string;
    to: string;
    reason: string;
  }
}

export default function ReturnRouterPage() {
  const [disposition, setDisposition] = useState<Disposition | null>(null);
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
    
    // Simulate AI call with a timeout
    setTimeout(() => {
        const dummyDisposition: Disposition = {
            disposition: 'resale',
            reasoning: 'Item is in like-new condition and local demand is high. Recommend for immediate resale at 90% of original price.',
            reroute: {
                from: "Delhi Returns Center",
                to: "Store #2021 (Mumbai)",
                reason: "High demand signal for 'Premium Cricket Bats' detected in Juhu area."
            }
        };

        if (item.returnInfo?.condition === 'Used - Good') {
            dummyDisposition.disposition = 'resale';
            dummyDisposition.reasoning = 'Minor cosmetic wear but fully functional. High local demand justifies resale at a discounted price.';
            dummyDisposition.reroute = {
                from: "Delhi Returns Center",
                to: "Store #1080 (Bangalore)",
                reason: `High demand for TVs in Bangalore; ready for immediate resale.`
            }
        } else if (item.returnInfo?.condition === 'Damaged') {
            dummyDisposition.disposition = 'liquidation';
            dummyDisposition.reasoning = 'Significant damage reported. Liquidation is the most cost-effective path to recover value.';
            delete dummyDisposition.reroute;
        }
        setDisposition(dummyDisposition);
        setIsLoading(false);
    }, 1200);
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Optimized Reverse Logistics</h1>
        <p className="text-muted-foreground mt-1">
         Transform returns into revenue with intelligent disposition, maximizing value from every item across the Indian market.
        </p>
      </div>
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

        <div className="lg:col-span-2 sticky top-24 space-y-8">
          <Card className="min-h-[300px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><RotateCw className="text-accent"/>Intelligent Return Router</CardTitle>
              <CardDescription>
                {selectedItem ? `Routing analysis for ${selectedItem.name}`: "The optimal routing decision will appear here."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center pt-6">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-48 space-y-4">
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
                  <p className="text-muted-foreground max-w-sm mx-auto">{disposition.reasoning}</p>
                </div>
              )}
              {!isLoading && !disposition && (
                  <div className="flex flex-col items-center justify-center h-48 text-center">
                      <DispositionIcon type={undefined} />
                      <p className="mt-4 text-muted-foreground">Select a returned item to determine its optimal route.</p>
                  </div>
              )}
            </CardContent>
          </Card>

          {disposition?.reroute && (
            <Card className="animate-in fade-in-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Truck className="text-accent" />Automated Relocation Order</CardTitle>
                    <CardDescription>This item is being rerouted to meet demand at another location.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">From</p>
                            <p className="font-semibold">{disposition.reroute.from}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-xs text-muted-foreground">To</p>
                            <p className="font-semibold text-primary">{disposition.reroute.to}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Reason</h4>
                        <p className="text-sm text-muted-foreground">{disposition.reroute.reason}</p>
                    </div>
                    <Button className="w-full">Notify Transport Team</Button>
                </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
