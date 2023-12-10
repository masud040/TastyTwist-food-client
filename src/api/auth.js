import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imageApi}`,
    formData
  );
  return data;
};

export const saveUser = async (user) => {
  const userInfo = {
    name: user.displayName,
    email: user.email,
    role: "user",
    timeStamp: Date.now(),
  };
  const { data } = await axios.put(
    `${import.meta.env.VITE_URL}/users/${user?.email}`,
    userInfo
  );
  return data;
};
