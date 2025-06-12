import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import DynamicIcon from '@/components/dynamic-icon';
import type { WebViewItemConfig } from '@/lib/config';
import { Badge } from '@/components/ui/badge';

interface GridMenuItemProps {
  item: WebViewItemConfig;
}

const GridMenuItem: React.FC<GridMenuItemProps> = ({ item }) => {
  return (
    <Link href={`/webview/${item.id}`} className="block group h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-xl group-hover:border-primary relative bg-card">
        {item.thumbnailUrl && (
          <div className="aspect-[4/3] w-full overflow-hidden relative">
            <Image
              src={item.thumbnailUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={item.dataAiHint || "placeholder image"}
            />
            {item.rewardedAdRequired && (
              <Badge
                variant="secondary"
                className="absolute top-2 right-2 text-xs px-1.5 py-0.5 opacity-90 group-hover:opacity-100 shadow-sm pointer-events-none"
              >
                Ad
              </Badge>
            )}
          </div>
        )}

        <div
          className={`p-3 flex flex-col flex-grow ${
            !item.thumbnailUrl
              ? 'justify-center items-center text-center'
              : 'justify-end' 
          }`}
        >
          <h3
            className={`font-headline ${
              item.thumbnailUrl ? 'text-sm' : 'text-lg'
            } font-semibold group-hover:text-primary transition-colors truncate w-full`}
            title={item.title}
          >
            {item.title}
          </h3>

          {!item.thumbnailUrl && (
            <div className="flex flex-col items-center text-center mt-2">
              <DynamicIcon name={item.icon} className="h-10 w-10 text-muted-foreground mb-2" />
              {item.descriptiveText && item.showDescriptiveText ? (
                 <p className="text-xs text-muted-foreground font-body line-clamp-2">
                   {item.descriptiveText}
                 </p>
              ) : (
                <p className="text-xs text-muted-foreground font-body">Click to open.</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default GridMenuItem;
