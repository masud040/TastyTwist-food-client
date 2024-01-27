import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Restaurants from "../pages/Restaurants/Restaurants";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import RestaurantMenu from "../pages/RestaurantMenu/RestaurantMenu";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import Analytics from "../pages/Admin/Analytics";
import CustomerSupport from "../pages/Admin/CustomerSupport";
import ManageCoupon from "../pages/Admin/ManageCoupon";
import ManageRestaurant from "../pages/Admin/ManageRestaurant";
import ManageUsers from "../pages/Admin/MangeUsers";
import Checkout from "../pages/Checkout/Checkout";
import ConfirmOrder from "../pages/Confirmation/ConfirmOrder";
import Profile from "../pages/Profile/Profile";
import CustomerFeedback from "../pages/Seller/CustomerFeedback";
import ManageMenu from "../pages/Seller/ManageMenu";
import ManageOrder from "../pages/Seller/ManageOrder";
import AddressBook from "../pages/User/AddressBook";
import Orders from "../pages/User/Orders";
import PaymentHistory from "../pages/User/PaymentHistory";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "restaurants",
        element: <Restaurants />,
      },

      {
        path: "restaurant-menu/:email",
        element: (
          <PrivateRoute>
            <RestaurantMenu />
          </PrivateRoute>
        ),
      },
      {
        path: "check-out",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      {
        path: "confirm-order/:orderId",
        element: (
          <PrivateRoute>
            <ConfirmOrder />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <Orders />
          </PrivateRoute>
        ),
      },
      {
        path: "address-book",
        element: (
          <PrivateRoute>
            <AddressBook />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "all-payment-history",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <PaymentHistory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "customer-feedback",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <CustomerFeedback />
            </SellerRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "manage-menu",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageMenu />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageOrder />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/analytics",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-restaurant",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRestaurant />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/manage-coupons",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCoupon />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/customer-support",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <CustomerSupport />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/seller-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);
export default router;
