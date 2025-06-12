import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import DynamicIcon from '@/components/dynamic-icon';
import type { WebViewItemConfig } from '@/lib/config';

interface GridMenuItemProps {
  item: WebViewItemConfig;
}

const GridMenuItem: React.FC<GridMenuItemProps> = ({ item }) => {
  return (
    <Link href={`/webview/${item.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary">
        <CardHeader className="flex flex-row items-center gap-4 p-4">
            <DynamicIcon name={item.icon} className="h-10 w-10 text-primary flex-shrink-0" />
          <div>
            <CardTitle className="font-headline text-lg">{item.title}</CardTitle>
            {item.rewardedAdRequired && (
              <CardDescription className="text-xs text-amber-600">Ad Supported</CardDescription>
            )}
          </div>
        </CardHeader>
        {item.thumbnailUrl && (
          <div className="aspect-[3/2] w-full overflow-hidden relative">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={item.dataAiHint || "placeholder image"}
            />
          </div>
        )}
        <CardContent className="p-4 flex-grow">
          {item.descriptiveText && item.showDescriptiveText && !item.thumbnailUrl && (
             <p className="text-sm text-muted-foreground font-body line-clamp-3">
               {item.descriptiveText.length > 100 ? item.descriptiveText.substring(0, 97) + "..." : item.descriptiveText}
             </p>
          )}
          {!item.thumbnailUrl && !item.descriptiveText && (
            <p className="text-sm text-muted-foreground font-body">Click to open.</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default GridMenuItem;
