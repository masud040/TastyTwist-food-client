import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetCartItem from "../../hooks/useGetCartItem";
import useGetFavoriteItem from "../../hooks/useGetFavoriteItem";
import FoodDetailsModal from "../Modal/FoodDetails/FoodDetailModal";
import MenuCardBody from "./MenuCardBody";

const MenuCard = ({ item }) => {
  const { user } = useAuth();
  const [, refetch] = useGetCartItem();
  const [, favRefetch] = useGetFavoriteItem();
  const axiosSecure = useAxiosSecure();
  const { _id, name, email, price, description, image_url } = item || {};

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const addToCart = async (e) => {
    e.stopPropagation();
    const orderInfo = {
      menuId: _id,
      email: user?.email,
      name: name,
      price: price,
      image: image_url,
      sellerEmail: email,
      count: 1,
    };
    const { data } = await axiosSecure.post(
      "/carts-favorite?items=carts",
      orderInfo
    );
    if (data.insertedId || data.count > 1) {
      refetch();
      setShowDetailsModal(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} is added`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const addToFavorite = async (e) => {
    e.stopPropagation();
    const orderInfo = {
      menuId: _id,
      email: user?.email,
      name: name,
      price: price,
      image: image_url,
      sellerEmail: email,
      count: 1,
    };
    const { data } = await axiosSecure.post("/carts-favorite", orderInfo);
    if (data.insertedId) {
      favRefetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} is added`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };
  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedItem(null);
  };

  return (
    <>
      {showDetailsModal && (
        <FoodDetailsModal
          showModal={showDetailsModal}
          onClose={handleCloseModal}
          item={selectedItem}
          onAddToCart={addToCart}
        />
      )}
      <div
        onClick={() => handleOpenModal(item)}
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
          <div className="absolute bottom-1 right-1 text-2xl flex gap-2">
            <button
              title="Add to favorite"
              onClick={addToFavorite}
              className="  transition-all delay-100    rounded-full text-pink-400"
            >
              <FaHeart />
            </button>
            <button
              title="Add to cart"
              onClick={addToCart}
              className=" hover:bg-pink-100 transition-all delay-100   bg-pink-50  rounded-full text-primary"
            >
              <IoMdAdd />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuCard;
