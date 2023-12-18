import { useState } from "react";
import categories from "../../../data/Category.json";
import { FaSearch } from "react-icons/fa";
import InputModal from "../../Modal/InputModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";

const Categories = ({ email, currentCategory }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSetQuery = (label) => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updateQuery = { ...currentQuery, category: label.toLowerCase() };

    const url = queryString.stringifyUrl({
      url: "/",
      query: updateQuery,
    });
    navigate(`/restaurant-menu/${email}${url}`);
  };

  return (
    <>
      <div
        className="grid grid-cols-7  gap-4 overflow-x-scroll md:overflow-x-auto  mt-8 bg-gray-50 rounded-xl
  justify-between items-center text-dark-gray px-4"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="text-lg hover:bg-pink-50 rounded-lg text-center  transition-all delay-200 px-2 py-4"
        >
          <FaSearch />
        </button>
        {categories?.map((category, index) => (
          <p
            onClick={() => handleSetQuery(category.label)}
            className={`${
              currentCategory === category?.label.toLowerCase()
                ? "font-semibold text-sm lg:text-lg hover:bg-pink-50 rounded-lg text-center p-2 transition-all  border-b-4 border-primary"
                : "font-semibold hover:bg-pink-50 text-center  p-2 rounded-lg transition-all  border-b-4 text-sm lg:text-lg border-gray-400"
            }`}
            key={index}
          >
            {category?.label}
          </p>
        ))}
      </div>
      <InputModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Categories;
