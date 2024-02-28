import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { imageUpload } from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useGetAllDivision from "../../../hooks/useGetAllDivision";
import { capitalizeFirstLetter } from "../../../utils/capitalizerFirstLetter";

import CloseModal from "../../Button/CloseModal";
import Greeting from "../../GreetingMessage/Greeting";

export default function AddRestaurantModal({ isOpen, closeModal, refetch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [divisions] = useGetAllDivision();
  const [divisionName, setDivisionName] = useState("");
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [showGreeting, setShowGreeting] = useState(false);
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    image: "",
    delivery_fee: "",
    delivery_time: "",
    minimum_delivery_range: "",
    cuisine: "",
    email: "",
    mobile: "",
    menu: "",
    address: "",
    message: "",
  });

  const isDisable = Object.values(restaurantData).every((value) => value);

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target?.value;
    if (name === "image") {
      value = e.target.files[0].name;
    }
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
      const toastId = toast.loading("Restaurant Adding...");
      const { url } = await imageUpload(data?.image[0]);
      const restaurantDetails = {
        name: capitalizeFirstLetter(data.name),
        image_url: url,
        delivery_fee: parseFloat(data.delivery_fee),
        delivery_time: data.delivery_time,
        minimum_delivery_range: parseFloat(data.minimum_delivery_range),
        cuisine: capitalizeFirstLetter(data.cuisine),
        restaurantEmail: data.email,
        email: user?.email,
        mobile: data.mobile,
        menu: data.menu.split(","),
        rating: 4.5,
        message: data.message,
        location: {
          address: data.address,
          division: data.division,
          city: data.city,
          area: data.area,
        },
      };

      const { data: details } = await axiosSecure.post(
        `/requested/restaurants?email=${user?.email}`,
        restaurantDetails
      );
      if (details.insertedId) {
        toast.success("Restaurant added successfully", {
          id: toastId,
        });
        setShowGreeting(true);
        setTimeout(() => {
          closeModal();
        }, 3000);
        refetch();
      }
      setDivisionName("default");
      setCityName("default");
      setAreaName("default");

      reset();
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
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="mb-3 text-lg font-medium leading-6 text-center text-gray-900"
                >
                  Fill this form for your restaurant.
                </Dialog.Title>
                <p className="text-xs text-center text-gray-700">
                  We have accepted your request so you have been given a form.
                  Please add your restaurant information.
                </p>

                <div className="mt-6">
                  {!showGreeting && (
                    <form
                      className="space-y-5"
                      onSubmit={handleSubmit(handleAddRestaurant)}
                    >
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Restaurant Name
                          </label>
                          <input
                            placeholder="Restaurant Name"
                            {...register("name", { required: true })}
                            className="input"
                            name="name"
                            onChange={handleChange}
                          />

                          {errors.name && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Restaurant Image
                          </label>
                          <input
                            type="file"
                            {...register("image", { required: true })}
                            className="input"
                            name="image"
                            onChange={handleChange}
                          />

                          {errors.image && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Delivery Fee
                          </label>
                          <input
                            type="number"
                            placeholder="Delivery fee"
                            {...register("delivery_fee", { required: true })}
                            className="input"
                            name="delivery_fee"
                            onChange={handleChange}
                          />

                          {errors.delivery_fee && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Delivery Time
                          </label>
                          <input
                            placeholder="20 minutes"
                            {...register("delivery_time", { required: true })}
                            className="input"
                            name="delivery_time"
                            onChange={handleChange}
                          />

                          {errors.delivery_time && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
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
                            onChange={handleChange}
                          />

                          {errors.minimum_delivery_range && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">Cuisine</label>
                          <input
                            placeholder="name of the cuisine"
                            {...register("cuisine", { required: true })}
                            className="input"
                            name="cuisine"
                            onChange={handleChange}
                          />

                          {errors.cuisine && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Menu name
                          </label>
                          <input
                            placeholder="like Sushi, Platter, Miso Soup, Tempura
                        "
                            {...register("menu", { required: true })}
                            className="input"
                            name="menu"
                            onChange={handleChange}
                          />

                          {errors.menu && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Restaurant Email
                          </label>
                          <input
                            placeholder="Restaurant email"
                            {...register("email", {
                              required: true,
                            })}
                            type="email"
                            className="input"
                            name="email"
                            onChange={handleChange}
                          />

                          {errors.email && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Select Division
                          </label>
                          <select
                            {...register("division", { required: true })}
                            className="bg-gray-200 input"
                            defaultValue="default"
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
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Select City
                          </label>
                          <select
                            disabled={
                              !divisionName || divisionName === "default"
                            }
                            {...register("city", { required: true })}
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

                          {errors.city && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">
                            Select Area
                          </label>
                          <select
                            disabled={!cityName || cityName === "default"}
                            {...register("area", { required: true })}
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

                          {errors.area && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>

                        <div className="relative flex-1">
                          <label className="block mb-1 text-xs">Mobile</label>
                          <input
                            placeholder="Your mobile number"
                            {...register("mobile", { required: true })}
                            className="input"
                            name="mobile"
                            onChange={handleChange}
                          />
                          {errors.mobile && (
                            <p className="absolute text-xs text-primary">
                              You can not leave this empty.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="items-center justify-between gap-8 space-y-6 md:flex md:space-y-0">
                        <div className="relative flex-1 pb-4">
                          <label className="block mb-1 text-xs">Address</label>
                          <input
                            placeholder="Your restaurant address"
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
                        <div className="relative flex-1 pb-4">
                          <label className="block mb-1 text-xs">Message</label>
                          <textarea
                            placeholder="Message"
                            {...register("message", { required: true })}
                            className="input"
                            rows={4}
                            name="message"
                            onChange={handleChange}
                          />
                          {errors.message && (
                            <p className="absolute text-xs text-primary">
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
                        className="px-12 py-1 text-white rounded-md bg-primary disabled:bg-gray-400 "
                      />
                    </form>
                  )}
                  {showGreeting && (
                    <Greeting message="Thanks for submitting!" />
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
