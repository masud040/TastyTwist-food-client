import { useState } from "react";
import { useForm } from "react-hook-form";
import useGetAllDivision from "../../hooks/useGetAllDivision";
import ToggleBtn from "../../components/Button/ToggleBtn";

const AddressBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [place, setPlace] = useState("");
  const [division, setDivision] = useState("");
  const [divisions, refetch] = useGetAllDivision();
  // const {data:city} =
  const toggleHandler = (e) => {
    if (e.target.checked) {
      setPlace("Office");
    } else {
      setPlace("Home");
    }
  };
  const handleDivision = (e) => {
    setDivision(e.target.value);
  };
  const handleAddAddress = (data) => console.log(data);
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
            <ToggleBtn toggleHandler={toggleHandler} />
          </div>
        </div>
        <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Please choose our city</label>
            <select
              disabled={!division && true}
              {...register("city")}
              className={`border w-full p-1.5 rounded-md focus:outline-none text-gray-700 text-sm bg-gray-200 ${
                !division && "cursor-not-allowed"
              }`}
              defaultValue="default"
            >
              <option disabled className="hidden" value="default">
                Please choose your city
              </option>
              {divisions?.map((division) => (
                <option key={division._id} value={division.division}>
                  {division.division}
                </option>
              ))}
            </select>

            {errors.city && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
          <div className="flex-1 relative">
            <label className="text-xs mb-1 block">Area</label>
            <select
              {...register("city")}
              className="border w-full p-1.5 rounded-md focus:outline-none text-gray-700 text-sm bg-gray-200"
              defaultValue="default"
            >
              <option disabled className="hidden" value="default">
                Please choose your area
              </option>
              {divisions?.map((division) => (
                <option key={division._id} value={division.division}>
                  {division.division}
                </option>
              ))}
            </select>

            {errors.area && (
              <p className="text-primary text-xs absolute">
                You can not leave this empty.
              </p>
            )}
          </div>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddressBook;
