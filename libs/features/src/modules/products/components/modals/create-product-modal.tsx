import { Plus } from 'lucide-react';
import { AddProductForm } from '../forms/add-product-form';
import Button from 'libs/ui/src/components/button';
import { useProductStore } from '../../hooks/use-product-store';
import Modal from 'libs/ui/src/components/modal';
import { useWindowSize } from 'react-use';

export const CreateProductModal = ({
  showButton = false,
}: {
  showButton?: boolean;
}) => {
  const { openCreateModal, setOpenCreateModal } = useProductStore();
  const { width } = useWindowSize();
  return (
    <>
      {showButton && (
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
      )}

      <Modal
        isOpen={openCreateModal}
        setIsOpen={setOpenCreateModal}
        closeable
        text={{
          title: 'Nuevo Producto',
        }}
        className="w-full md:w-1/2"
        hideButtons
      >
        <AddProductForm />
      </Modal>
    </>
  );
};

export default CreateProductModal;
