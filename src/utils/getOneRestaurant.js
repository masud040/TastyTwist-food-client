import axios from "axios";

export const getOneRestaurant = async (email) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_URL}/restaurants?email=${email}`
  );
  return data;
};
