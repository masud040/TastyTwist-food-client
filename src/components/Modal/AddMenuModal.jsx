import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const AddMenuModal = ({ isOpen, closeModal }) => {
  const handleAddProduct = (e) => {
    e.preventDefault();
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
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Add New Menu
                </Dialog.Title>
                <div className="mt-2">
                  <form onSubmit={handleAddProduct} className="space-y-2">
                    <div className="md:flex  justify-between md:gap-8 items-center space-y-2 md:space-y-0">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Name
                        </label>
                        <input
                          type="text"
                          className="block p-2  text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500 w-full "
                          required
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Select Image
                        </label>
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 p-1.5 rounded-md cursor-pointer bg-gray-50"
                          id="file_input"
                          type="file"
                          required
                        />
                      </div>
                    </div>
                    <div className="md:flex md:gap-8 justify-between items-center space-y-2 md:space-y-0 mt-2 md:mt-0 ">
                      <div className="flex-1 w-full">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Price
                        </label>
                        <input
                          type="number"
                          className="block p-2 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300  focus:outline-none focus:border-purple-500 "
                          required
                        />
                      </div>
                      <div className=" flex-1 w-full ">
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                          Select category
                        </label>
                        <select
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-purple-500 block w-full p-[10px]"
                          required
                        >
                          <option value="popular">Popular</option>
                          <option value="pizza">Pizza</option>
                          <option value="burger">Burger</option>
                          <option value="biryani">Biryani</option>
                          <option value="soup">Soup</option>
                          <option value="drink">Drink</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Menu descriptions
                      </label>
                      <textarea
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:border-purple-500 "
                        placeholder="Write menu descriptions here..."
                        required
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 w-full mt-4 rounded-md text-lg text-white"
                      >
                        Add
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
};

export default AddMenuModal;
