import { Link, NavLink } from "react-router-dom";

const navLinks = [
  {
    name: "Home",
    pathName: "/",
  },
  {
    name: "Restaurants",
    pathName: "/restaurants",
  },
  {
    name: "Carts",
    pathName: "/carts",
  },
  {
    name: "Login",
    pathName: "/signIn",
  },
];

function Navbar() {
  return (
    <div className="flex justify-between py-4 drop-shadow-2xl px-3 items-center fixed z-10 w-full  bg-white bg-opacity-70 ">
      <Link to="/" className="text-xl font-bold text-primary">
        TastyTwistOnline
      </Link>

      <div className="flex gap-6 font-semibold">
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
      </div>
    </div>
  );
}
export default Navbar;
