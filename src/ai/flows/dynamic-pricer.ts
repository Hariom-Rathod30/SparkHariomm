'use server';
/**
 * @fileOverview AI-powered dynamic pricing engine.
 *
 * Analyzes market data to recommend optimal product pricing.
 * - dynamicPricer - A function that handles the dynamic pricing process.
 * - DynamicPricerInput - The input type for the dynamicPricer function.
 * - DynamicPricerOutput - The return type for the dynamicPricer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DynamicPricerInputSchema = z.object({
  productDescription: z.string().describe('Detailed description of the product.'),
  cost: z.number().describe('Cost of the product in INR.'),
  competitorPrices: z.string().describe('A summary of competitor prices for similar products in the Indian market.'),
  marketTrends: z.string().describe('Current market trends relevant to the product category in India.'),
  originalPrice: z.number().describe('The original selling price of the product in INR.'),
});
export type DynamicPricerInput = z.infer<typeof DynamicPricerInputSchema>;

const DynamicPricerOutputSchema = z.object({
  suggestedPrice: z.number().describe('The recommended selling price for the product in INR.'),
  reasoning: z.string().describe('Explanation for the recommended price, citing market data and potential ROI.'),
});
export type DynamicPricerOutput = z.infer<typeof DynamicPricerOutputSchema>;

export async function dynamicPricer(input: DynamicPricerInput): Promise<DynamicPricerOutput> {
  return dynamicPricerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dynamicPricerPrompt',
  input: {schema: DynamicPricerInputSchema},
  output: {schema: DynamicPricerOutputSchema},
  prompt: `You are an expert pricing analyst for a large retail company in India. Your task is to recommend the optimal price for a product based on the provided data.

Analyze the following information to determine a suggested price that balances competitiveness and profitability in the Indian market.

Product Description: {{{productDescription}}}
Original Price: ₹{{{originalPrice}}}
Product Cost: ₹{{{cost}}}
Competitor Prices: {{{competitorPrices}}}
Market Trends: {{{marketTrends}}}

Based on this data, provide a suggested price (in INR) and a brief reasoning for your recommendation. The reasoning should be concise and no more than 40 words.

Respond with a valid JSON object that conforms to the output schema.`,
});

const dynamicPricerFlow = ai.defineFlow(
  {
    name: 'dynamicPricerFlow',
    inputSchema: DynamicPricerInputSchema,
    outputSchema: DynamicPricerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
