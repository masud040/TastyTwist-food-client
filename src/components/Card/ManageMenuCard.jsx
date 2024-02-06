import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetMenu from "../../hooks/useGetMenu";
import comfirmAction from "../../utils/comfirmAction";
import MenuCardBody from "./MenuCardBody";
const ManageMenuCard = ({ item, onEditMenu }) => {
  const { _id, name, price, description, image_url } = item || {};

  const axiosSecure = useAxiosSecure();
  const { refetch } = useGetMenu();
  const handleDelete = async (id) => {
    const { confirm } = await comfirmAction(
      "Are you sure want to delete this item?",
      "Delete"
    );
    if (confirm) {
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
  };
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-duration="1500"
      className="flex justify-between items-center text-dark-gray border gap-3 border-gray-300 rounded-lg p-2 group "
    >
      <MenuCardBody name={name} description={description} price={price} />
      <div className="relative">
        <img
          src={image_url}
          className="rounded-lg mx-auto h-[120px] group-hover:scale-110 
      transition w-[120px]"
          alt=""
        />
        <div className="absolute bottom-1 right-1 text-3xl flex gap-4">
          <button
            onClick={() => onEditMenu(item)}
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
  );
};

export default ManageMenuCard;
