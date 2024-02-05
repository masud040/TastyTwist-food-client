import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetMenu from "../../hooks/useGetMenu";
import CloseModal from "../Button/CloseModal";
export default function ManageMenuModal({ isOpen, closeModal, menuToUpdate }) {
  const [isAdd, setIsAdd] = useState(Object.is(menuToUpdate, null));

  useEffect(() => {
    setIsAdd(Object.is(menuToUpdate, null));
  }, [menuToUpdate]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch } = useGetMenu();
  const { _id, name, price, description, image_url, category } =
    menuToUpdate || {};

  const handleProduct = async (event, isAdd) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target;
    const name = form.name.value;
    const price = parseFloat(form.price.value);
    const category = form.category.value;
    const description = form.description.value;
    if (isAdd) {
      const image = form.image.files[0];
      const email = user?.email;
      const { url } = await imageUpload(image);
      const menuObj = {
        name,
        image_url: url,
        price,
        category,
        description,
        email,
      };
      const { data } = await axiosSecure.post("/menu", menuObj);
      if (data?.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your item is Added",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        refetch();
        setLoading(false);
      }
    } else {
      const image = form.image.value;
      const menuObj = {
        name,
        image_url: image,
        price,
        category,
        description,
      };

      const { data } = await axiosSecure.patch(`/menu/edit/${_id}`, menuObj);
      if (data.modifiedCount > 0) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Edit Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
        setLoading(false);
      }
    }
    closeModal();
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <CloseModal onClose={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  {isAdd ? "Add New Item" : " Edit Existing Menu"}
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={() => handleProduct(event, isAdd)}
                    className="space-y-2"
                  >
                    <div className="md:flex  justify-between md:gap-8 items-center space-y-2 md:space-y-0">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="block p-2  text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500 w-full "
                          placeholder="Name"
                          defaultValue={name}
                          required
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          {isAdd ? "Select Image" : "Image URL"}
                        </label>
                        {isAdd ? (
                          <input
                            name="image"
                            className="block w-full text-sm text-gray-900 border border-gray-300 p-1.5 rounded-md cursor-pointer bg-gray-50"
                            id="file_input"
                            type="file"
                            required
                          />
                        ) : (
                          <input
                            type="url"
                            name="image"
                            className="block p-2  text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500 w-full "
                            defaultValue={image_url}
                            required
                          />
                        )}
                      </div>
                    </div>
                    <div className="md:flex md:gap-8 justify-between items-center space-y-2 md:space-y-0 mt-2 md:mt-0 ">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Price
                        </label>
                        <input
                          name="price"
                          type="number"
                          className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500 "
                          placeholder="Price"
                          defaultValue={price}
                          required
                        />
                      </div>
                      <div className=" flex-1 w-full ">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Select category
                        </label>
                        <select
                          name="category"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-purple-500 block w-full p-[10px]"
                          defaultValue={category}
                          required
                        >
                          <option value="popular">Popular</option>
                          <option value="pizza">Pizza</option>
                          <option value="burger">Burger</option>
                          <option value="biryani">Biryani</option>
                          <option value="soup">Soup</option>
                          <option value="drinks">Drink</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Menu description
                      </label>
                      <textarea
                        rows="4"
                        name="description"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 "
                        placeholder="Write menu description here..."
                        defaultValue={description}
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 w-full mt-4 rounded-md text-lg text-white"
                      >
                        {loading ? (
                          <TbFidgetSpinner className="text-xl w-full animate-spin" />
                        ) : isAdd ? (
                          "Add"
                        ) : (
                          "Update"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
