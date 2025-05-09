import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ForgotPassword from "../Pages/ForgotPassword";
import Home from "../Pages/Home";
import AccessLayout from "../Layout/AccessLayout";
import ShoppingLayout from "../Layout/ShopingLayout";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import ProtectedRoute from "../ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ShoppingLayout />}>
        <Route index element={<Home />} />
        <Route path=":productId" element={<ProductDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="cart" element={<Cart />} />
        </Route>
      </Route>

      <Route path="/" element={<AccessLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
