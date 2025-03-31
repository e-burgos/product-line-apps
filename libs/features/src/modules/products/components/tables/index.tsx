import { FC } from 'react';
import { ProductsTable } from './products-table';
import { CategoriesTable } from './categories-table';
import { SubCategoriesTable } from './subcategories-table';
import {
  TabGroup,
  TabList,
  TabItem,
  TabPanels,
  TabPanel,
} from 'libs/ui/src/components/tab';

export const ProductTables: FC = () => {
  return (
    <TabGroup>
      <TabList className="grid w-full grid-cols-3">
        <TabItem>Productos</TabItem>
        <TabItem>Categorías</TabItem>
        <TabItem>Subcategorías</TabItem>
      </TabList>
      <TabPanels className="mt-6">
        <TabPanel>
          <ProductsTable />
        </TabPanel>
        <TabPanel>
          <CategoriesTable />
        </TabPanel>
        <TabPanel>
          <SubCategoriesTable />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
