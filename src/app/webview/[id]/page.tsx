
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getConfig, type WebViewItemConfig, type AppConfig } from '@/lib/config'; // Assuming getConfig can be adapted or use a client-side fetcher for config
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from 'lucide-react';
import DynamicIcon from '@/components/dynamic-icon';

// Helper function to fetch config on client side or pass as props if SSR/SSG
// For this example, we'll fetch it on client side for simplicity.
// In a real app, you might pass config data as props from a server component.
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
  const [showFullDescription, setShowFullDescription] = useState(false);

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg font-body text-muted-foreground">Loading content...</p>
      </div>
    );
  }

  if (configError) {
    return (
       <Alert variant="destructive" className="max-w-xl mx-auto">
        <DynamicIcon name="AlertTriangle" className="h-4 w-4" />
        <AlertTitle className="font-headline">Error</AlertTitle>
        <AlertDescription className="font-body">{configError}</AlertDescription>
      </Alert>
    );
  }

  if (!item) {
     return (
       <Alert variant="destructive" className="max-w-xl mx-auto">
         <DynamicIcon name="AlertTriangle" className="h-4 w-4" />
        <AlertTitle className="font-headline">Error</AlertTitle>
        <AlertDescription className="font-body">Content not found.</AlertDescription>
      </Alert>
    );
  }

  const handleWatchAd = () => {
    // Simulate watching an ad
    setAdWatched(true);
    // In a real app, you'd integrate with AdMob here
  };

  const renderContent = () => {
    if (item.contentUrl) {
      return (
        <iframe
          src={item.contentUrl}
          title={item.title}
          className="w-full h-[60vh] md:h-[70vh] border-0 rounded-md shadow-lg"
          allowFullScreen
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-fullscreen"
        />
      );
    }
    if (item.htmlContent) {
      return (
        <div
          className="prose dark:prose-invert max-w-none p-4 bg-card rounded-md shadow-lg font-body"
          dangerouslySetInnerHTML={{ __html: item.htmlContent }}
        />
      );
    }
    return <p className="font-body">No content available for this item.</p>;
  };

  const descriptionToShow = item.descriptiveText ? 
    (showFullDescription ? item.descriptiveText : item.descriptiveText.slice(0, 150) + (item.descriptiveText.length > 150 ? "..." : ""))
    : "";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <DynamicIcon name={item.icon} className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-2xl">{item.title}</CardTitle>
          </div>
        </CardHeader>
        {item.showDescriptiveText && item.descriptiveText && (
          <CardContent className="pt-0">
            <CardDescription className="font-body text-base whitespace-pre-line">
              {descriptionToShow}
            </CardDescription>
            {item.descriptiveText.length > 150 && (
                 <Button variant="link" className="p-0 h-auto text-primary font-body" onClick={() => setShowFullDescription(!showFullDescription)}>
                    {showFullDescription ? "Show less" : "Show more"}
                </Button>
            )}
          </CardContent>
        )}
      </Card>

      {item.rewardedAdRequired && !adWatched ? (
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="font-headline">Access Restricted</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-body">This content requires you to watch a short ad to proceed.</p>
            <Alert className="text-left bg-blue-50 border-blue-200">
              <DynamicIcon name="Info" className="h-5 w-5 text-primary" />
              <AlertTitle className="font-headline text-primary">Rewarded Ad Placeholder</AlertTitle>
              <AlertDescription className="font-body">
                In a real app, an AdMob rewarded ad would play here.
              </AlertDescription>
            </Alert>
            <Button onClick={handleWatchAd} size="lg" className="font-body">
              <DynamicIcon name="PlayCircle" className="mr-2 h-5 w-5" />
              Watch Ad to Continue
            </Button>
          </CardContent>
        </Card>
      ) : (
        renderContent()
      )}

      <div className="mt-8 p-4 bg-muted text-center rounded-md shadow">
        <p className="font-body text-sm text-muted-foreground">Banner Ad Placeholder</p>
      </div>
    </div>
  );
}
