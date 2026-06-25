
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import TopBar from '@/components/layout/top-bar';
import { getConfig } from '@/lib/config';
import UpdateNotifier from '@/components/update-notifier';
import DailyMessageNotifier from '@/components/daily-message-notifier';


export const metadata: Metadata = {
  title: 'Zobi Tech - All-in-One Digital Companion for Pakistan | SIM Tracking & Bill Check',
  description: 'Download Zobi Tech APK for the most trusted digital services in Pakistan. Fast SIM tracking, CNIC information, electricity bill checks, and more. Secure, lightweight, and 100% free.',
  keywords: 'zobi tech, zobi tech apk, sim tracker pakistan, cnic information app, bill check online pakistan, pakistan digital app, free mobile services pakistan, sim ownership pakistan',
  authors: [{ name: 'Zobi Tech' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
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
