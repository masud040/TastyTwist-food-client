import axios from "axios";

export const getAllReviews = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_URL}/reviews`);
  return data;
};
