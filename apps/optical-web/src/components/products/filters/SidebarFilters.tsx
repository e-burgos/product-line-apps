import { Drawer } from 'libs/ui/src/components/drawer';
import { StatusFilterCard } from './StatusFilterCard';
import { GridFilterCard } from './GridFilterCard';
import { PriceFilterCard } from './PriceFilterCard';
import { BrandFilterCard } from './BrandFilterCard';
import { SortFilterCard } from './SortFilterCard';
import Button from 'libs/ui/src/components/button/button';

interface SidebarFiltersProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

export function SidebarFilters({
  className,
  children,
  onClose,
}: SidebarFiltersProps) {
  return (
    <Drawer
      type="sidebar"
      backdrop={false}
      onClose={onClose}
      className={className}
      actionContent={
        <Button fullWidth shape="rounded" size="medium" onClick={onClose}>
          Aplicar
        </Button>
      }
    >
      <StatusFilterCard />
      <PriceFilterCard />
      <BrandFilterCard />
      <GridFilterCard />
      <SortFilterCard />
      {children}
    </Drawer>
  );
}
