import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

import { GoogleAuthProvider } from "firebase/auth";
import { saveUser } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const googleProvider = new GoogleAuthProvider();
const Social = () => {
  const { signInWithSocial } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { user } = await signInWithSocial(googleProvider);
    await saveUser(user);
    toast.success("Login successful");
    navigate("/");
  };
  return (
    <div
      onClick={handleLogin}
      className=" w-full rounded-md bg-gradient-to-r from-[#3a4cd8] my-3 via-indigo-500 to-[#9058e7] p-[1px] "
    >
      <div className=" justify-center items-center space-x-2  bg-[#131237] p-1 border-rounded cursor-pointer flex h-full rounded-md w-full back">
        <FcGoogle size={32} />

        <p>Continue with Google</p>
      </div>
    </div>
  );
};

export default Social;
