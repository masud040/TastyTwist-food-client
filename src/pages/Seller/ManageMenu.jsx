import { useState } from "react";

import ManageMenuCard from "../../components/Card/ManageMenuCard";
import ManageMenuModal from "../../components/Modal/ManageMenuModal";
import useGetMenu from "../../hooks/useGetMenu";

const ManageMenu = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { menuItems, isLoading, refetch } = useGetMenu();
  const [menuToUpdate, setmenuToUpdate] = useState(null);
  function closeModal() {
    setIsOpen(false);
    setmenuToUpdate(null);
  }

  function openEditMenuModal(item) {
    setmenuToUpdate(item);
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
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-[#CA43E1] to-[#7111EB] p-2 rounded-md text-lg text-white"
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {!isLoading &&
          menuItems?.map((item) => (
            <ManageMenuCard
              key={item._id}
              item={item}
              onEditMenu={openEditMenuModal}
            />
          ))}
      </div>

      <ManageMenuModal
        isOpen={isOpen}
        closeModal={closeModal}
        refetch={refetch}
        menuToUpdate={menuToUpdate}
      />
    </>
  );
};

export default ManageMenu;
