'use server';

/**
 * @fileOverview Predicts neighborhood-level demand using machine learning to optimize micro-inventory and reduce stockouts.
 *
 * - demandForecast - A function that handles the demand forecast process.
 * - DemandForecastInput - The input type for the demandForecast function.
 * - DemandForecastOutput - The return type for the demandForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DemandForecastInputSchema = z.object({
  zipCode: z.string().describe('The zip code for the neighborhood.'),
  historicalSalesData: z.string().describe('Historical sales data for the neighborhood.'),
  socialMediaTrends: z.string().describe('Social media trends for the neighborhood.'),
  localEventData: z.string().describe('Local event data for the neighborhood.'),
});
export type DemandForecastInput = z.infer<typeof DemandForecastInputSchema>;

const DemandForecastOutputSchema = z.object({
  predictedDemand: z.string().describe('The predicted demand for the neighborhood.'),
  confidenceLevel: z.number().describe('The confidence level of the prediction (0-1).'),
  factorsInfluencingDemand: z.string().describe('The factors influencing the demand.'),
});
export type DemandForecastOutput = z.infer<typeof DemandForecastOutputSchema>;

export async function demandForecast(input: DemandForecastInput): Promise<DemandForecastOutput> {
  return demandForecastFlow(input);
}

const prompt = ai.definePrompt({
  name: 'demandForecastPrompt',
  input: {schema: DemandForecastInputSchema},
  output: {schema: DemandForecastOutputSchema},
  prompt: `You are an expert in demand forecasting, specializing in predicting demand at the neighborhood level.

  Based on the historical sales data, social media trends, and local event data provided, predict the demand for the given zip code.

  Zip Code: {{{zipCode}}}
  Historical Sales Data: {{{historicalSalesData}}}
  Social Media Trends: {{{socialMediaTrends}}}
  Local Event Data: {{{localEventData}}}

  Provide the predicted demand, a confidence level (0-1), and the factors influencing the demand.
  predictedDemand should be a string, be concise, and be no more than 20 words.
  factorsInfluencingDemand should be a string, be concise, and be no more than 30 words.
  `,
});

const demandForecastFlow = ai.defineFlow(
  {
    name: 'demandForecastFlow',
    inputSchema: DemandForecastInputSchema,
    outputSchema: DemandForecastOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
