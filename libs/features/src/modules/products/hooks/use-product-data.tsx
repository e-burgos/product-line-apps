/* eslint-disable @typescript-eslint/no-explicit-any */
import { useToastStore } from '@product-line/ui';
import { formatCurrency } from 'libs/features/src/utils/utils';
import * as XLSX from 'xlsx';
import { useProductMethods } from '@product-line/dexie';

export const useProductData = () => {
  const { addToast } = useToastStore();
  const { products, getCategoryByProductId, getSubCategoryByProductId } =
    useProductMethods();

  const exportToExcel = () => {
    const data: any[] = [];
    if (!products) return;

    products.forEach((product) => {
      data.push({
        Producto: product.title,
        Descripción: product.description,
        Categoría: getCategoryByProductId(product?.id as string)?.title,
        Subcategoría: getSubCategoryByProductId(product?.id as string)?.title,
        'Precio Unitario': formatCurrency(product.amount),
        Stock: product.stock,
        Estado: product.status,
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
    XLSX.writeFile(workbook, 'productos.xlsx');
  };

  const exportOneProductToExcel = (productId: string) => {
    if (!productId) return;
    const product = products?.find((p) => p.id === productId);
    if (!product) return;

    const data: any[] = [];
    data.push({
      Producto: product.title,
      Descripción: product.description,
      Categoría: getCategoryByProductId(product?.id as string)?.title,
      Subcategoría: getSubCategoryByProductId(product?.id as string)?.title,
      'Precio Unitario': formatCurrency(product.amount),
      Stock: product.stock,
      Estado: product.status,
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      `Producto ${product.title}`
    );
    XLSX.writeFile(workbook, `producto-${product.title}.xlsx`);
  };

  const shareData = async () => {
    if (!products) return;

    const shareText = products
      .map(
        (product) =>
          `${product.title}\n${
            product.description
          }\nPrecio: ${new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
          }).format(product.amount || 0)}\nStock: ${product.stock}\nEstado: ${
            product.status
          }\n\n`
      )
      .join('---\n\n');

    try {
      await navigator.share({
        title: 'Lista de Productos',
        text: shareText,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        id: 'share-error',
        variant: 'destructive',
        title: 'Error',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    }
  };

  const shareOneProduct = async (productId: number | undefined) => {
    if (!products) return;
    const product = products?.find((p) => p.id === productId);
    if (!product) return;

    const shareText = `Nombre: ${product.title}\nDescripción: ${
      product.description
    }\nCategoría: ${
      getCategoryByProductId(product?.id as string)?.title
    }\nSubcategoría: ${
      getSubCategoryByProductId(product?.id as string)?.title
    }\nPrecio: ${formatCurrency(product.amount)}\nStock: ${
      product.stock
    }\nEstado: ${product.status}\n\n`;

    try {
      await navigator.share({
        title: `Producto ${product.title}`,
        text: shareText,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      addToast({
        id: 'share-error',
        variant: 'destructive',
        title: 'Error',
        message:
          'No se pudo compartir. Intenta copiar el contenido manualmente.',
      });
    }
  };

  return {
    products,
    exportToExcel,
    exportOneProductToExcel,
    shareData,
    shareOneProduct,
  };
};

export default useProductData;
