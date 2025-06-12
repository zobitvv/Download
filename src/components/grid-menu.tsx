import GridMenuItem from '@/components/grid-menu-item';
import type { WebViewItemConfig } from '@/lib/config';

interface GridMenuProps {
  items: WebViewItemConfig[];
}

const GridMenu: React.FC<GridMenuProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="text-center text-muted-foreground font-body">No items to display.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-6">
      {items.map((item) => (
        <GridMenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default GridMenu;
