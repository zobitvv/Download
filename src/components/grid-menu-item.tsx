
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
        {item.thumbnailUrl && item.thumbnailUrl.trim() !== '' ? (
          <div className="aspect-[4/3] w-full overflow-hidden relative">
            <Image
              src={item.thumbnailUrl}
              alt={item.title || 'Item thumbnail'}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            {/* Removed Ad Badge */}
          </div>
        ) : null}

        <div
          className={`p-3 flex flex-col flex-grow ${
            !(item.thumbnailUrl && item.thumbnailUrl.trim() !== '')
              ? 'justify-center items-center text-center' // Centered content if no thumbnail
              : 'justify-end' // Content at bottom if thumbnail exists
          }`}
        >
          <h3
            className={`font-headline ${
              (item.thumbnailUrl && item.thumbnailUrl.trim() !== '') ? 'text-sm' : 'text-lg'
            } font-semibold group-hover:text-primary transition-colors truncate w-full`}
            title={item.title}
          >
            {item.title}
          </h3>

          {/* Fallback display: Icon and descriptive text if no thumbnail */}
          {!(item.thumbnailUrl && item.thumbnailUrl.trim() !== '') && (
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
