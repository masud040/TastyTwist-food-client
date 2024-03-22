import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
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
    try {
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
      if (data.insertedId) {
        refetch();
        setShowDetailsModal(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${name} is added`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        toast(data?.message, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const addToFavorite = async (e) => {
    try {
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
    } catch (error) {
      console.log(error.message);
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
        className="flex items-center justify-between gap-3 p-2 border border-gray-300 rounded-lg text-dark-gray group "
      >
        <MenuCardBody name={name} description={description} price={price} />
        <div className="relative">
          <img
            src={image_url}
            className="rounded-lg mx-auto h-[120px] group-hover:scale-110 
          transition w-[120px]"
            alt=""
          />
          <div className="absolute flex gap-2 text-2xl bottom-1 right-1">
            <button
              title="Add to favorite"
              onClick={addToFavorite}
              className="text-pink-400 transition-all delay-100 rounded-full "
            >
              <FaHeart />
            </button>
            <button
              title="Add to cart"
              onClick={addToCart}
              className="transition-all delay-100 rounded-full hover:bg-pink-100 bg-pink-50 text-primary"
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
