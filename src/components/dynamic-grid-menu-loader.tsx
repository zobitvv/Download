
"use client";

import { useEffect, useState } from 'react';
import GridMenu from '@/components/grid-menu';
import type { WebViewItemConfig, AppConfig } from '@/lib/config';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DynamicIcon from '@/components/dynamic-icon';

// Helper function to fetch config on client side, ensuring fresh data
async function getClientConfig(): Promise<AppConfig> {
  const res = await fetch('/config.json?t=' + new Date().getTime()); // Cache-busting
  if (!res.ok) {
    throw new Error(`Failed to fetch config: ${res.statusText}`);
  }
  return res.json();
}

export default function DynamicGridMenuLoader() {
  const [webViews, setWebViews] = useState<WebViewItemConfig[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getClientConfig()
      .then(config => {
        if (config && Array.isArray(config.webViews)) {
          setWebViews(config.webViews);
        } else {
          console.error("Fetched config is not in expected format or webViews is missing:", config);
          setError("Could not load menu items due to invalid configuration format.");
          setWebViews([]); // Set to empty array to stop loading and show message
        }
      })
      .catch(err => {
        console.error("Error fetching webviews for grid:", err);
        setError(`Could not load menu items: ${err.message}`);
        setWebViews([]); // Set to empty array to stop loading and show message
      });
  }, []);

  if (error) {
    return (
      <Alert variant="destructive" className="my-8">
        <DynamicIcon name="AlertTriangle" className="h-4 w-4" />
        <AlertTitle className="font-headline">Error Loading Menu</AlertTitle>
        <AlertDescription className="font-body">{error}</AlertDescription>
      </Alert>
    );
  }

  if (webViews === null) {
    // Show a skeleton loader for the grid items
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => ( // Render 8 skeletons as an example
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className="h-10 w-10 rounded-md" /> {/* Icon skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Title skeleton */}
            <Skeleton className="aspect-[3/2] w-full rounded-xl" /> {/* Thumbnail skeleton */}
            <Skeleton className="h-4 w-full rounded-md" /> {/* Description line 1 */}
            <Skeleton className="h-4 w-5/6 rounded-md" /> {/* Description line 2 */}
          </div>
        ))}
      </div>
    );
  }

  return <GridMenu items={webViews} />;
}
