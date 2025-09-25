'use server';

/**
 * @fileOverview A property description generator AI agent.
 *
 * - generatePropertyDescription - A function that handles the property description generation process.
 * - GeneratePropertyDescriptionInput - The input type for the generatePropertyDescription function.
 * - GeneratePropertyDescriptionOutput - The return type for the generatePropertyDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePropertyDescriptionInputSchema = z.object({
  propertyFeatures: z
    .string()
    .describe('A detailed list of features of the property.'),
  propertyLocation: z
    .string()
    .describe('The location of the property, including address and neighborhood.'),
  proximityToParks: z.string().optional().describe('Proximity to nearby parks.'),
  neighborhoodQuality: z.string().optional().describe('Quality of the neighborhood.'),
});
export type GeneratePropertyDescriptionInput = z.infer<typeof GeneratePropertyDescriptionInputSchema>;

const GeneratePropertyDescriptionOutputSchema = z.object({
  propertyDescription: z.string().describe('A compelling description of the property.'),
});
export type GeneratePropertyDescriptionOutput = z.infer<typeof GeneratePropertyDescriptionOutputSchema>;

export async function generatePropertyDescription(
  input: GeneratePropertyDescriptionInput
): Promise<GeneratePropertyDescriptionOutput> {
  return generatePropertyDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePropertyDescriptionPrompt',
  input: {schema: GeneratePropertyDescriptionInputSchema},
  output: {schema: GeneratePropertyDescriptionOutputSchema},
  prompt: `You are an expert real estate copywriter. Generate a compelling property description based on the following information:

Property Features: {{{propertyFeatures}}}
Property Location: {{{propertyLocation}}}

{{#if proximityToParks}}
Proximity to Parks: {{{proximityToParks}}}
{{/if}}

{{#if neighborhoodQuality}}
Neighborhood Quality: {{{neighborhoodQuality}}}
{{/if}}

Write a description that highlights the best aspects of the property and its location. The description should be engaging and persuasive, encouraging potential buyers or renters to inquire further.
`,
});

const generatePropertyDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePropertyDescriptionFlow',
    inputSchema: GeneratePropertyDescriptionInputSchema,
    outputSchema: GeneratePropertyDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
