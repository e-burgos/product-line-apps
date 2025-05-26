import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import { useEffect } from 'react';
import { getProducts, getProductsByCategory } from '../data/products';

export const useProductApi = () => {
  const { category } = useParams<{ category?: string }>();
  const {
    products,
    selectedBrands,
    priceRange,
    sortBy,
    searchQuery,
    brands,
    setProducts,
    setBrands,
    setPriceRange,
    setFilteredProducts,
    setSelectedBrands,
    setSortBy,
    setSearchQuery,
  } = useProductStore();

  useEffect(() => {
    // Initialize products
    const loadedProducts = category
      ? getProductsByCategory(category)
      : getProducts();
    setProducts(getProducts());

    // Extract unique brands
    const uniqueBrands = Array.from(
      new Set(loadedProducts.map((product) => product.brand))
    );
    setBrands(uniqueBrands);

    // Set minimum and maximum price
    if (loadedProducts.length > 0) {
      const prices = loadedProducts.map(
        (product) => product.discountPrice || product.price
      );
      const minPrice = Math.floor(Math.min(...prices));
      const maxPrice = Math.ceil(Math.max(...prices));
      setPriceRange([minPrice, maxPrice]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    // Apply filters and sorting
    let result = [...products];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        (product.discountPrice || product.price) >= priceRange[0] &&
        (product.discountPrice || product.price) <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort(
          (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price)
        );
        break;
      case 'price-high':
        result.sort(
          (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price)
        );
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default: // 'featured' - no change the original order
        break;
    }

    setFilteredProducts(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, selectedBrands, sortBy, searchQuery, priceRange]);

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    const [min, max] = priceRange;

    if (event.target.name === 'minPrice') {
      setPriceRange([Math.min(value, max), max]);
    } else {
      setPriceRange([min, Math.max(value, min)]);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return {
    category,
    products,
    selectedBrands,
    priceRange,
    sortBy,
    searchQuery,
    brands,
    handleBrandChange,
    handleSortChange,
    formatPrice,
    handlePriceRangeChange,
    handleSearchChange,
  };
};
