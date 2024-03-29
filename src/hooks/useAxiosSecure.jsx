import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          logOut();
          navigate("/signIn");
        }
      }
    );
  }, [logOut, navigate]);
  return axiosInstance;
};

export default useAxiosSecure;
