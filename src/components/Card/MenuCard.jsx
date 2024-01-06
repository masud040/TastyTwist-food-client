import { IoMdAdd } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaHeart } from "react-icons/fa";
import useGetCartItem from "../../hooks/useGetCartItem";

const MenuCard = ({ item }) => {
  const { user } = useAuth();
  const [, refetch] = useGetCartItem();
  const axiosSecure = useAxiosSecure();
  const { _id, name, email, price, description, image_url } = item || {};
  const addToCart = async () => {
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} is added`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const addToFavorite = async () => {
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
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} is added`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
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
  );
};

export default MenuCard;
