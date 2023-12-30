import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import MenuEditModal from "../Modal/MenuEditModal";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useGetMenu from "../../hooks/useGetMenu";
const ManageMenuCard = ({ item }) => {
  const { _id, name, price, description, image_url } = item || {};
  let [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { refetch } = useGetMenu();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/menu/${id}`);
        if (data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <>
      <div className="flex justify-between items-center text-dark-gray border gap-3 border-gray-300 rounded-lg p-2 group ">
        <div className="space-y-1 flex-1    ">
          <h2 className="text-lg text-gray-800 font-semibold">{name}</h2>
          <p className="text-gray-600 ">{description}</p>

          <h4 className="text-[18px] text-gray-800 font-semibold">
            Price: {price}
          </h4>
        </div>
        <div className="relative">
          <img
            src={image_url}
            className="rounded-lg mx-auto h-[120px] group-hover:scale-110 
      transition w-[120px]"
            alt=""
          />
          <div className="absolute bottom-1 right-1 text-3xl flex gap-4">
            <button
              onClick={openModal}
              className="  transition-all delay-100    rounded-full text-pink-400"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className="  transition-all delay-100     rounded-full text-red-800"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
      <MenuEditModal isOpen={isOpen} closeModal={closeModal} item={item} />
    </>
  );
};

export default ManageMenuCard;
