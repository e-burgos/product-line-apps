import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CardTitle, Input } from 'libs/ui/src/components';
import Button from 'libs/ui/src/components/button';
import InputLabel from 'libs/ui/src/components/input-label';
import Listbox, { ListboxOption } from 'libs/ui/src/components/list-box';
import { useBudgetStore } from '../hooks/use-budget-store';
import {
  Budget,
  Product,
  useBudgetMethods,
  useProductMethods,
} from '@product-line/dexie';
import { BudgetDetailsFormData } from './validations';
import { DollarSign } from 'lucide-react';
import { useProductStore } from '../../products/hooks/use-product-store';
import CreateProductModal from '../../products/components/modals/create-product-modal';

export const AddBudgetDetailsForm: FC<{ budget: Budget }> = ({ budget }) => {
  const { setOpenCreateDetailModal } = useBudgetStore();
  const { setOpenCreateModal: setOpenCreateProductModal } = useProductStore();
  const { addBudgetDetail, budgets } = useBudgetMethods();
  const { products, getProductById } = useProductMethods();
  const [selectedBudget, setSelectedBudget] = useState<ListboxOption>({
    name: budget.title,
    value: budget.id?.toString() || '',
  });
  const [selectedProduct, setSelectedProduct] = useState<ListboxOption>();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<BudgetDetailsFormData>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);

  const productId = watch('productId');
  const quantity = watch('quantity');
  const title = watch('title');
  const description = watch('description');
  const amount = watch('amount');
  const product = getProductById(productId);

  const isValidQuantity = (value: number): boolean => {
    return Number.isInteger(value) && value > 0;
  };

  async function onSubmit(values: BudgetDetailsFormData) {
    if (product) {
      const add = await addBudgetDetail({
        budgetId: budget.id as string,
        productId: product.id as string,
        title: title || product.title,
        description: description || product?.description,
        quantity: Number(values.quantity),
        amount:
          Number(amount) || Number(product?.amount) * Number(values.quantity),
        product: product,
      });
      if (add.isSuccess) {
        reset();
        setSelectedProduct(undefined);
        setOpenCreateDetailModal(false);
      }
    }
  }

  const budgetOptions: ListboxOption[] =
    budgets?.map((budget: Budget) => ({
      name: budget.title,
      value: budget.id?.toString() || '',
    })) || [];

  const productOptions: ListboxOption[] =
    products?.map((product: Product) => ({
      name: product.title,
      value: product.id?.toString() || '',
    })) || [];

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('amount', Number(product?.amount) * Number(quantity));
    }
  }, [product, setValue, quantity]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pr-4">
        <div>
          <InputLabel title={'Presupuestos'} />
          <Listbox
            disabled
            className="w-full"
            options={budgetOptions}
            selectedOption={selectedBudget}
            onChange={(e) => setSelectedBudget(e as ListboxOption)}
            onSelect={(value) => setValue('budgetId', value)}
          />
        </div>

        {products?.length !== 0 && (
          <div>
            <InputLabel title={'Productos'} />
            <Listbox
              className="w-full"
              options={productOptions}
              selectedOption={selectedProduct}
              onChange={(e) => setSelectedProduct(e as ListboxOption)}
              onSelect={(value) => setValue('productId', value)}
            />
          </div>
        )}

        {products?.length === 0 && (
          <p className="text-sm text-red-500">
            No se encontraron productos, por favor agrega un producto.
          </p>
        )}

        {product?.id && (
          <Input
            className="w-full mb-4"
            required
            label="Cantidad"
            id="quantity"
            type="number"
            step="1"
            error={errors?.quantity?.message}
            {...register('quantity', {
              required: 'La cantidad es obligatoria',
              pattern: {
                value: /^[0-9]+$/,
                message: 'La cantidad debe ser un número entero',
              },
            })}
          />
        )}

        {product?.id && quantity && isValidQuantity(Number(quantity)) && (
          <div className="flex gap-4 md:flex-row flex-col pt-4">
            <CardTitle title="Producto">
              <Input
                label="Nombre"
                className="w-full mb-4"
                value={product?.title}
                disabled
              />
              <Input
                label="Descripción"
                className="w-full mb-4"
                value={product?.description}
                disabled
              />
              <Input
                label="Monto Total"
                className="w-full mb-4"
                icon={<DollarSign className="h-4 w-4" />}
                value={`${Number(product?.amount) * Number(quantity)}`}
                disabled
              />
            </CardTitle>

            <CardTitle title="Personalizar">
              <Input
                required
                className="w-full mb-4"
                label="Detalle"
                id="title"
                error={errors?.title?.message}
                {...register('title', {
                  required: 'El título es obligatorio',
                })}
              />
              <Input
                className="w-full mb-4"
                label="Descripción Detalle"
                id="description"
                error={errors?.description?.message}
                {...register('description', {
                  required: 'La descripción es obligatoria',
                })}
              />
              <Input
                id="amount"
                label="Monto Total"
                type="number"
                step="0.01"
                placeholder="0.00"
                icon={<DollarSign className="h-4 w-4" />}
                {...register('amount', {
                  required: 'El precio es requerido',
                  pattern: {
                    value: /^[0-9]+[.,]?[0-9]*$/,
                    message: 'El precio debe ser un número válido',
                  },
                })}
                error={errors.amount?.message}
              />
            </CardTitle>
          </div>
        )}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            size="medium"
            shape="rounded"
            variant="ghost"
            onClick={() => setOpenCreateDetailModal(false)}
          >
            {'Cerrar'}
          </Button>
          {products?.length !== 0 && (
            <Button
              size="medium"
              shape="rounded"
              type="submit"
              disabled={
                !product?.id || !quantity || !isValidQuantity(Number(quantity))
              }
            >
              {'Guardar'}
            </Button>
          )}
          {products?.length === 0 && (
            <Button
              size="medium"
              shape="rounded"
              onClick={() => setOpenCreateProductModal(true)}
            >
              {'Agregar Producto'}
            </Button>
          )}
        </div>
      </form>
      <CreateProductModal />
    </>
  );
};
