import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import FoodDetails from './pages/FoodDetails.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import TrackOrder from './pages/TrackOrder.jsx';
import NotFound from './pages/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/food/:slug" element={<FoodDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/track-order" element={<TrackOrder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
