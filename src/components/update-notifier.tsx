
"use client";

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const APP_VERSION_STORAGE_KEY = 'appVersionZobiView'; // Unique key for this app

interface VersionData {
  version: string;
}

export default function UpdateNotifier() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure localStorage is accessed only on client
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkVersion = async () => {
      try {
        // Add a cache-busting query parameter
        const response = await fetch('/version.json?t=' + new Date().getTime()); 
        if (!response.ok) {
          console.warn('UpdateNotifier: Could not fetch version.json. Status:', response.status);
          return;
        }
        const serverVersionData = (await response.json()) as VersionData;
        const serverVersion = serverVersionData.version;

        if (!serverVersion) {
          console.warn('UpdateNotifier: version.json does not contain a version string.');
          return;
        }

        const localVersion = localStorage.getItem(APP_VERSION_STORAGE_KEY);

        if (!localVersion) {
          // First time loading the app or storage was cleared, store server version without notifying
          localStorage.setItem(APP_VERSION_STORAGE_KEY, serverVersion);
        } else if (localVersion !== serverVersion) {
          // Versions differ, show update notification
          toast({
            title: 'App Update Available!',
            description: `A new version (${serverVersion}) is ready for you.`,
            duration: Infinity, // Keep toast until dismissed or updated by user
            action: (
              <Button
                onClick={() => {
                  // Store the new version *before* reloading
                  localStorage.setItem(APP_VERSION_STORAGE_KEY, serverVersion);
                  // Force reload from server, bypassing cache for the main document
                  window.location.reload(true); 
                }}
              >
                Update Now
              </Button>
            ),
          });
        }
      } catch (error) {
        console.error('UpdateNotifier: Error checking app version:', error);
      }
    };

    checkVersion();

    // Optional: Set an interval to check periodically if the app stays open for long periods
    // const intervalId = setInterval(checkVersion, 30 * 60 * 1000); // Check every 30 minutes
    // return () => clearInterval(intervalId);

  }, [isClient, toast]);

  return null; // This component does not render anything visible itself
}
