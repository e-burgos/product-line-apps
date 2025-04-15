import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../components/pages/HomePage';
import { ProductsPage } from '../components/pages/ProductsPage';
import { ProductDetailPage } from '../components/pages/ProductDetailPage';
import { CartPage } from '../components/pages/CartPage';
import { CheckoutPage } from '../components/pages/CheckoutPage';
import { OrderSuccessPage } from '../components/pages/OrderSuccessPage';
import { NotFoundPage } from '../components/pages/NotFoundPage';
import { Layout } from '../components/Layout';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/productos/:category" element={<ProductsPage />} />
        <Route path="/producto/:id" element={<ProductDetailPage />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/pedido-exitoso" element={<OrderSuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
