
import { getConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck, Zap, Globe, MessageSquare, Facebook, Users } from 'lucide-react';
import Link from 'next/link';

export default async function HomePage() {
  const config = await getConfig();

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background flex justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-6 p-4 rounded-3xl bg-card shadow-2xl border border-primary/20">
             <Globe className="h-20 w-20 text-primary animate-pulse" />
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-primary mb-6">
            {config.appName}
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground font-body mb-10 leading-relaxed">
            Your all-in-one digital companion for Pakistan. Access SIM details, check utility bills, and manage your digital life with ease. Secure, fast, and free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-xl hover:scale-105 transition-all font-headline" asChild>
              <Link href="https://github.com/zobitech/app/releases/latest/download/zobitech.apk">
                <Download className="mr-3 h-6 w-6" />
                Download APK
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-2 font-headline" asChild>
              <Link href={config.groupWhatsApp} target="_blank">
                <Users className="mr-3 h-6 w-6" />
                Join Community
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-card border-y flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-2xl bg-primary/5">
                <ShieldCheck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold">Privacy Focused</h3>
              <p className="text-muted-foreground font-body">No data harvesting. Your searches and requests are kept private and secure.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-2xl bg-accent/5">
                <Zap className="h-12 w-12 text-accent" />
              </div>
              <h3 className="text-2xl font-headline font-bold">Optimized Speed</h3>
              <p className="text-muted-foreground font-body">Lightweight application architecture ensures smooth performance on all devices.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-2xl bg-primary/5">
                <Globe className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold">Multi-Utility</h3>
              <p className="text-muted-foreground font-body">From CNIC information to WhatsApp tools, everything you need in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Community */}
      <section className="w-full py-20 flex justify-center">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-4xl font-headline font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-6">
             <Link href={config.contactWhatsApp} className="p-4 rounded-full bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors">
               <MessageSquare className="h-8 w-8" />
             </Link>
             <Link href={config.facebookProfile} className="p-4 rounded-full bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition-colors">
               <Facebook className="h-8 w-8" />
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 border-t mt-auto text-center bg-muted/30">
        <p className="text-sm text-muted-foreground font-body">
          &copy; {new Date().getFullYear()} Zobi Tech. Proudly developed for the Pakistani digital ecosystem.
        </p>
      </footer>
    </div>
  );
}
