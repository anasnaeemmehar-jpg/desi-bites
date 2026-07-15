import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import AppRoutes from './routes.jsx';
import { CartProvider } from './context/CartContext.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
