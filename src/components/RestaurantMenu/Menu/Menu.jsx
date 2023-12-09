import { useSearchParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import Select from "react-select";
import MenuCard from "../../Card/MenuCard";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];

const Menu = ({ email }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [params, setParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const category = params.get("category");
  const { data: menu } = useQuery({
    queryKey: ["menu", email, category],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/menu/${email}?category=${category ? category : "popular"}`
      );
      return data;
    },
  });

  return (
    <div className="grid grid-cols-5 gap-6  mt-6">
      <div className="hidden md:block min-h-[30px] col-span-1 text-dark-gray ">
        <h1 className="text-xl font-semibold  mb-4">Filter</h1>
        <h4 className="lg font-bold">Price</h4>
        <Select
          defaultValue={selectedOption}
          onChange={(e) => setSelectedOption(e.value)}
          options={options}
        />
      </div>
      <div className=" min-h-[200px] col-span-5 md:col-span-4 space-y-4 lg:space-y-0 lg:grid grid-cols-2   gap-6">
        {menu?.map((item) => (
          <MenuCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Menu;
