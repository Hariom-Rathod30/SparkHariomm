'use server';
/**
 * @fileOverview AI-powered return routing flow.
 *
 * Determines the optimal route for returned items (resale, donation, liquidation).
 * - returnRouter - A function that handles the return routing process.
 * - ReturnRouterInput - The input type for the returnRouter function.
 * - ReturnRouterOutput - The return type for the returnRouter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReturnRouterInputSchema = z.object({
  productDescription: z.string().describe('Detailed description of the returned product, including condition.'),
  originalPrice: z.number().describe('Original price of the product.'),
  returnReason: z.string().describe('Reason for the return provided by the customer.'),
  localDemand: z.string().describe('Information on local demand for the product.'),
  costEffectivenessFactors: z.string().describe('Information on cost effectiveness factors such as logistics cost and warehousing cost'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the returned product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ).optional(),
});
export type ReturnRouterInput = z.infer<typeof ReturnRouterInputSchema>;

const ReturnRouterOutputSchema = z.object({
  disposition: z.enum(['resale', 'donation', 'liquidation']).describe('Recommended disposition of the returned item.'),
  reasoning: z.string().describe('Explanation for the recommended disposition.'),
});
export type ReturnRouterOutput = z.infer<typeof ReturnRouterOutputSchema>;

export async function returnRouter(input: ReturnRouterInput): Promise<ReturnRouterOutput> {
  return returnRouterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'returnRouterPrompt',
  input: {schema: ReturnRouterInputSchema},
  output: {schema: ReturnRouterOutputSchema},
  prompt: `You are an expert in reverse logistics, tasked with determining the best course of action for returned items. Analyze the product description, return reason, local demand, and cost-effectiveness factors to decide whether the item should be resold, donated, or liquidated. Provide a clear explanation for your decision.

Product Description: {{{productDescription}}}
Original Price: {{{originalPrice}}}
Return Reason: {{{returnReason}}}
Local Demand: {{{localDemand}}}
Cost Effectiveness Factors: {{{costEffectivenessFactors}}}

{{#if photoDataUri}}
Product Photo: {{media url=photoDataUri}}
{{/if}}

Based on this information, recommend a disposition (resale, donation, or liquidation) and explain your reasoning. The reasoning should be concise and no more than 40 words.

Respond with a valid JSON object that conforms to the output schema.`,
});

const returnRouterFlow = ai.defineFlow(
  {
    name: 'returnRouterFlow',
    inputSchema: ReturnRouterInputSchema,
    outputSchema: ReturnRouterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
