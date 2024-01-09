import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

import { GoogleAuthProvider } from "firebase/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { saveUser } from "../../api/auth";
const googleProvider = new GoogleAuthProvider();
const Social = () => {
  const { signInWithSocial } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = async () => {
    const { user } = await signInWithSocial(googleProvider);
    await saveUser(user);
    toast.success("Login successful");
    navigate(state ? state : "/");
  };
  return (
    <div
      onClick={handleLogin}
      className=" w-full rounded-md bg-gradient-to-r from-indigo-800 my-3 via-purple-500 to-indigo-600 p-[1px] "
    >
      <div className=" justify-center items-center space-x-2  bg-white p-1 border-rounded cursor-pointer flex h-full rounded-md w-full back">
        <FcGoogle size={32} />

        <p className="font-semibold">Continue with Google</p>
      </div>
    </div>
  );
};

export default Social;
