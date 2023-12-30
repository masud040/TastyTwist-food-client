import { useState } from "react";
import AddMenuModal from "../../components/Modal/AddMenuModal";
import useGetMenu from "../../hooks/useGetMenu";
import ManageMenuCard from "../../components/Card/ManageMenuCard";

const ManageMenu = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { menuItems, isLoading } = useGetMenu();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="text-center">
        <h1 className=" inline-block bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-400 text-transparent bg-clip-text text-2xl font-semibold">
          Manage Menu
        </h1>
      </div>

      <div className="flex my-3 justify-end">
        <div className=" w-max rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 p-[2px]">
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 rounded-md text-lg text-white"
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isLoading &&
          menuItems?.map((item) => (
            <ManageMenuCard key={item._id} item={item} />
          ))}
      </div>

      <AddMenuModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default ManageMenu;
