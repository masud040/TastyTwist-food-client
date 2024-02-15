import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import useGetMenuByUser from "../../../hooks/useGetMenuByUser";
import MenuCard from "../../Card/MenuCard";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];

const Menu = ({ email }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [category, setCategory] = useState("");
  const [params] = useSearchParams();
  const { restaurantMenu } = useGetMenuByUser(email, category);
  useEffect(() => {
    setCategory(params.get("category"));
  }, [params]);
  return (
    <>
      <div className="grid grid-cols-5 gap-6  mt-6">
        <div className="hidden md:block min-h-[30px] col-span-1 text-dark-gray ">
          <h1 className="text-xl font-semibold  mb-4">Filter</h1>
          <p className="lg font-bold">Price</p>
          <Select
            defaultValue={selectedOption}
            onChange={(e) => setSelectedOption(e.value)}
            options={options}
          />
        </div>
        <div className=" min-h-[200px] col-span-5 md:col-span-4 space-y-4 lg:space-y-0 lg:grid grid-cols-2   gap-6">
          {restaurantMenu?.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
