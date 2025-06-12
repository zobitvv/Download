
"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { type WebViewItemConfig, type AppConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, XCircle } from 'lucide-react'; // Added XCircle
import DynamicIcon from '@/components/dynamic-icon';

// Helper function to fetch config on client side
async function getClientConfig(): Promise<AppConfig> {
  const res = await fetch('/config.json?t=' + new Date().getTime());
  if (!res.ok) {
    throw new Error('Failed to fetch config');
  }
  return res.json();
}

const INTERSTITIAL_AD_THRESHOLD = 3; // Show ad every 3 webview loads
const INTERSTITIAL_AD_LOAD_COUNT_KEY = 'zobiViewWebViewLoadCount';
const INTERSTITIAL_AD_LAST_SHOWN_TS_KEY = 'zobiViewInterstitialLastShownTimestamp';
const MIN_INTERVAL_BETWEEN_INTERSTITIALS = 2 * 60 * 1000; // 2 minutes in milliseconds


export default function WebViewPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [item, setItem] = useState<WebViewItemConfig | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);
  const [adWatched, setAdWatched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); 

  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  // This state controls whether the main content fetching logic should proceed.
  // It's set to true if no interstitial is shown, or after an interstitial is closed.
  const [readyToLoadItemContent, setReadyToLoadItemContent] = useState(false);


  // Effect for interstitial ad logic
  useEffect(() => {
    if (id) {
      const now = Date.now();
      const lastShownTimestamp = parseInt(localStorage.getItem(INTERSTITIAL_AD_LAST_SHOWN_TS_KEY) || '0', 10);

      // Check if enough time has passed since the last interstitial
      if (now - lastShownTimestamp < MIN_INTERVAL_BETWEEN_INTERSTITIALS) {
        setReadyToLoadItemContent(true); // Proceed to load content, too soon for another ad
        return;
      }

      let currentLoadCount = parseInt(localStorage.getItem(INTERSTITIAL_AD_LOAD_COUNT_KEY) || '0', 10);
      currentLoadCount++;

      if (currentLoadCount >= INTERSTITIAL_AD_THRESHOLD) {
        setShowInterstitialAd(true);
        localStorage.setItem(INTERSTITIAL_AD_LOAD_COUNT_KEY, '0'); // Reset count
        localStorage.setItem(INTERSTITIAL_AD_LAST_SHOWN_TS_KEY, now.toString()); // Record when ad was shown
        setReadyToLoadItemContent(false); // Content loading waits for ad to close
      } else {
        localStorage.setItem(INTERSTITIAL_AD_LOAD_COUNT_KEY, currentLoadCount.toString());
        setReadyToLoadItemContent(true); // No interstitial, proceed to load content
      }
    } else {
      // If there's no ID, we are not on a specific webview item page, so allow "content" (which would be an error/empty state)
      setReadyToLoadItemContent(true);
    }
  }, [id]); // Rerun when the webview item id changes

  // Effect for loading item configuration (depends on readyToLoadItemContent)
  useEffect(() => {
    // Only proceed if an ID is present, we are ready to load, and an interstitial isn't currently active
    if (id && readyToLoadItemContent && !showInterstitialAd) {
      setIsLoading(true); 
      setAdWatched(false); 
      setItem(null); // Reset item state for the new ID
      setConfigError(null); // Reset error state

      getClientConfig().then(config => {
        const foundItem = config.webViews.find(wv => wv.id === id);
        if (foundItem) {
          setItem(foundItem);
          if (!foundItem.rewardedAdRequired) {
            setAdWatched(true);
          }
        } else {
          setConfigError(`Content with ID "${id}" not found.`);
        }
      }).catch(err => {
        console.error("Error fetching/finding config item:", err);
        setConfigError("Could not load content configuration.");
      }).finally(() => {
        setIsLoading(false);
        setIframeKey(prevKey => prevKey + 1); 
      });
    } else if (!id && readyToLoadItemContent) {
      // Handle cases where ID might be missing but we are "ready" (e.g. invalid route)
      setIsLoading(false);
      setConfigError("No content ID specified.");
    }
  }, [id, readyToLoadItemContent, showInterstitialAd]);

  const handleAdWatched = () => {
    setAdWatched(true);
  };

  const handleCloseInterstitialAd = () => {
    setShowInterstitialAd(false);
    setReadyToLoadItemContent(true); // Signal that item content loading can now proceed
  };

  const renderContent = () => {
    if (item && item.contentUrl) {
      return (
        <iframe
          key={iframeKey}
          src={item.contentUrl}
          title={item.title} 
          className="block w-full h-full border-0" 
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-fullscreen"
        />
      );
    }
    if (item && item.htmlContent) {
      return (
        <div
          className="block prose dark:prose-invert max-w-none p-4 bg-card font-body h-full overflow-y-auto"
          dangerouslySetInnerHTML={{ __html: item.htmlContent }}
        />
      );
    }
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <p className="font-body text-center">No content available for this item.</p>
      </div>
    );
  };

  // Interstitial Ad Display (takes precedence if active)
  if (showInterstitialAd) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <Card className="w-full max-w-md text-center shadow-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-xl">Advertisement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-body text-muted-foreground">
              This is a placeholder for an interstitial ad that would show before content access.
            </p>
            <div className="bg-muted aspect-video w-full flex items-center justify-center rounded-md">
              <span className="text-muted-foreground font-semibold">Ad Content Area</span>
            </div>
            <Button onClick={handleCloseInterstitialAd} size="lg" className="font-body w-full">
              <XCircle className="mr-2 h-5 w-5" />
              Close Ad (Simulated)
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground/80 w-full text-center">Ad placeholder for ZobiView</p>
          </CardFooter>
        </Card>
      </div>
    );
  }
  
  // Loading state: either initial, or after interstitial logic before content is ready, or during item fetching
  if (isLoading || (!readyToLoadItemContent && !showInterstitialAd)) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center p-4 bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-body text-muted-foreground">Loading content...</p>
      </div>
    );
  }

  if (configError) {
    return (
       <div className="flex flex-col flex-1 items-center justify-center p-4 bg-background">
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
       <div className="flex flex-col flex-1 items-center justify-center p-4 bg-background">
         <Alert variant="destructive" className="max-w-xl w-full">
           <DynamicIcon name="AlertTriangle" className="h-4 w-4" />
          <AlertTitle className="font-headline">Error</AlertTitle>
          <AlertDescription className="font-body">Content not found or still loading.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const showAdExperience = item.rewardedAdRequired && !adWatched;

  return (
    <div className="flex flex-col flex-1 bg-background">
      {showAdExperience ? (
        <Card className="text-center shrink-0 rounded-none border-x-0 border-b">
          <CardHeader>
            <CardTitle className="font-headline">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-body">This content requires you to watch a short ad to proceed.</p>
            <Alert className="text-left bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700">
              <DynamicIcon name="Info" className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Rewarded Ad Placeholder</AlertTitle>
              <AlertDescription className="font-body">
                In a real app, an AdMob rewarded ad would be requested and displayed here.
                Test Ad Unit ID (Android): <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded my-1">ca-app-pub-3940256099942544/5224354917</code>.
                Test Ad Unit ID (iOS): <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded my-1">ca-app-pub-3940256099942544/1712485313</code>.
              </AlertDescription>
            </Alert>
            <Button onClick={handleAdWatched} size="lg" className="font-body">
              <DynamicIcon name="PlayCircle" className="mr-2 h-5 w-5" />
              Watch Ad to Continue (Simulated)
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="relative flex-1 w-full min-h-0"> 
          {renderContent()}
        </div>
      )}

      <div className="p-4 bg-muted text-center shadow shrink-0 rounded-none border-t">
        <p className="font-body text-sm text-muted-foreground">
          Banner Ad Placeholder
        </p>
        <p className="font-body text-xs text-muted-foreground/70 mt-1">
          (AdMob Test ID: <code className="bg-gray-100 dark:bg-gray-800 p-0.5 rounded">ca-app-pub-3940256099942544/6300978111</code>)
        </p>
      </div>
    </div>
  );
}
    
