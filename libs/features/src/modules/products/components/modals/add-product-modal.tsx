import { Plus } from 'lucide-react';
import { AddProductForm } from '../forms/add-product-form';
import Button from 'libs/ui/src/components/button';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import {
  TabGroup,
  TabItem,
  TabList,
  TabPanel,
  TabPanels,
} from 'libs/ui/src/components/tab';
import { AddProductVariantForm } from '../forms/add-variant-form';
import { useWindowSize } from 'react-use';

export const AddProductModal = () => {
  const { openCreateModal, setOpenCreateModal } = useProductStore();
  const { width } = useWindowSize();
  return (
    <>
      <Button
        variant="solid"
        shape="rounded"
        size="small"
        onClick={() => setOpenCreateModal(true)}
      >
        <div className="flex items-center">
          <Plus className={width > 700 ? 'h-4 w-4 mr-2' : 'h-6 w-6'} />
          {width > 700 && 'Agregar Producto'}
        </div>
      </Button>

      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        closeable
        text={{
          title: 'Nuevo Producto',
        }}
        className="w-full md:w-1/2 "
        hideButtons
      >
        <TabGroup>
          <TabList className="grid w-full grid-cols-2 mt-4">
            <TabItem>Producto</TabItem>
            <TabItem>Variante</TabItem>
          </TabList>
          <TabPanels className="mt-3">
            <TabPanel className="relative w-full focus:outline-none md:w-auto">
              <AddProductForm />
            </TabPanel>
            <TabPanel className="relative w-full focus:outline-none md:w-auto">
              <AddProductVariantForm />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </Modal>
    </>
  );
};

export default AddProductModal;
