import { Routes, Route } from 'react-router-dom';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import ForgotPassword from '../Pages/ForgotPassword';
import Home from '../Pages/Home';
import AccessLayout from '../Layout/AccessLayout';
import ShoppingLayout from '../Layout/ShopingLayout';
import ProductDetails from '../Pages/ProductDetails';
import ProductPreview from '../components/sections/ProductPreview';
import CartPage from '../components/sections/CartPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShoppingLayout />} >
        <Route index element={<Home />} />
        <Route path=":productId" element={<ProductDetails />} />
        <Route path="/c" element={<ProductPreview />} />
        <Route path="/cart" element={<CartPage />} />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
      </Route>
      <Route path="/" element={<AccessLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;