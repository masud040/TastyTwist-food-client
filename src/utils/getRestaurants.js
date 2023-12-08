import axios from "axios";

export const getRestaurants = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_URL}/restaurants`);
  return data;
};
