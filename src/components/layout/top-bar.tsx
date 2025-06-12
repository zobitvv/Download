
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import DynamicIcon from '@/components/dynamic-icon';
import { Share2, Bell, MessageSquare, Facebook, Users } from 'lucide-react';

interface TopBarProps {
  appName: string;
  appLogoUrl: string;
  contactWhatsApp: string;
  groupWhatsApp: string;
  facebookProfile: string;
}

export default function TopBar({ appName, appLogoUrl, contactWhatsApp, groupWhatsApp, facebookProfile }: TopBarProps): JSX.Element {
  const isCustomLogo = appLogoUrl && appLogoUrl.startsWith('/');

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {isCustomLogo ? (
            <Image
              src={appLogoUrl}
              alt={`${appName} logo`}
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
            />
          ) : (
            <DynamicIcon name={appLogoUrl || 'LayoutPanelLeft'} className="h-7 w-7 text-primary" />
          )}
          <span className="font-headline text-xl font-bold text-foreground">{appName}</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-1">
          <Button variant="ghost" size="icon" asChild aria-label="Admin WhatsApp Contact">
            <Link href={contactWhatsApp} target="_blank" rel="noopener noreferrer">
              <MessageSquare className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
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
          <Button variant="ghost" size="icon" aria-label="Share App" onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: appName,
                text: `Check out ${appName}!`,
                url: window.location.origin,
              }).catch(console.error);
            } else {
              alert('Sharing is not supported on this browser. You can copy the URL.');
            }
          }}>
            <Share2 className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
}
