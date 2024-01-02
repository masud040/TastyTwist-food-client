import { memo, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import useGetAllDivision from "../../hooks/useGetAllDivision";
import ToggleBtn from "../../components/Button/ToggleBtn";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useRef } from "react";

const AddressBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [divisionName, setDivisionName] = useState("");
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const place = useMemo(() => false, []);
  const [divisions] = useGetAllDivision();
  const { loading } = useAuth();
  const { data: city } = useQuery({
    enabled: !loading && !!divisionName,
    queryKey: ["city", divisionName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_bd_url}/division/${divisionName}`
      );
      return data?.data;
    },
  });

  const area = city?.find((data) => data.district === cityName)?.upazilla;

  const handleDivision = (e) => {
    setDivisionName(e.target.value);
  };
  const handleAddCity = (e) => {
    setCityName(e.target.value);
  };
  const handleAddArea = (e) => {
    setAreaName(e.target.value);
  };

  const handleAddAddress = (data) => {
    console.log(data);
    setDivisionName("default");

    reset();
  };
  return (
    <div className=" w-[95%] mx-auto">
      <p className="text-sm mb-6 ">Add New Delivery Address</p>

      <form onSubmit={handleSubmit(handleAddAddress)} className="space-y-5">
        <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Full Name</label>
            <input
              placeholder="Input full Name"
              {...register("firstName", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />

            {errors.firstName && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Address</label>
            <input
              placeholder="House no. / building / street / area"
              {...register("address", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />

            {errors.address && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
        </div>
        <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Mobile Number</label>
            <input
              placeholder="Input mobile number"
              type="number"
              {...register("mobileNumber", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />

            {errors.mobileNumber && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
          <div className="flex-1 ">
            <label className="text-xs mb-1 block">Landmark(Optional)</label>
            <input
              placeholder="E.g. beside train station"
              {...register("landmark", { required: true })}
              className="block border focus:outline-none  rounded-md p-1.5 w-full ps-3 text-sm"
            />
          </div>
        </div>
        <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Province</label>
            <select
              {...register("division")}
              className="border w-full p-1.5 rounded-md focus:outline-none text-gray-700 text-sm bg-gray-200"
              defaultValue="default"
              onChange={handleDivision}
            >
              <option disabled className="hidden" value="default">
                Please choose your province
              </option>
              {divisions?.map((division) => (
                <option key={division._id} value={division.division}>
                  {division.division}
                </option>
              ))}
            </select>

            {errors.division && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="text-xs mb-1 block">
              Select a label for effective delivery
            </label>
            <ToggleBtn place={place} register={register} />
          </div>
        </div>
        <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Please choose our city</label>
            <select
              disabled={!divisionName}
              {...register("city")}
              className={`border w-full p-1.5 rounded-md focus:outline-none text-gray-700 text-sm bg-gray-200 ${
                !divisionName && "cursor-not-allowed"
              }`}
              value={cityName || "default"}
              onChange={handleAddCity}
            >
              <option disabled className="hidden" value="default">
                Please choose your city
              </option>
              {city?.map((item) => (
                <option key={item._id} value={item.district}>
                  {item.district}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Area</label>
            <select
              disabled={!cityName}
              {...register("city")}
              className={`border w-full p-1.5 rounded-md focus:outline-none text-gray-700 text-sm bg-gray-200 ${
                !cityName && "cursor-not-allowed"
              }`}
              defaultValue={"default"}
              onChange={handleAddArea}
            >
              <option disabled className="hidden" value="default">
                Please choose your area
              </option>
              {area?.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="submit"
          value="Save"
          disabled={!areaName}
          className="bg-primary px-8 py-1 rounded-md text-white disabled:bg-gray-400"
        />
      </form>
    </div>
  );
};

export default AddressBook;
