import { useState } from "react";
import AddMenuModal from "../../components/Modal/AddMenuModal";

const ManageMenu = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div>
        <div className="text-center">
          <h1 className=" inline-block bg-gradient-to-r from-pink-600 via-purple-500 to-indigo-400 text-transparent bg-clip-text text-2xl font-semibold">
            Manage Menu
          </h1>
        </div>

        <div className=" w-max rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 p-[2px]">
          <button
            onClick={openModal}
            className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 rounded-md text-lg text-white"
          >
            Add Item
          </button>
        </div>
      </div>
      <div></div>
      <AddMenuModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default ManageMenu;
