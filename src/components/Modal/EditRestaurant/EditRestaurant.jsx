import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetAllDivision from "../../../hooks/useGetAllDivision";
import { capitalizeFirstLetter } from "../../../utils/capitalizerFirstLetter";

import CloseModal from "../../Button/CloseModal";
import Greeting from "../../GreetingMessage/Greeting";

export default function AddRestaurantModal({
  isOpen,
  closeModal,
  restaurant,
  refetch,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    _id,
    cuisine,
    delivery_time,
    minimum_delivery_range,
    menu,
    location,
  } = restaurant || {};
  const [divisions] = useGetAllDivision();
  const [divisionName, setDivisionName] = useState("");
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [showGreeting, setShowGreeting] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    delivery_time: delivery_time,
    minimum_delivery_range: minimum_delivery_range,
    cuisine: cuisine,
    menu: menu,
    address: location?.address,
  });

  useEffect(() => {
    setDivisionName(location?.division);
    setCityName(location?.city);
    setAreaName(location?.area);
  }, [location]);

  const isDisable = Object.values(restaurantData).every((value) => value);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target?.value;
    setRestaurantData({
      ...restaurantData,
      [name]: value,
    });
  };

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
  const handleAddRestaurant = async (data) => {
    try {
      const restaurantDetails = {
        delivery_time: data.delivery_time,
        minimum_delivery_range: parseFloat(data.minimum_delivery_range),
        cuisine: capitalizeFirstLetter(data.cuisine),
        menu: data.menu.split(","),
        location: {
          address: data.address,
          division: data.division,
          city: data.city,
          area: data.area,
        },
      };

      const toastId = toast.loading("Restaurant Adding...");
      const { data: response } = await axiosSecure.patch(
        `/restaurants/${_id}`,
        restaurantDetails
      );

      if (response.modifiedCount > 0) {
        toast.success("Restaurant added successfully", {
          id: toastId,
        });
        setShowGreeting(true);
        setTimeout(() => {
          closeModal();
        }, 4000);
        refetch();

        setDivisionName("default");
        setCityName("default");
        setAreaName("default");
        reset();
      }
    } catch (err) {
      toast.error(err.message);
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
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative  ">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900 mb-3"
                >
                  Edit Your Restaurant
                </Dialog.Title>

                <div className="mt-6">
                  {!showGreeting && (
                    <form
                      className="space-y-5"
                      onSubmit={handleSubmit(handleAddRestaurant)}
                    >
                      <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">
                            Minimum Delivery Range
                          </label>
                          <input
                            type="number"
                            placeholder="Minimum Delivery Range"
                            {...register("minimum_delivery_range", {
                              required: true,
                            })}
                            className="input"
                            name="minimum_delivery_range"
                            value={restaurantData.minimum_delivery_range}
                            onChange={handleChange}
                          />

                          {errors.minimum_delivery_range && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">
                            Delivery Time
                          </label>
                          <input
                            placeholder="20 minutes"
                            {...register("delivery_time", { required: true })}
                            className="input"
                            name="delivery_time"
                            value={restaurantData.delivery_time}
                            onChange={handleChange}
                          />

                          {errors.delivery_time && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">Cuisine</label>
                          <input
                            placeholder="name of the cuisine"
                            {...register("cuisine", { required: true })}
                            className="input"
                            name="cuisine"
                            value={restaurantData.cuisine}
                            onChange={handleChange}
                          />

                          {errors.cuisine && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">
                            Menu name
                          </label>
                          <input
                            placeholder="like Sushi, Platter, Miso Soup, Tempura
                        "
                            {...register("menu", { required: true })}
                            className="input"
                            name="menu"
                            value={restaurantData.menu}
                            onChange={handleChange}
                          />

                          {errors.menu && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">
                            Select Division
                          </label>
                          <select
                            {...register("division", { required: true })}
                            className="input bg-gray-200"
                            value={divisionName}
                            onChange={handleDivision}
                          >
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
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">
                            Select City
                          </label>
                          <select
                            disabled={
                              !divisionName || divisionName === "default"
                            }
                            {...register("city", { required: true })}
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

                          {errors.city && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="md:flex justify-between gap-8 items-center space-y-6 md:space-y-0">
                        <div className="flex-1 relative">
                          <label className="text-xs mb-1 block">
                            Select Area
                          </label>
                          <select
                            disabled={!cityName || cityName === "default"}
                            {...register("area", { required: true })}
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

                          {errors.area && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="flex-1 pb-4 relative">
                          <label className="text-xs mb-1 block">Address</label>
                          <input
                            placeholder="Your restaurant address"
                            {...register("address", { required: true })}
                            className="input"
                            name="address"
                            value={location?.address}
                            onChange={handleChange}
                          />
                          {errors.address && (
                            <p className="text-primary text-xs absolute">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>

                      <input
                        disabled={
                          !isDisable || !areaName || areaName === "default"
                        }
                        type="submit"
                        value="Submit"
                        className="bg-primary px-12 py-1 rounded-md text-white disabled:bg-gray-400 "
                      />
                    </form>
                  )}
                  {showGreeting && (
                    <Greeting message="Your Restaurant Edit Successfully!" />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
