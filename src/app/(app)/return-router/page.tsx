"use client";

import { useState, useRef } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { returnRouter, ReturnRouterOutput } from "@/ai/flows/return-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RotateCw, Wand2, UploadCloud, X, BadgeCheck, HandHeart, Hammer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  productDescription: z.string().min(10, "Please provide a detailed product description."),
  originalPrice: z.coerce.number().min(0, "Price must be a positive number."),
  returnReason: z.string().min(10, "Please provide a reason for the return."),
  localDemand: z.string().min(10, "Please describe local demand."),
  costEffectivenessFactors: z.string().min(10, "Please describe cost factors."),
  photoDataUri: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ReturnRouterPage() {
  const [disposition, setDisposition] = useState<ReturnRouterOutput | null>(null);
  const [isLoading, setIsLoading] =useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        productDescription: "A 55-inch 4K Smart TV, model XYZ. Minor cosmetic scratches on the bezel. Powers on and functions correctly.",
        originalPrice: 799.99,
        returnReason: "Customer purchased a larger model and returned this one within the return period.",
        localDemand: "High demand for used electronics in good condition in this area.",
        costEffectivenessFactors: "Low logistics cost to a nearby resale partner. Warehousing space is available.",
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        form.setValue('photoDataUri', result);
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setDisposition(null);
    try {
      const result = await returnRouter(data);
      setDisposition(result);
    } catch (error) {
      console.error("Error fetching return disposition:", error);
      toast({
        title: "Error",
        description: "Failed to determine disposition. Please try again.",
        variant: "destructive",
      });
    } finally {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><RotateCw className="text-accent"/>Return Router</CardTitle>
          <CardDescription>
            Determine optimal disposition of returned items using AI to maximize value and sustainability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="productDescription">Product Description</Label>
              <Textarea id="productDescription" {...form.register("productDescription")} placeholder="e.g., Condition, model, defects" />
              {form.formState.errors.productDescription && <p className="text-sm text-destructive">{form.formState.errors.productDescription.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input id="originalPrice" type="number" step="0.01" {...form.register("originalPrice")} placeholder="e.g., 49.99" />
              {form.formState.errors.originalPrice && <p className="text-sm text-destructive">{form.formState.errors.originalPrice.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnReason">Return Reason</Label>
              <Textarea id="returnReason" {...form.register("returnReason")} placeholder="e.g., Wrong size, unwanted gift" />
              {form.formState.errors.returnReason && <p className="text-sm text-destructive">{form.formState.errors.returnReason.message}</p>}
            </div>
             <div className="space-y-2">
              <Label htmlFor="localDemand">Local Demand</Label>
              <Textarea id="localDemand" {...form.register("localDemand")} placeholder="Describe local market conditions..." />
              {form.formState.errors.localDemand && <p className="text-sm text-destructive">{form.formState.errors.localDemand.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="costEffectivenessFactors">Cost-Effectiveness Factors</Label>
              <Textarea id="costEffectivenessFactors" {...form.register("costEffectivenessFactors")} placeholder="Describe logistics, warehousing costs..." />
              {form.formState.errors.costEffectivenessFactors && <p className="text-sm text-destructive">{form.formState.errors.costEffectivenessFactors.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Product Photo (Optional)</Label>
              <Input id="photo" type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="mr-2 h-4 w-4"/> Upload Image
              </Button>
              {preview && (
                  <div className="relative mt-2 w-48 h-48">
                    <Image src={preview} alt="Product preview" layout="fill" objectFit="cover" className="rounded-md border" />
                    <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => { setPreview(null); form.setValue("photoDataUri", undefined); if(fileInputRef.current) fileInputRef.current.value = ""; }}>
                      <X className="h-4 w-4"/>
                    </Button>
                  </div>
              )}
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Route Item
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="sticky top-24">
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle>AI Recommendation</CardTitle>
            <CardDescription>The AI-powered routing decision will appear here.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Routing item...</p>
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
                    <p className="mt-4 text-muted-foreground">Your routing result will be displayed here.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
