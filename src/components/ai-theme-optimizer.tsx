"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { optimizeTheme, type OptimizeThemeInput, type OptimizeThemeOutput } from '@/ai/flows/optimize-theme';
import { useToast } from '@/hooks/use-toast';
import type { AppThemeConfig } from '@/lib/config';

const OptimizeThemeFormSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  accentColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color"),
  bodyFont: z.string().min(2, "Body font is required"),
  headlineFont: z.string().min(2, "Headline font is required"),
  contentDescription: z.string().min(10, "Content description is required"),
});

interface AiThemeOptimizerProps {
  initialThemeConfig: AppThemeConfig;
}

const AiThemeOptimizer: React.FC<AiThemeOptimizerProps> = ({ initialThemeConfig }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState<OptimizeThemeOutput | null>(null);

  const form = useForm<OptimizeThemeInput>({
    resolver: zodResolver(OptimizeThemeFormSchema),
    defaultValues: initialThemeConfig,
  });

  const onSubmit: SubmitHandler<OptimizeThemeInput> = async (data) => {
    setIsLoading(true);
    setOptimizationResult(null);
    try {
      const result = await optimizeTheme(data);
      setOptimizationResult(result);
      toast({
        title: "Theme Optimized!",
        description: "AI has provided optimization suggestions.",
      });
    } catch (error) {
      console.error("Theme optimization failed:", error);
      toast({
        title: "Optimization Failed",
        description: "Could not get theme optimization suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="font-headline">AI Theme Optimizer</CardTitle>
        <CardDescription className="font-body">
          Let AI help you optimize your app's theme for aesthetics and accessibility.
          The current theme uses {initialThemeConfig.bodyFont} for body text and {initialThemeConfig.headlineFont} for headlines.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} className="h-12 p-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} className="h-12 p-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} className="h-12 p-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
             <FormField
                control={form.control}
                name="bodyFont"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Font</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="headlineFont"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline Font</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="contentDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the content and purpose of your app..."
                      className="resize-none font-body"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="font-body">
              {isLoading ? 'Optimizing...' : 'Optimize Theme'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      {optimizationResult && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-lg font-headline mb-2">Optimization Suggestions:</h3>
          <ul className="list-disc list-inside space-y-1 font-body">
            <li>Optimized Body Font Size: <span className="font-semibold">{optimizationResult.optimizedBodyFontSize}</span></li>
            <li>Optimized Headline Font Size: <span className="font-semibold">{optimizationResult.optimizedHeadlineFontSize}</span></li>
            <li>Contrast Ratio: <span className="font-semibold">{optimizationResult.contrastRatio}</span></li>
            <li>Accessibility Score: <span className="font-semibold">{optimizationResult.accessibilityScore}</span></li>
          </ul>
        </CardContent>
      )}
    </Card>
  );
};

export default AiThemeOptimizer;
