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
  const [divisionId, setDivisionId] = useState("");
  const [divisionName, setDivisionName] = useState("");
  const placeRef = useRef();
  const [districtId, setDistrictId] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [areaName, setAreaName] = useState("");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [checkData, setCheckData] = useState({
    fullName: "",
    mobile: "",
    address: "",
  });

  const isDisable = Object.values(checkData).every((value) => value);
  // get cites from selected division
  const { data: cities } = useQuery({
    enabled: !loading && !!divisionId,
    queryKey: ["districts", divisionId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_bd_url}/district/${divisionId}`
      );
      return data?.data;
    },
  });
  // get all upazilas from the selected district
  const { data: upazilas } = useQuery({
    enabled: !loading && !!districtId,
    queryKey: ["upazilas", districtId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_bd_url}/upazilla/${districtId}`
      );
      return data?.data;
    },
  });

  const handleDivision = (e) => {
    if (e.target.value) {
      const divisionId = divisions.find(
        (division) => division?.name === e.target.value
      )?.id;

      setDivisionId(divisionId);
      setDivisionName(e.target.value);
      setDistrictName("default");
      setAreaName("default");
    }
  };

  const handleAddCity = (e) => {
    if (e.target.value) {
      const districtId = cities?.find(
        (city) => city.name === e.target.value
      )?.id;

      setDistrictId(districtId);
      setDistrictName(e.target.value);
      setAreaName("default");
    }
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
        navigate(state && state, { replace: true });
      }
      setDivisionId("default");
      setDistrictId("default");
      setAreaName("default");

      reset();
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
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  Add Address
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
                          placeholder="Input Full Name"
                          {...register("fullName", { required: true })}
                          className="input"
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
                          placeholder="Enter mobile number"
                          type="number"
                          {...register("mobile", { required: true })}
                          className="input"
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
                        />
                      </div>
                    </div>
                    <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0 ">
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">Province</label>
                        <select
                          {...register("division", { required: true })}
                          className="bg-gray-200 input"
                          defaultValue="default"
                          onChange={handleDivision}
                        >
                          <option disabled className="hidden" value="default">
                            Please choose your province
                          </option>
                          {divisions?.map((division) => (
                            <option key={division.id} value={division.name}>
                              {division.name}
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
                        <ToggleBtn placeRef={placeRef} />
                      </div>
                    </div>
                    <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0 ">
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">
                          Please choose our city
                        </label>
                        <select
                          disabled={!divisionName || divisionName === "default"}
                          {...register("city", { required: true })}
                          className="bg-gray-200 input disabled:cursor-not-allowed"
                          value={districtName || "default"}
                          onChange={handleAddCity}
                        >
                          <option disabled className="hidden" value="default">
                            Please choose your city
                          </option>
                          {cities?.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="relative flex-1">
                        <label className="block mb-1 text-xs">Area</label>
                        <select
                          disabled={!districtName || districtName === "default"}
                          {...register("area", { required: true })}
                          className="bg-gray-200 input disabled:cursor-not-allowed"
                          value={areaName || "default"}
                          onChange={handleAddArea}
                        >
                          <option disabled className="hidden" value="default">
                            Please choose your area
                          </option>
                          {upazilas?.map((upazila) => (
                            <option key={upazila.id} value={upazila.name}>
                              {upazila.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <input
                      type="submit"
                      value="Save"
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

export default AddressModal;
