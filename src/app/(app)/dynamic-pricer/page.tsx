"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { dynamicPricer, DynamicPricerOutput } from "@/ai/flows/dynamic-pricer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  productDescription: z.string().min(10, "Please provide a detailed product description."),
  cost: z.coerce.number().min(0, "Cost must be a positive number."),
  competitorPrices: z.string().min(10, "Please describe competitor pricing."),
  marketTrends: z.string().min(10, "Please describe relevant market trends."),
});

type FormValues = z.infer<typeof formSchema>;

export default function DynamicPricerPage() {
  const [recommendation, setRecommendation] = useState<DynamicPricerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDescription: "Premium wireless noise-cancelling headphones with Bluetooth 5.0 and 30-hour battery life.",
      cost: 150.00,
      competitorPrices: "Similar models from Sony and Bose are priced between $299 and $349.",
      marketTrends: "Increased demand for high-fidelity audio equipment and work-from-home accessories.",
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await dynamicPricer(data);
      setRecommendation(result);
    } catch (error) {
      console.error("Error fetching price recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to fetch price recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DollarSign className="text-accent" />Dynamic Pricing Engine</CardTitle>
          <CardDescription>
            Leverage AI to analyze market data and recommend optimal product prices to maximize revenue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productDescription">Product Description</Label>
              <Textarea id="productDescription" {...register("productDescription")} placeholder="e.g., Model, features, condition..." />
              {errors.productDescription && <p className="text-sm text-destructive">{errors.productDescription.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Product Cost ($)</Label>
              <Input id="cost" type="number" step="0.01" {...register("cost")} placeholder="e.g., 150.00" />
              {errors.cost && <p className="text-sm text-destructive">{errors.cost.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitorPrices">Competitor Prices</Label>
              <Textarea id="competitorPrices" {...register("competitorPrices")} placeholder="e.g., Sony at $299, Bose at $349" />
              {errors.competitorPrices && <p className="text-sm text-destructive">{errors.competitorPrices.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="marketTrends">Market Trends</Label>
              <Textarea id="marketTrends" {...register("marketTrends")} placeholder="e.g., Rising demand for WFH tech" />
              {errors.marketTrends && <p className="text-sm text-destructive">{errors.marketTrends.message}</p>}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Recommend Price
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="sticky top-24">
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle>AI Recommendation</CardTitle>
            <CardDescription>The AI-powered price suggestion will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Analyzing market data...</p>
              </div>
            )}
            {recommendation && (
              <div className="space-y-6 animate-in fade-in-50 text-center">
                <div>
                    <h3 className="font-semibold text-muted-foreground mb-2">Suggested Price</h3>
                    <p className="text-5xl font-bold text-primary">${recommendation.suggestedPrice.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-muted-foreground mb-2">Reasoning</h3>
                  <p className="text-card-foreground/90">{recommendation.reasoning}</p>
                </div>
              </div>
            )}
            {!isLoading && !recommendation && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Wand2 className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Your price recommendation will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
