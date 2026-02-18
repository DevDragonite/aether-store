import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { PCDetail } from './pages/PCDetail';
import { ComponentsShop } from './pages/ComponentsShop';
import { BuildYourPC } from './pages/BuildYourPC';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/catalogo/:tier" element={<Catalog />} />
          <Route path="/pc/:id" element={<PCDetail />} />
          <Route path="/componentes" element={<ComponentsShop />} />
          <Route path="/componentes/:tipo" element={<ComponentsShop />} />
          <Route path="/arma-tu-pc" element={<BuildYourPC />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </Layout>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1a1a27',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            iconTheme: {
              primary: '#6366f1',
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
