'use server';

/**
 * @fileOverview AI-powered theme optimization flow.
 *
 * - optimizeTheme - A function that optimizes the app theme based on the given configuration.
 * - OptimizeThemeInput - The input type for the optimizeTheme function.
 * - OptimizeThemeOutput - The return type for the optimizeTheme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeThemeInputSchema = z.object({
  primaryColor: z
    .string()
    .describe('The primary color of the theme in hex format (e.g., #29ABE2).'),
  backgroundColor: z
    .string()
    .describe('The background color of the theme in hex format (e.g., #F0F0F0).'),
  accentColor: z
    .string()
    .describe('The accent color of the theme in hex format (e.g., #8E2DE2).'),
  bodyFont: z.string().describe('The font family for body text (e.g., PT Sans).'),
  headlineFont: z
    .string()
    .describe('The font family for headline text (e.g., Space Grotesk).'),
  contentDescription: z
    .string()
    .describe('A description of the content that will be displayed in the app.'),
});
export type OptimizeThemeInput = z.infer<typeof OptimizeThemeInputSchema>;

const OptimizeThemeOutputSchema = z.object({
  optimizedBodyFontSize: z
    .string()
    .describe('The optimized font size for body text (e.g., 16px).'),
  optimizedHeadlineFontSize: z
    .string()
    .describe('The optimized font size for headline text (e.g., 24px).'),
  contrastRatio: z
    .string()
    .describe('The contrast ratio between text and background colors (e.g., 4.5:1).'),
  accessibilityScore: z
    .string()
    .describe('An accessibility score indicating how accessible the theme is (e.g., AA).'),
});
export type OptimizeThemeOutput = z.infer<typeof OptimizeThemeOutputSchema>;

export async function optimizeTheme(input: OptimizeThemeInput): Promise<OptimizeThemeOutput> {
  return optimizeThemeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeThemePrompt',
  input: {schema: OptimizeThemeInputSchema},
  output: {schema: OptimizeThemeOutputSchema},
  prompt: `You are an AI design expert tasked with optimizing the theme of a mobile app.

Given the following theme configuration and content description, suggest optimal font sizes, and provide a contrast ratio and accessibility score.

Theme Configuration:
- Primary Color: {{{primaryColor}}}
- Background Color: {{{backgroundColor}}}
- Accent Color: {{{accentColor}}}
- Body Font: {{{bodyFont}}}
- Headline Font: {{{headlineFont}}}

Content Description: {{{contentDescription}}}

Consider accessibility guidelines and visual appeal when making your suggestions. Return values for font sizes should be in pixels (e.g. 16px). 

Ensure that the contrast ratio is at least 4.5:1 for normal text, and the accessibility score meets at least AA standards.
`,
});

const optimizeThemeFlow = ai.defineFlow(
  {
    name: 'optimizeThemeFlow',
    inputSchema: OptimizeThemeInputSchema,
    outputSchema: OptimizeThemeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
