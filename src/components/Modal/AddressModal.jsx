import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetAllDivision from "../../hooks/useGetAllDivision";
import CloseModal from "../Button/CloseModal";
import ToggleBtn from "../Button/ToggleBtn";
const AddressModal = ({ isOpen, closeModal, refetch }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [divisions] = useGetAllDivision();
  const [divisionName, setDivisionName] = useState("");
  const placeRef = useRef();
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  const handleAddAddress = async (data) => {
    const toastId = toast.loading("Address Adding...");
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
    const { data: details } = await axiosSecure.post("/address", address);
    if (details.insertedId) {
      toast.success("Address added successfully", {
        id: toastId,
      });
      closeModal(false);
      refetch();
      navigate(state && state);
    }
    setDivisionName("default");
    setCityName("default");
    setAreaName("default");

    reset();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Add Address
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={handleSubmit(handleAddAddress)}
                    className="space-y-5"
                  >
                    <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Full Name</label>
                        <input
                          placeholder="Input full Name"
                          {...register("fullName", { required: true })}
                          className="input"
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
                          className="input"
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
                        <label className="text-xs mb-1 block">
                          Mobile Number
                        </label>
                        <input
                          placeholder="Enter mobile number"
                          type="number"
                          {...register("mobile", { required: true })}
                          className="input"
                        />

                        {errors.mobileNumber && (
                          <p className="text-primary text-xs absolute">
                            You can not leave this empty.
                          </p>
                        )}
                      </div>
                      <div className="flex-1 ">
                        <label className="text-xs mb-1 block">
                          Landmark(Optional)
                        </label>
                        <input
                          placeholder="E.g. beside train station"
                          {...register("landmark")}
                          className="input"
                        />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">Province</label>
                        <select
                          {...register("division")}
                          className="input bg-gray-200"
                          defaultValue="default"
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
                          <p className="text-primary text-xs absolute">
                            You can not leave this empty.
                          </p>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="text-xs mb-1 block">
                          Select a label for effective delivery
                        </label>
                        <ToggleBtn placeRef={placeRef} />
                      </div>
                    </div>
                    <div className="md:flex space-y-6 md:space-y-0 justify-between gap-8 items-center ">
                      <div className="flex-1 relative">
                        <label className="text-xs mb-1 block">
                          Please choose our city
                        </label>
                        <select
                          disabled={!divisionName || divisionName === "default"}
                          {...register("city")}
                          className="input bg-gray-200 disabled:cursor-not-allowed"
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
                          disabled={!cityName || cityName === "default"}
                          {...register("area")}
                          className="input bg-gray-200 disabled:cursor-not-allowed"
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
                      value="Save"
                      disabled={!areaName || areaName === "default"}
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

export default AddressModal;
