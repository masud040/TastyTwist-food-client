import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Select from "react-select";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MenuCard from "../../Card/MenuCard";
const options = [
  { value: "asc", label: "Low To High" },
  { value: "desc", label: "High to Low" },
];

const Menu = () => {
  const { email } = useParams();
  const [selectedOption, setSelectedOption] = useState("");
  const { loading } = useAuth();
  const [params] = useSearchParams();
  const category = params?.get("category");
  const axiosSecure = useAxiosSecure();
  const { data: restaurantMenu } = useQuery({
    enabled: !loading && !!email,
    queryKey: ["menu", email, category],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/menu/${email}?category=${category ? category : "popular"}&&order=asc`
      );
      return data;
    },
  });

  return (
    <>
      <div className="grid grid-cols-5 gap-6 mt-6">
        <div className="hidden md:block min-h-[30px] col-span-1 text-dark-gray ">
          <h1 className="mb-4 text-xl font-semibold">Filter</h1>
          <p className="font-bold lg">Price</p>
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
