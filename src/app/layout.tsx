import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import TopBar from '@/components/layout/top-bar';
import { getConfig } from '@/lib/config';
import UpdateNotifier from '@/components/update-notifier';
import DailyMessageNotifier from '@/components/daily-message-notifier';

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  const baseUrl = 'https://zobitech.vercel.app'; // Replace with your actual domain

  return {
    title: {
      default: 'Zobi Tech APK - Download Official App for SIM Tracking & Bill Check',
      template: `%s | ${config.appName}`
    },
    description: 'Download Zobi Tech APK (Latest Version). The #1 trusted app in Pakistan for SIM tracker, CNIC information, electricity bill checks, and live tracker services. Secure, fast, and 100% free.',
    keywords: [
      'zobi tech', 'zobi tech apk', 'zobitech', 'zobi tech app', 'pak sim data', 
      'sim tracker pakistan', 'cnic information app', 'bill check online pakistan', 
      'live tracker pakistan', 'sim ownership check', 'trace mobile number pakistan'
    ],
    authors: [{ name: 'Zobi Tech Team' }],
    creator: 'Zobi Tech',
    publisher: 'Zobi Tech Pakistan',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'Zobi Tech APK - Official Download Page',
      description: 'Get the latest Zobi Tech App for SIM tracking and digital services in Pakistan.',
      url: baseUrl,
      siteName: config.appName,
      images: [
        {
          url: '/icon.webp',
          width: 512,
          height: 512,
          alt: 'Zobi Tech Logo',
        },
      ],
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zobi Tech APK Download',
      description: 'The ultimate digital companion for Pakistan. SIM tracking, Bill checks, and more.',
      images: ['/icon.webp'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon.webp',
      apple: '/icon.webp',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#29ABE2',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();
  
  // Structured Data for AEO/GEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": config.appName,
    "operatingSystem": "Android",
    "applicationCategory": "UtilitiesApplication",
    "downloadUrl": "https://raw.githubusercontent.com/zobitvv/Download/main/src/app/ZobiTech.apk",
    "featureList": [
      "SIM Tracker Pakistan",
      "CNIC Information Check",
      "Electricity Bill Check",
      "Live Tracker",
      "Number Trace"
    ],
    "author": {
      "@type": "Organization",
      "name": "Zobi Tech"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "PKR"
    },
    "description": "Zobi Tech is an all-in-one digital utility app for Pakistan providing SIM tracking, CNIC info, and bill checking services."
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <TopBar
          appName={config.appName}
          appLogoUrl={config.appLogoUrl}
          contactWhatsApp={config.contactWhatsApp}
          groupWhatsApp={config.groupWhatsApp}
          facebookProfile={config.facebookProfile}
        />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <UpdateNotifier />
        <DailyMessageNotifier />
        <Toaster />
      </body>
    </html>
  );
}
