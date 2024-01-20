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
import Checkout from "../pages/Checkout/Checkout";
import ConfirmOrder from "../pages/Confirmation/ConfirmOrder";
import Profile from "../pages/Profile/Profile";
import ManageCoupon from "../pages/Seller/ManageCoupon";
import ManageMenu from "../pages/Seller/ManageMenu";
import ManageOrder from "../pages/Seller/ManageOrder";
import AddressBook from "../pages/User/AddressBook";
import Orders from "../pages/User/Orders";
import PaymentHistory from "../pages/User/PaymentHistory";

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
        path: "manage-menu",
        element: (
          <PrivateRoute>
            <ManageMenu />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-order",
        element: (
          <PrivateRoute>
            <ManageOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivateRoute>
            <ManageCoupon />
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
