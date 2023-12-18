import axios from "axios";

export const imageUpload = async (image) => {
  const formdata = new FormData();
  formdata.append("file", image);
  formdata.append("upload_preset", import.meta.env.VITE_upload_preset);
  formdata.append("cloud_name", import.meta.env.VITE_cloudName);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_cloudName
    }/image/upload`,
    formdata
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
