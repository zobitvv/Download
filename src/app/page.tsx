import { getConfig } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Download, ShieldCheck, Zap, MessageSquare, Facebook, Users, Search, Database, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const config = await getConfig();
  const downloadLink = "https://github.com/zobitvv/p2/releases/download/apk/ZobiTech.apk";

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background flex justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center">
          <div className="mb-8 relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-3xl overflow-hidden flex items-center justify-center">
              <Image 
                src="/icon.webp" 
                alt="Zobi Tech APK Logo" 
                width={160}
                height={160}
                className="object-contain"
                priority
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-primary mb-6">
            Download {config.appName} APK
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground font-body mb-10 leading-relaxed px-4">
            Get the #1 trusted <strong>Pak Sim Data</strong> and <strong>Sim Tracker</strong> app. 
            Check CNIC information, electricity bills, and mobile ownership records instantly. 
            The official <strong>Zobi Tech App</strong> is safe, lightweight, and 100% free for all Pakistanis.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
            <Button size="lg" className="h-16 px-10 text-xl rounded-full shadow-xl hover:scale-105 transition-all font-headline w-full sm:w-auto" asChild>
              <Link href={downloadLink}>
                <Download className="mr-3 h-6 w-6" />
                Download APK Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-full border-2 font-headline w-full sm:w-auto" asChild>
              <Link href={config.groupWhatsApp} target="_blank">
                <Users className="mr-3 h-6 w-6" />
                Join Community
              </Link>
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground font-body">
            Official Zobitech Version 2.0.1 • 100% Virus Free • Android 6.0+
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="w-full py-20 bg-card border-y flex justify-center">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">Why Choose Zobi Tech App?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-bold">SIM Tracker</h3>
              <p className="text-sm text-muted-foreground font-body">Trace any mobile number in Pakistan. Get owner details, CNIC number, and address instantly with our live tracker.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="p-4 rounded-2xl bg-accent/10">
                <Database className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-headline font-bold">Pak Sim Data</h3>
              <p className="text-sm text-muted-foreground font-body">Access the most updated 2024 database for SIM information. Check SIM ownership and registered numbers on any CNIC.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="p-4 rounded-2xl bg-primary/10">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-headline font-bold">Bill Checker</h3>
              <p className="text-sm text-muted-foreground font-body">Verify your WAPDA electricity, gas, and water bills online. Simply enter your reference number and download the bill duplicate.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl bg-muted/30 border border-border/50">
              <div className="p-4 rounded-2xl bg-accent/10">
                <ShieldCheck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-headline font-bold">Safe & Secure</h3>
              <p className="text-sm text-muted-foreground font-body">100% privacy protection. We do not collect personal data. Use Zobi Tech with full confidence and security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Support */}
      <section className="w-full py-20 flex justify-center bg-muted/20">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-4xl font-headline font-bold mb-8">Official Support Channels</h2>
          <div className="flex justify-center gap-8">
             <Link href={config.contactWhatsApp} target="_blank" className="flex flex-col items-center gap-2 group">
               <div className="p-6 rounded-full bg-green-500/10 text-green-600 group-hover:bg-green-500/20 transition-all scale-100 group-hover:scale-110 shadow-lg">
                 <MessageSquare className="h-10 w-10" />
               </div>
               <span className="font-body text-sm font-semibold">WhatsApp Admin</span>
             </Link>
             <Link href={config.facebookProfile} target="_blank" className="flex flex-col items-center gap-2 group">
               <div className="p-6 rounded-full bg-blue-600/10 text-blue-600 group-hover:bg-blue-600/20 transition-all scale-100 group-hover:scale-110 shadow-lg">
                 <Facebook className="h-10 w-10" />
               </div>
               <span className="font-body text-sm font-semibold">Official Facebook</span>
             </Link>
             <Link href={config.groupWhatsApp} target="_blank" className="flex flex-col items-center gap-2 group">
               <div className="p-6 rounded-full bg-green-600/10 text-green-700 group-hover:bg-green-600/20 transition-all scale-100 group-hover:scale-110 shadow-lg">
                 <Users className="h-10 w-10" />
               </div>
               <span className="font-body text-sm font-semibold">Join Group</span>
             </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t mt-auto text-center bg-background">
        <div className="container px-4">
          <p className="text-muted-foreground font-body">
            &copy; {new Date().getFullYear()} Zobi Tech Pakistan. Providing quality digital services since 2021.
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground underline">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
