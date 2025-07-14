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
  cost: z.number().describe('Cost of the product.'),
  competitorPrices: z.string().describe('A summary of competitor prices for similar products.'),
  marketTrends: z.string().describe('Current market trends relevant to the product category.'),
  originalPrice: z.number().describe('The original selling price of the product.'),
});
export type DynamicPricerInput = z.infer<typeof DynamicPricerInputSchema>;

const DynamicPricerOutputSchema = z.object({
  suggestedPrice: z.number().describe('The recommended selling price for the product.'),
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
  prompt: `You are an expert pricing analyst for a large retail company. Your task is to recommend the optimal price for a product based on the provided data.

Analyze the following information to determine a suggested price that balances competitiveness and profitability.

Product Description: {{{productDescription}}}
Original Price: \${{{originalPrice}}}
Product Cost: \${{{cost}}}
Competitor Prices: {{{competitorPrices}}}
Market Trends: {{{marketTrends}}}

Based on this data, provide a suggested price and a brief reasoning for your recommendation. The reasoning should be concise and no more than 40 words.`,
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
