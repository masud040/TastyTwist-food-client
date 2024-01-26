import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon, handleToggle }) => {
  return (
    <NavLink
      to={address}
      onClick={handleToggle}
      className={({ isActive }) =>
        `flex items-center px-4 py-1 my-5  transition-colors duration-300 transform text-gray-700 text-sm hover:bg-gray-300   hover:text-gray-800 ${
          isActive ? "bg-gray-300 text-gray-800" : ""
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
