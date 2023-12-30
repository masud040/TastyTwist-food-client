import { useState } from "react";
import categories from "../../../data/Category.json";
import { FaSearch } from "react-icons/fa";
import InputModal from "../../Modal/InputModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import queryString from "query-string";

const Categories = ({ email, currentCategory }) => {
  let [isOpen, setIsOpen] = useState(false);
  const [params] = useSearchParams();
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
        className="flex items-center mt-8 bg-gray-50 rounded-xl
   text-dark-gray px-4 overflow-x-auto "
      >
        <button
          onClick={() => setIsOpen(true)}
          className="text-lg hover:bg-pink-50 rounded-lg text-center  transition-all delay-200 px-2 py-4"
        >
          <FaSearch />
        </button>

        <div
          className="grid grid-cols-6  overflow-x-auto flex-1 gap-[70px] md:gap-4 bg-gray-50 rounded-xl
   text-dark-gray px-4"
        >
          {categories?.map((category, index) => (
            <button
              onClick={() => handleSetQuery(category.label)}
              className={`${
                currentCategory === category?.label.toLowerCase()
                  ? "font-semibold text-sm lg:text-lg hover:bg-pink-50 rounded-lg text-center w-16 md:w-full p-2 transition-all  border-b-4 border-primary"
                  : "font-semibold hover:bg-pink-50 text-center  p-2 rounded-lg transition-all w-16 md:w-full  border-b-4 text-sm lg:text-lg border-gray-400"
              }`}
              key={index}
            >
              {category?.label}
            </button>
          ))}
        </div>
      </div>
      <InputModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Categories;
