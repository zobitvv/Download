
"use client";

import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { AppConfig } from '@/lib/config';
import { Info } from 'lucide-react';

const DAILY_MESSAGE_SHOWN_KEY = 'dailyMessageShownZobiView'; // Unique key

// Helper function to fetch config on client side
async function getClientConfig(): Promise<AppConfig> {
  const res = await fetch('/config.json?t=' + new Date().getTime()); // Cache bust
  if (!res.ok) {
    throw new Error('Failed to fetch config for daily message');
  }
  return res.json();
}

// Helper function to get the day of the year
const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

export default function DailyMessageNotifier() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const showDailyMessage = async () => {
      try {
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD
        const lastShownDate = sessionStorage.getItem(DAILY_MESSAGE_SHOWN_KEY);

        if (lastShownDate === todayStr) {
          // Message for today already shown in this session
          return;
        }

        const config = await getClientConfig();
        const messages = config.dailyMessages;

        if (messages && messages.length > 0) {
          const dayOfYear = getDayOfYear(today);
          const messageIndex = dayOfYear % messages.length;
          const messageToShow = messages[messageIndex];

          if (messageToShow) {
            toast({
              title: (
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Message of the Day
                </div>
              ),
              description: messageToShow,
              duration: 9000, // Show for 9 seconds
            });
            sessionStorage.setItem(DAILY_MESSAGE_SHOWN_KEY, todayStr);
          }
        }
      } catch (error) {
        console.warn('DailyMessageNotifier: Error fetching or displaying message:', error);
      }
    };

    showDailyMessage();

  }, [isClient, toast]);

  return null;
}
