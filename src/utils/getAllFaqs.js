import axios from "axios";

export const getAllFaqs = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_URL}/faqs`);
  return data;
};
