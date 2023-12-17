import axios from "axios";

export const uploadToCloudinary = async (image) => {
  console.log(image);
  console.log(import.meta.env.VITE_cloudname,);
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_cloudname
  }/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", image);
    const response = await axios.post(cloudinaryUploadUrl, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const result = response.data;
      console.log(`Image uploaded successfully. URL: ${result.secure_url}`);
      return result.secure_url;
    } else {
      console.error(
        `Error uploading image: ${response.status}, ${response.data.error.message}`
      );
      return null;
    }
  } catch (error) {
    console.error("Error uploading image:", error.message);
    return null;
  }
};
