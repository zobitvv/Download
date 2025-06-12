
"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { getConfig, type WebViewItemConfig, type AppConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';
import DynamicIcon from '@/components/dynamic-icon';

// Helper function to fetch config on client side
async function getClientConfig(): Promise<AppConfig> {
  const res = await fetch('/config.json');
  if (!res.ok) {
    throw new Error('Failed to fetch config');
  }
  return res.json();
}


export default function WebViewPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [item, setItem] = useState<WebViewItemConfig | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [adWatched, setAdWatched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getClientConfig().then(config => {
        const foundItem = config.webViews.find(wv => wv.id === id);
        if (foundItem) {
          setItem(foundItem);
        } else {
          setConfigError(`Content with ID "${id}" not found.`);
        }
      }).catch(err => {
        console.error("Error fetching/finding config item:", err);
        setConfigError("Could not load content configuration.");
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-grow items-center justify-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-body text-muted-foreground">Loading content...</p>
      </div>
    );
  }

  if (configError) {
    return (
       <div className="flex flex-col flex-grow items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-xl w-full">
          <DynamicIcon name="AlertTriangle" className="h-4 w-4" />
          <AlertTitle className="font-headline">Error</AlertTitle>
          <AlertDescription className="font-body">{configError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!item) {
     return (
       <div className="flex flex-col flex-grow items-center justify-center p-4">
         <Alert variant="destructive" className="max-w-xl w-full">
           <DynamicIcon name="AlertTriangle" className="h-4 w-4" />
          <AlertTitle className="font-headline">Error</AlertTitle>
          <AlertDescription className="font-body">Content not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleWatchAd = () => {
    // Simulate watching an ad
    // In a real app, you'd integrate with AdMob SDK here.
    // Example: Initialize and show a rewarded ad using a test ID.
    // Google's official Rewarded Ad test ID (Android): ca-app-pub-3940256099942544/5224354917
    // Google's official Rewarded Ad test ID (iOS): ca-app-pub-3940256099942544/1712485313
    // For web, you'd use the Google Mobile Ads SDK for HTML5 or a similar web-based ad solution.
    setAdWatched(true);
  };

  const renderContent = () => {
    if (item.contentUrl) {
      return (
        <iframe
          src={item.contentUrl}
          title={item.title} 
          className="w-full h-full border-0"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-fullscreen"
        />
      );
    }
    if (item.htmlContent) {
      return (
        <div
          className="prose dark:prose-invert max-w-none p-4 bg-card font-body h-full overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: item.htmlContent }}
        />
      );
    }
    return <div className="flex-grow flex items-center justify-center p-4"><p className="font-body text-center">No content available for this item.</p></div>;
  };

  return (
    <div className="flex flex-col flex-grow">
      {item.rewardedAdRequired && !adWatched ? (
        <Card className="text-center mb-4 shrink-0 rounded-none border-x-0">
          <CardHeader>
            <CardTitle className="font-headline">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-body">This content requires you to watch a short ad to proceed.</p>
            <Alert className="text-left bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
              <DynamicIcon name="Info" className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Rewarded Ad Placeholder</AlertTitle>
              <AlertDescription className="font-body">
                In a real app, an AdMob rewarded ad would be requested and displayed here using a real Ad Unit ID. 
                Google's test ID (Android): <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded my-1">ca-app-pub-3940256099942544/5224354917</code>.
                Google's test ID (iOS): <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded my-1">ca-app-pub-3940256099942544/1712485313</code>.
                (These are test IDs and will not generate revenue).
              </AlertDescription>
            </Alert>
            <Button onClick={handleWatchAd} size="lg" className="font-body">
              <DynamicIcon name="PlayCircle" className="mr-2 h-5 w-5" />
              Watch Ad to Continue (Simulated)
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="flex-grow w-full relative">
          {renderContent()}
        </div>
      )}

      <div className="p-4 bg-muted text-center shadow shrink-0 rounded-none">
        <p className="font-body text-sm text-muted-foreground">
          Banner Ad Placeholder
        </p>
        <p className="font-body text-xs text-muted-foreground/70 mt-1">
          (In a real app, an AdMob banner ad could be placed here using a test ID like: 
          <code className="bg-gray-100 dark:bg-gray-800 p-0.5 rounded">ca-app-pub-3940256099942544/6300978111</code>)
        </p>
      </div>
    </div>
  );
}
