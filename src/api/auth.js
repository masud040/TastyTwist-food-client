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

export const possibleDateGenerator = () => {
  const possibilityDStart = new Date();
  possibilityDStart.setDate(possibilityDStart.getDate() + 5);
  const possibilityMStart = possibilityDStart.toLocaleString("default", {
    month: "long",
  });
  const possibilityDEnd = new Date();
  possibilityDEnd.setDate(possibilityDEnd.getDate() + 10);
  const possibilityMEnd = possibilityDEnd.toLocaleString("default", {
    month: "long",
  });

  const estimatedDate = `${possibilityDStart.getDate()} ${possibilityMStart.slice(
    0,
    3
  )} - ${possibilityDEnd.getDate()} ${possibilityMEnd.slice(0, 3)}`;
  return estimatedDate;
};
