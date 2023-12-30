import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Restaurants from "../pages/Restaurants/Restaurants";

import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import RestaurantMenu from "../pages/RestaurantMenu/RestaurantMenu";
import PrivateRoute from "./PrivateRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import Orders from "../pages/User/Orders";
import AddressBook from "../pages/User/AddressBook";
import ManageMenu from "../pages/Seller/ManageMenu";

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
        path: "manage-menu",
        element: (
          <PrivateRoute>
            <ManageMenu />
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
