import React from 'react';
import { getNewProducts, getBestSellers } from '../../data/products';
import { infoCards } from '../../data/home';
import { categories } from '../../data/categories';
import CategoriesSection from '../home/sections/CategoriesSection';
import ProductsSection from '../home/sections/ProductsSection';
import FeaturesSection from '../home/sections/FeaturesSection';
import MenuSection from '../home/sections/MenuSection';

export const HomePage = () => {
  const newProducts = getNewProducts();
  const bestSellers = getBestSellers();

  return (
    <div className="">
      <MenuSection />
      <CategoriesSection
        categories={categories}
        bgClass="pattern-wavy shadow-lg pattern-gray-50 dark:pattern-gray-800 pattern-bg-white dark:pattern-bg-black pattern-size-7 pattern-opacity-100"
      />
      <ProductsSection
        title="Novedades"
        products={newProducts}
        bgClass="bg-slate-50 dark:bg-black"
      />
      <ProductsSection
        title="Los más vendidos"
        products={bestSellers}
        showStar={true}
        bgClass="pattern-wavy pattern-gray-50 dark:pattern-gray-800 pattern-bg-white dark:pattern-bg-black pattern-size-7 pattern-opacity-100 shadow-lg"
      />
      <FeaturesSection
        infoCards={infoCards}
        bgClass="bg-gray-50 dark:bg-black"
      />
    </div>
  );
};
