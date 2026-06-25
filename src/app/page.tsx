
import { getConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck, Zap, Globe, MessageSquare, Facebook, Users, Smartphone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const config = await getConfig();

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background flex justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-8 relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            {config.appLogoUrl ? (
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src={config.appLogoUrl} 
                  alt="Zobi Tech Logo" 
                  fill 
                  className="object-contain bg-white p-2"
                />
              </div>
            ) : (
              <Globe className="h-24 w-24 text-primary relative" />
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-primary mb-6">
            {config.appName}
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground font-body mb-10 leading-relaxed px-4">
            The most trusted digital companion for Pakistan. Manage your digital life with our fast, secure, and completely free mobile application.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-xl hover:scale-105 transition-all font-headline w-full sm:w-auto" asChild>
              <Link href="https://raw.githubusercontent.com/zobitvv/Download/main/src/app/ZobiTech.apk">
                <Download className="mr-3 h-6 w-6" />
                Download APK
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-2 font-headline w-full sm:w-auto" asChild>
              <Link href={config.groupWhatsApp} target="_blank">
                <Users className="mr-3 h-6 w-6" />
                Join Group
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground font-body">
            Version 2.0.1 • Requires Android 6.0+
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-20 bg-card border-y flex justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-muted/50 transition-colors">
              <div className="p-4 rounded-2xl bg-primary/10">
                <ShieldCheck className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold">100% Secure</h3>
              <p className="text-muted-foreground font-body">Your privacy is our priority. No data harvesting, just pure utility.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-muted/50 transition-colors">
              <div className="p-4 rounded-2xl bg-accent/10">
                <Zap className="h-12 w-12 text-accent" />
              </div>
              <h3 className="text-2xl font-headline font-bold">Lightning Fast</h3>
              <p className="text-muted-foreground font-body">Optimized for low-end devices and slow connections in Pakistan.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-muted/50 transition-colors">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Smartphone className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold">All-in-One</h3>
              <p className="text-muted-foreground font-body">SIM tracking, CNIC info, Bill checks, and more in one small app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Support */}
      <section className="w-full py-20 flex justify-center bg-muted/20">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-4xl font-headline font-bold mb-8">Need Support?</h2>
          <div className="flex justify-center gap-8">
             <Link href={config.contactWhatsApp} target="_blank" className="flex flex-col items-center gap-2 group">
               <div className="p-6 rounded-full bg-green-500/10 text-green-600 group-hover:bg-green-500/20 transition-all scale-100 group-hover:scale-110 shadow-lg">
                 <MessageSquare className="h-10 w-10" />
               </div>
               <span className="font-body text-sm font-semibold">WhatsApp</span>
             </Link>
             <Link href={config.facebookProfile} target="_blank" className="flex flex-col items-center gap-2 group">
               <div className="p-6 rounded-full bg-blue-600/10 text-blue-600 group-hover:bg-blue-600/20 transition-all scale-100 group-hover:scale-110 shadow-lg">
                 <Facebook className="h-10 w-10" />
               </div>
               <span className="font-body text-sm font-semibold">Facebook</span>
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t mt-auto text-center bg-background">
        <div className="container px-4">
          <p className="text-muted-foreground font-body">
            &copy; {new Date().getFullYear()} Zobi Tech Pakistan. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground underline">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
