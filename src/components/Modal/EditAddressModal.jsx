import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetAddress from "../../hooks/useGetAddress";
import useGetAllDivision from "../../hooks/useGetAllDivision";
import CloseModal from "../Button/CloseModal";
import ToggleBtn from "../Button/ToggleBtn";
const EditAddressModal = ({ isOpen, closeEditModal, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [userAddress, refetch] = useGetAddress();
  const [divisions] = useGetAllDivision();
  const [divisionName, setDivisionName] = useState("");
  const placeRef = useRef();
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    name,
    address,
    mobile,
    landmark,
    division,
    place,
    city: district,
    area: upazilla,
  } = userAddress || {};
  const [checkData, setCheckData] = useState({
    fullName: name,
    mobile: mobile,
    address: address,
  });

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

  const selectedPlace = place === "Home" ? false : true;
  const area = city?.find((data) => data.district === cityName)?.upazilla;
  useEffect(() => {
    setDivisionName(division);
    setCityName(district);
    setAreaName(upazilla);
  }, [district, division, upazilla]);
  const isDisable = Object.values(checkData).every((value) => value);

  // setIsDisable(!areAllFieldsValid);
  const handleDivision = (e) => {
    setDivisionName(e.target.value);
    setCityName("default");
    setAreaName("default");
  };

  const handleAddCity = (e) => {
    setCityName(e.target.value);
    setAreaName("default");
  };
  const handleAddArea = (e) => {
    setAreaName(e.target.value);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target?.value;

    setCheckData({
      ...checkData,
      [name]: value,
    });
  };

  const handleAddAddress = async (data) => {
    try {
      const address = {
        name: data.fullName,
        email: user?.email,
        address: data.address,
        mobile: data.mobile,
        landmark: data?.landmark || "N/A",
        division: data.division,
        place: placeRef.current?.checked ? "Office" : "Home",
        city: data.city,
        area: data.area,
      };
      const { data: details } = await axiosSecure.put(
        `/address/${user?.email}`,
        address
      );
      refetch();
      if (details.modifiedCount > 0) {
        toast.success("Address updated successfully");
        closeEditModal(false);
        closeModal(false);
      }
      setDivisionName("default");
      setCityName("default");
      setAreaName("default");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl ">
                <CloseModal onClose={closeEditModal} />

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  Edit Existing Address
                </Dialog.Title>

                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(handleAddAddress)}
                    className="space-y-5"
                  >
                    <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">Full Name</label>
                        <input
                          placeholder="Input full Name"
                          {...register("fullName", { required: true })}
                          className="input"
                          defaultValue={name}
                          name="fullName"
                          onChange={handleChange}
                        />

                        {errors.firstName && (
                          <p className="absolute text-xs text-primary">
                            You can not leave this empty.
                          </p>
                        )}
                      </div>
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">Address</label>
                        <input
                          placeholder="House no. / building / street / area"
                          {...register("address", { required: true })}
                          className="input"
                          defaultValue={address}
                          name="address"
                          onChange={handleChange}
                        />

                        {errors.address && (
                          <p className="absolute text-xs text-primary">
                            You can not leave this empty.
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0 ">
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">
                          Mobile Number
                        </label>
                        <input
                          placeholder="Input mobile number"
                          type="number"
                          {...register("mobile", { required: true })}
                          className="input"
                          defaultValue={mobile}
                          name="mobile"
                          onChange={handleChange}
                        />

                        {errors.mobileNumber && (
                          <p className="absolute text-xs text-primary">
                            You can not leave this empty.
                          </p>
                        )}
                      </div>
                      <div className="flex-1 ">
                        <label className="block mb-1 text-xs">
                          Landmark(Optional)
                        </label>
                        <input
                          placeholder="E.g. beside train station"
                          {...register("landmark")}
                          className="input"
                          defaultValue={landmark}
                        />
                      </div>
                    </div>
                    <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0 ">
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">Province</label>
                        <select
                          {...register("division")}
                          className="bg-gray-200 input "
                          value={divisionName}
                          onChange={handleDivision}
                        >
                          <option disabled className="hidden" value="default">
                            Please choose your province
                          </option>
                          {divisions?.map((division) => (
                            <option
                              key={division._id}
                              value={division.division}
                            >
                              {division.division}
                            </option>
                          ))}
                        </select>

                        {errors.division && (
                          <p className="absolute text-xs text-primary">
                            You can not leave this empty.
                          </p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block mb-1 text-xs">
                          Select a label for effective delivery
                        </label>
                        <ToggleBtn
                          placeRef={placeRef}
                          selectedPlace={selectedPlace}
                        />
                      </div>
                    </div>
                    <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0 ">
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">
                          Please choose our city
                        </label>
                        <select
                          disabled={!divisionName || divisionName === "default"}
                          {...register("city")}
                          className="bg-gray-200 input disabled:cursor-not-allowed"
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
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">Area</label>
                        <select
                          disabled={!cityName || cityName === "default"}
                          {...register("area")}
                          className="bg-gray-200 input disabled:cursor-not-allowed"
                          value={areaName || "default"}
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
                      value="Update"
                      disabled={
                        !isDisable || !areaName || areaName === "default"
                      }
                      className="btn"
                    />
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditAddressModal;
