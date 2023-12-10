import { Link, NavLink } from "react-router-dom";
import placeholder from "../../assets/placeholder.jpg";
import MenuDropDown from "../../components/MenuDropDown/MenuDropDown";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

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
  const { user } = useAuth();
  return (
    <div className="md:flex justify-between py-4 drop-shadow-2xl px-3 items-center fixed z-10 w-full  bg-white bg-opacity-70 ">
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
        {user && (
          <NavLink
            to="/carts"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "bg-rose-50 rounded-md border-b-4 border-primary"
                : ""
            }
          >
            <button className="px-2  text-primary">Carts</button>
          </NavLink>
        )}
        <div className="relative">
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={placeholder}
            className="w-8 h-8 rounded-full"
            alt=""
          />
          <MenuDropDown isOpen={isOpen} />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
