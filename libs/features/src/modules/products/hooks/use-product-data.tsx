/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useToastStore } from '@product-line/ui';
import { db, Products } from 'libs/features/src/data/product-db';
import { formatCurrency } from 'libs/features/src/utils/utils';
import { useLiveQuery } from 'dexie-react-hooks';
import * as XLSX from 'xlsx';

export const useProductData = () => {
  const { addToast } = useToastStore();

  const products: Products = useLiveQuery(async () => {
    const products = await db.products.toArray();
    const productsWithVariants = await Promise.all(
      products.map(async (product) => {
        const variants = await db.variants
          .where('productId')
          .equals(product.id!)
          .toArray();
        const totalAmount = variants?.length;
        return {
          ...product,
          variants,
          totalAmount,
        };
      })
    );
    return productsWithVariants;
  });

  const variants = useLiveQuery(() => db.variants.toArray());

  const getProductVariants = (productId: number | undefined) =>
    variants?.filter((v) => v.productId === productId) || [];

  const exportToExcel = () => {
    const data: any[] = [];
    if (!products) return;

    products.forEach((product) => {
      data.push({
        Producto: product.title,
        Descripción: product.description,
        Variantes: product.totalAmount,
      });

      getProductVariants(product.id).forEach((variant) => {
        data.push({
          Producto: '',
          Descripción: '',
          Variantes: '',
          'Nombre Variante': variant.title,
          'Descripción Variante': variant.description,
          'Precio Variante': formatCurrency(variant.amount),
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
    XLSX.writeFile(workbook, 'productos.xlsx');
  };

  const exportOneProductToExcel = (productId: number | undefined) => {
    if (!productId) return;
    const product = products?.find((p) => p.id === productId);
    if (!product) return;

    const data: any[] = [];
    data.push({
      Producto: product.title,
      Descripción: product.description,
      Variantes: product.totalAmount,
    });

    getProductVariants(product.id).forEach((variant) => {
      data.push({
        Producto: '',
        Descripción: '',
        Variantes: '',
        'Nombre Variante': variant.title,
        'Descripción Variante': variant.description,
        'Precio Variante': formatCurrency(variant.amount),
      });
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
          }\nTotal: ${new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
          }).format(
            product.totalAmount || 0
          )}\n\nVariantes:\n${getProductVariants(product.id)
            ?.map((v) => `- ${v.title}: ${formatCurrency(v.amount)}`)
            .join('\n')}\n\n`
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
    }\nVariantes: ${
      product.totalAmount || 0
    }\n\nVariantes:\n${getProductVariants(product.id)
      ?.map((v) => `- ${v.title}: ${formatCurrency(v.amount)}`)
      .join('\n')}\n\n`;

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
