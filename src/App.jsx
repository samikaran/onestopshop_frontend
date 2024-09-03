import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Route, Routes, BrowserRouter as Router } from "react-router-dom"; // Importing necessary components from 'react-router-dom' for routing.
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import MainWrapper from "./routes/MainWrapper";
import PrivateRoute from "./routes/PrivateRoute";
import { CartContext } from "./components/plugin/Context";
import UserData from "./components/plugin/UserData";
import CartID from "./components/plugin/cartID";
import apiInstance from "./utils/axios";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Logout from "./pages/auth/Logout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreatePassword from "./pages/auth/CreatePassword";
import ProductDetails from "./pages/ecommerce/ProductDetails";
import Products from "./pages/ecommerce/Products";
import Cart from "./pages/ecommerce/Cart";
import Checkout from "./pages/ecommerce/Checkout";
import PaymentSuccess from "./pages/ecommerce/PaymentSuccess";
import Search from "./pages/ecommerce/Search";
import Invoice from "./pages/ecommerce/Invoice";
import Account from "./pages/customer/Account";
import Orders from "./pages/customer/Orders";
import Wishlist from "./pages/customer/Wishlist";
import Notifications from "./pages/customer/Notifications";
import OrderDetail from "./pages/customer/OrderDetail";
import Settings from "./pages/customer/Settings";
import Dashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorOrders from "./pages/vendor/VendorOrders";
import VendorOrderDetail from "./pages/vendor/VendorOrderDetail";
import Earning from "./pages/vendor/Earning";
import Reviews from "./pages/vendor/Reviews";
import ReviewDetail from "./pages/vendor/ReviewDetail";
import Coupon from "./pages/vendor/Coupon";
import EditCoupon from "./pages/vendor/EditCoupon";
import VendorNotification from "./pages/vendor/VendorNotification";
import VendorSettings from "./pages/vendor/VendorSettings";
import Shop from "./pages/vendor/Shop";
import AddProduct from "./pages/vendor/AddProduct";
import UpdateProduct from "./pages/vendor/UpdateProduct";
import VendorRegister from "./pages/vendor/VendorRegister";

function App() {
  const [cartCount, setCartCount] = useState();
  const userData = UserData();
  let cart_id = CartID();
  const axios = apiInstance;

  useEffect(() => {
    const url = userData?.user_id
      ? `cart-list/${cart_id}/${userData?.user_id}/`
      : `cart-list/${cart_id}/`;
    axios.get(url).then((res) => {
      setCartCount(res.data.length);
    });
  }, []);

  return (
    <>
      <CartContext.Provider value={[cartCount, setCartCount]}>
        <Router>
        {/* <Router basename={"/frontend"}> */}
          <Header />
          <MainWrapper>
            <Routes>
              <Route path="*" element={<NotFound />} />
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Products />} />
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/create-new-password" element={<CreatePassword />} />

              {/* Ecommerce Routes */}
              <Route path="/products" element={<Products />} />
              <Route path="/product/:slug/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout/:order_oid" element={<Checkout />} />
              <Route
                path="/payment-success/:order_oid"
                element={<PaymentSuccess />}
              />
              <Route path="/invoice/:order_oid" element={<Invoice />} />
              <Route path="/search" element={<Search />} />

              {/* Customer Routes */}
              <Route path="/customer/account/" element={<PrivateRoute><Account /></PrivateRoute>} />
              <Route path="/customer/orders/" element={<PrivateRoute><Orders /></PrivateRoute>} />
              <Route path="/customer/order/detail/:order_oid/" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
              <Route path="/customer/wishlist/" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
              <Route path="/customer/notifications/" element={<PrivateRoute><Notifications /></PrivateRoute>} />
              <Route path="/customer/settings/" element={<PrivateRoute><Settings /></PrivateRoute>} />

              {/* Vendor Routes */}
              <Route path="/vendor/dashboard/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/vendor/products/" element={<PrivateRoute> <VendorProducts /></PrivateRoute>} />
              <Route path="/vendor/product/new/" element={<PrivateRoute> <AddProduct /></PrivateRoute>} />
              <Route path="/vendor/product/update/:pid/" element={<PrivateRoute> <UpdateProduct /></PrivateRoute>} />
              <Route path="/vendor/orders/" element={<PrivateRoute> <VendorOrders /></PrivateRoute>} />
              <Route path="/vendor/orders/:oid/" element={<PrivateRoute> <VendorOrderDetail /></PrivateRoute>} />
              <Route path="/vendor/earning/" element={<PrivateRoute> <Earning /></PrivateRoute>} />
              <Route path="/vendor/reviews/" element={<PrivateRoute> <Reviews /></PrivateRoute>} />
              <Route path="/vendor/reviews/:id/" element={<PrivateRoute> <ReviewDetail /></PrivateRoute>} />
              <Route path="/vendor/coupon/" element={<PrivateRoute> <Coupon /></PrivateRoute>} />
              <Route path="/vendor/coupon/:id/" element={<PrivateRoute> <EditCoupon /></PrivateRoute>} />
              <Route path="/vendor/notifications/" element={<PrivateRoute> <VendorNotification /></PrivateRoute>} />
              <Route path="/vendor/settings/" element={<PrivateRoute> <VendorSettings /></PrivateRoute>} />
              <Route path="/vendor/:slug/" element={<Shop />} />
              <Route path="/vendor/register/" element={<VendorRegister />} />

            </Routes>
          </MainWrapper>
          <Footer />
          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </Router>
      </CartContext.Provider>
    </>
  );
}

export default App;
