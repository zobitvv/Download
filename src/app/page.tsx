
import { getConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck, Zap, Globe, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  const config = await getConfig();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-primary">
                {config.appName}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-body">
                The ultimate all-in-one utility hub for SIM information, bill checking, and digital tools. Fast, secure, and always at your fingertips.
              </p>
            </div>
            <div className="space-x-4 pt-4">
              <Button size="lg" className="font-headline px-8 py-6 text-lg rounded-full shadow-lg hover:scale-105 transition-transform" asChild>
                <Link href="#">
                  <Download className="mr-2 h-6 w-6" />
                  Download Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <ShieldCheck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-bold">Secure Data Access</h3>
              <p className="text-muted-foreground font-body">
                Access your essential information through secure, verified channels with privacy first.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border shadow-sm">
              <div className="p-3 rounded-full bg-accent/10">
                <Zap className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-headline font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground font-body">
                No more waiting. Get SIM details and check bills in seconds with our optimized interface.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-2xl bg-card border shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <Globe className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-bold">All-In-One Hub</h3>
              <p className="text-muted-foreground font-body">
                Consolidate multiple web tools into one single, powerful application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl">Need Help?</h2>
            <p className="max-w-[600px] text-muted-foreground font-body md:text-lg">
              Our support team is available via WhatsApp for any queries or technical assistance.
            </p>
            <Button variant="outline" className="font-headline rounded-full" asChild>
              <Link href={config.contactWhatsApp} target="_blank">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="w-full py-8 border-t">
        <div className="container px-4 text-center">
          <p className="text-sm text-muted-foreground font-body">
            © {new Date().getFullYear()} Zobi Tech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
