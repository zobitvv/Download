
import { getConfig } from '@/lib/config';
import GridMenu from '@/components/grid-menu';
import LaunchMessageModal from '@/components/launch-message-modal';
import AiThemeOptimizer from '@/components/ai-theme-optimizer';
import { Separator } from '@/components/ui/separator';

export default async function HomePage() {
  const config = await getConfig();

  return (
    <div className="space-y-12">
      <LaunchMessageModal message={config.launchMessage} />
      
      <section>
        <h1 className="text-2xl font-headline mb-2 text-center text-primary">
          Welcome to {config.appName}
        </h1>
        <p className="text-center text-lg text-muted-foreground font-body mb-8">
          Your gateway to a collection of useful web tools and resources.
        </p>
        <GridMenu items={config.webViews} />
      </section>

      <Separator />

      <section>
        <AiThemeOptimizer initialThemeConfig={config.theme} />
      </section>
    </div>
  );
}
