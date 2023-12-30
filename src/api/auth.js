import axios from "axios";

export const imageUpload = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", import.meta.env.VITE_upload_preset);
  formData.append("cloud_name", import.meta.env.VITE_cloudName);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_cloudName
    }/image/upload`,
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
