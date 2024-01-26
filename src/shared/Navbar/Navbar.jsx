import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import MenuDropDown from "../../components/MenuDropDown/MenuDropDown";
import useAuth from "../../hooks/useAuth";

import { FaRegHeart } from "react-icons/fa";
import CartSidebar from "../../components/Sidebar/CartSidebar";
import FavoriteSidebar from "../../components/Sidebar/FavoriteSidebar";

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
      <div className="md:flex justify-between py-2 drop-shadow-2xl px-3 items-center fixed z-10 w-full  bg-white bg-opacity-70 ">
        <Link to="/" className="hidden md:block text-xl font-bold text-primary">
          TastyTwistOnline
        </Link>

        <div className="flex items-center justify-evenly gap-5  font-semibold">
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
              <button className="px-2  text-primary">{link?.name}</button>
            </NavLink>
          ))}
          <button
            onClick={handleFavoriteShow}
            className="bg-rose-50 rounded-md text-primary text-2xl"
          >
            <FaRegHeart />
          </button>

          <button
            onClick={handleCartShow}
            className="bg-rose-50 rounded-md text-primary text-2xl"
          >
            <FaShoppingCart />
          </button>

          <div className="relative">
            <div className="border border-primary/[30%]  rounded-full hover:border-primary transition duration-500  p-1">
              <img
                onClick={handleShowMenu}
                src={user ? user.photoURL : placeholder}
                className="w-8 h-8  rounded-full "
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
