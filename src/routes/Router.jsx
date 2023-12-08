import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Restaurants from "../pages/Restaurants/Restaurants";
import Carts from "../pages/Carts/Carts";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Home/Home";
import RestaurantMenu from "../pages/RestaurantMenu/RestaurantMenu";

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
        path: "carts",
        element: <Carts />,
      },
      {
        path: "restaurant-menu/:email",
        element: <RestaurantMenu />,
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
