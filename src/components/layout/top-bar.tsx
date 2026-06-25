'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import DynamicIcon from '@/components/dynamic-icon';
import { Share2, Bell, MessageSquare, Facebook, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TopBarProps {
  appName: string;
  appLogoUrl: string;
  contactWhatsApp: string;
  groupWhatsApp: string;
  facebookProfile: string;
}

export default function TopBar({ appName, appLogoUrl, contactWhatsApp, groupWhatsApp, facebookProfile }: TopBarProps): JSX.Element {
  const { toast } = useToast();
  const isLogoUrl = appLogoUrl?.startsWith('/') || appLogoUrl?.startsWith('http');
  const shareUrl = 'https://zobitech.vercel.app/';

  const handleShare = async () => {
    const shareData = {
      title: appName,
      text: `Download the official ${appName} App for SIM Tracker & Bill Checks in Pakistan!`,
      url: shareUrl,
    };

    // Try Web Share API first
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
        return; // Success
      } catch (err) {
        // If user cancelled, we do nothing. Otherwise, we'll try the fallback.
        if ((err as Error).name !== 'AbortError') {
          console.warn('Navigator.share failed, falling back to clipboard:', err);
        } else {
          return; // User dismissed share sheet
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link Copied!",
          description: "App link copied to clipboard. Share it with your friends!",
        });
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Sharing Not Supported",
        description: "Your browser does not support sharing or copying to clipboard.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {isLogoUrl ? (
            <div className="h-9 w-9 relative overflow-hidden flex items-center justify-center">
              <Image
                src={appLogoUrl}
                alt={`${appName} logo`}
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
          ) : (
            <DynamicIcon name={appLogoUrl || "LayoutPanelLeft"} className="h-7 w-7 text-primary" />
          )}
          <span className="font-headline text-xl font-bold text-foreground">{appName}</span>
        </Link>
        <nav className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Admin WhatsApp Contact">
            <Link href={contactWhatsApp} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Join WhatsApp Group">
            <Link href={groupWhatsApp} target="_blank" rel="noopener noreferrer">
              <Users className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Admin Facebook Profile">
            <Link href={facebookProfile} target="_blank" rel="noopener noreferrer">
              <Facebook className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Share App" onClick={handleShare}>
            <Share2 className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
