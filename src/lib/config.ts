
import type { LucideIcon } from 'lucide-react';
import fs from 'fs/promises';
import path from 'path';
import type { OptimizeThemeInput } from '@/ai/flows/optimize-theme';

export interface WebViewItemConfig {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  thumbnailUrl?: string;
  dataAiHint?: string;
  contentUrl?: string;
  htmlContent?: string;
  rewardedAdRequired: boolean;
  showDescriptiveText: boolean;
  descriptiveText?: string;
}

export interface AppThemeConfig extends OptimizeThemeInput {}

export interface AppConfig {
  appName: string;
  appLogoUrl: string; // Can be a Lucide icon name or a URL
  launchMessage?: string;
  contactWhatsApp: string;
  groupWhatsApp: string;
  facebookProfile: string;
  theme: AppThemeConfig;
  webViews: WebViewItemConfig[];
  dailyMessages?: string[]; // Added for daily/random messages
}

// Ensure this runs on the server by not exporting it for client-side use directly if it uses 'fs'
export async function getConfig(): Promise<AppConfig> {
  const filePath = path.join(process.cwd(), 'public', 'config.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const config = JSON.parse(fileContents) as AppConfig;
    return config;
  } catch (error) {
    console.error("Failed to load or parse config.json:", error);
    // Fallback to a default minimal config to prevent full app crash
    return {
      appName: "ZobiView (Error)",
      appLogoUrl: "AlertTriangle",
      contactWhatsApp: "#",
      groupWhatsApp: "#",
      facebookProfile: "#",
      theme: {
        primaryColor: "#000000",
        backgroundColor: "#ffffff",
        accentColor: "#ff0000",
        bodyFont: "Josefin Sans",
        headlineFont: "Space Grotesk",
        contentDescription: "Error loading app configuration.",
      },
      webViews: [],
      launchMessage: "Error: Could not load application configuration. Please check config.json.",
      dailyMessages: ["Welcome back! Hope you have a productive day."]
    };
  }
}
