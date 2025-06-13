
"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { type WebViewItemConfig, type AppConfig } from '@/lib/config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ShieldAlert } from 'lucide-react';
import DynamicIcon from '@/components/dynamic-icon';

// Helper function to fetch config on client side
async function getClientConfig(): Promise<AppConfig> {
  const res = await fetch('/config.json?t=' + new Date().getTime());
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
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0); 

  useEffect(() => {
    if (id) {
      setIsLoading(true); 
      setItem(null); 
      setConfigError(null); 

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
        setIframeKey(prevKey => prevKey + 1); 
      });
    } else {
      setIsLoading(false);
      setConfigError("No content ID specified.");
    }
  }, [id]);

  const renderContent = () => {
    if (item && item.contentUrl) {
      return (
        <iframe
          key={iframeKey}
          src={item.contentUrl}
          title={item.title} 
          className="absolute top-0 left-0 w-full h-full border-0" 
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
  
  if (isLoading) {
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

  return (
    <div className="flex flex-col flex-1 bg-background">
      {item.itemSpecificLaunchMessage && (
        <Alert variant="default" className="rounded-none border-x-0 border-t-0 bg-accent/10 text-accent-foreground dark:bg-accent/20">
          <ShieldAlert className="h-5 w-5 text-accent" />
          <AlertTitle className="font-headline text-accent">Important Notice</AlertTitle>
          <AlertDescription className="font-body">
            {item.itemSpecificLaunchMessage}
          </AlertDescription>
        </Alert>
      )}
      <div className="relative flex-1 w-full min-h-0"> 
        {renderContent()}
      </div>
    </div>
  );
}
