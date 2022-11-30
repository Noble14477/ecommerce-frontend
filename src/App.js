import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import AdminEditProduct from "./pages/AdminEditProduct";
import Shop from "./pages/Shop";
import ViewProduct from "./pages/ViewProduct";
import Cart from "./pages/Cart";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<ViewProduct />} />

          {/* UserDashboard Route */}
          <Route element={<UserRoute />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
          </Route>
          {/* UserDashboard Route */}

          {/* AdminDashboard Route */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/edit/product/:productId"
              element={<AdminEditProduct />}
            />
          </Route>
          {/* AdminDashboard Route */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
