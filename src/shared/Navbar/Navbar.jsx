import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import MenuDropDown from "../../components/MenuDropDown/MenuDropDown";
import useAuth from "../../hooks/useAuth";

import { FaRegHeart } from "react-icons/fa";
import CartSidebar from "../../components/Sidebar/CartSidebar";
import FavoriteSidebar from "../../components/Sidebar/FavoriteSidebar";
import useGetCartItem from "../../hooks/useGetCartItem";

const navLinks = [
  {
    name: "Home",
    pathName: "/",
  },
  {
    name: "Restaurants",
    pathName: "/restaurants",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(true);
  const [showFavorite, setShowFavorite] = useState(true);
  const [carts] = useGetCartItem();

  const { user } = useAuth();
  const handleCartShow = () => {
    setShowCart(!showCart);
    setShowFavorite(true);
    setIsOpen(false);
  };
  const handleFavoriteShow = () => {
    setShowFavorite(!showFavorite);
    setShowCart(true);
    setIsOpen(false);
  };
  const handleShowMenu = () => {
    setIsOpen(!isOpen);
    setShowFavorite(true);
    setShowCart(true);
  };
  return (
    <>
      <div className="fixed z-50 items-center justify-between w-full px-3 py-2 bg-gray-300 md:flex drop-shadow-2xl bg-opacity-60 ">
        <Link to="/" className="hidden text-xl font-bold md:block text-primary">
          Tasty Twist
        </Link>

        <div className="flex items-center gap-5 font-semibold justify-evenly">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.pathName}
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "bg-rose-50 rounded-md border-b-4 border-primary"
                  : ""
              }
            >
              <button className="px-2 text-primary">{link?.name}</button>
            </NavLink>
          ))}
          <button
            onClick={handleFavoriteShow}
            className="text-2xl rounded-md bg-rose-50 text-primary"
          >
            <FaRegHeart />
          </button>

          <button
            onClick={handleCartShow}
            className="relative text-2xl rounded-md bg-rose-50 text-primary"
          >
            <FaShoppingCart />
            <p className="text-xs font-normal absolute -top-1.5 -right-2 text-white bg-green-500/80 h-[15px] w-[15px] rounded-full">
              {(carts && carts?.length) || 0}
            </p>
          </button>

          <div className="relative">
            <div className="border border-primary/[30%]  rounded-full hover:border-primary transition duration-500  p-1">
              <img
                onClick={handleShowMenu}
                src={user ? user.photoURL : placeholder}
                className="w-8 h-8 rounded-full "
                alt=""
              />
            </div>

            <MenuDropDown isOpen={isOpen} />
          </div>
        </div>
      </div>
      <CartSidebar showCart={showCart} setShowCart={setShowCart} />
      <FavoriteSidebar showFavorite={showFavorite} />
    </>
  );
};
export default Navbar;
