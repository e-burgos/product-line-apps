import Modal from 'libs/ui/src/components/modal';
import { FC } from 'react';
import { useProductStore } from '../../hooks/use-product-store';
import { EditProductForm } from '../forms/edit-product-form';
import { Product } from '@product-line/dexie';

export const EditProductModal: FC = () => {
  const { openEditModal, setOpenEditModal, currentProduct } = useProductStore();
  const product = currentProduct as Product;

  return (
    <Modal
      isOpen={openEditModal}
      setIsOpen={setOpenEditModal}
      hideButtons
      closeable
      className="w-full md:w-1/2"
      text={{
        title: `Editar ${product?.title || 'Producto'}`,
      }}
    >
      {product?.id ? <EditProductForm productId={product.id} /> : null}
    </Modal>
  );
};

export default EditProductModal;
