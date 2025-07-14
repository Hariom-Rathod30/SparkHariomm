"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { demandForecast, DemandForecastOutput } from "@/ai/flows/demand-forecaster";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BrainCircuit, Loader2, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  zipCode: z.string().min(5, "Zip code must be 5 digits.").max(5),
  historicalSalesData: z.string().min(10, "Please provide some historical sales data."),
  socialMediaTrends: z.string().min(10, "Please describe relevant social media trends."),
  localEventData: z.string().min(10, "Please describe any local events."),
});

type FormValues = z.infer<typeof formSchema>;

export default function DemandForecasterPage() {
  const [prediction, setPrediction] = useState<DemandForecastOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      zipCode: "90210",
      historicalSalesData: "Weekly sales of item X have averaged 50 units over the last 3 months.",
      socialMediaTrends: "Local influencers are promoting sustainable and organic products.",
      localEventData: "A large music festival is scheduled for next month.",
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setPrediction(null);
    try {
      const result = await demandForecast(data);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BrainCircuit className="text-accent" />Demand Forecaster</CardTitle>
          <CardDescription>
            Predict neighborhood-level demand to optimize micro-inventory and reduce stockouts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input id="zipCode" {...register("zipCode")} placeholder="e.g., 90210" />
              {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="historicalSalesData">Historical Sales Data</Label>
              <Textarea id="historicalSalesData" {...register("historicalSalesData")} placeholder="Describe historical sales patterns..." />
              {errors.historicalSalesData && <p className="text-sm text-destructive">{errors.historicalSalesData.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialMediaTrends">Social Media Trends</Label>
              <Textarea id="socialMediaTrends" {...register("socialMediaTrends")} placeholder="Describe relevant social media trends..." />
              {errors.socialMediaTrends && <p className="text-sm text-destructive">{errors.socialMediaTrends.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="localEventData">Local Event Data</Label>
              <Textarea id="localEventData" {...register("localEventData")} placeholder="Describe upcoming local events..." />
              {errors.localEventData && <p className="text-sm text-destructive">{errors.localEventData.message}</p>}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Forecast Demand
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="sticky top-24">
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle>AI Prediction</CardTitle>
            <CardDescription>The AI-powered forecast will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Forecasting demand...</p>
              </div>
            )}
            {prediction && (
              <div className="space-y-6 animate-in fade-in-50">
                <div>
                  <h3 className="font-semibold mb-2">Predicted Demand</h3>
                  <p className="text-2xl font-bold text-primary">{prediction.predictedDemand}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Confidence Level</h3>
                  <div className="flex items-center gap-4">
                    <Progress value={prediction.confidenceLevel * 100} className="w-full" />
                    <span className="font-bold text-lg text-primary">
                      {Math.round(prediction.confidenceLevel * 100)}%
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Influencing Factors</h3>
                  <p className="text-muted-foreground">{prediction.factorsInfluencingDemand}</p>
                </div>
              </div>
            )}
            {!isLoading && !prediction && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Wand2 className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">Your forecast results will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
