import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import LoginAnimation from "../../animation/LoginAnimation.json";
import Social from "../../components/Social/Social";
import Container from "../../components/Container/Container";
import useAuth from "../../hooks/useAuth";
import { imageUpload, saveUser } from "../../api/auth";
import { TbFidgetSpinner } from "react-icons/tb";

import toast from "react-hot-toast";
import { useState } from "react";

const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const data = await imageUpload(image);

    const userImage = data?.display_url;
    console.log(data);
    const { user } = await createUser(email, password);
    await updateUserProfile(name, userImage);
    if (user?.email) {
      const data = await saveUser(user);
      if (data.upsertedId) {
        toast.success("Sign up successfully");
      }
      setLoading(false);
      navigate("/");
    }
  };

  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="flex-1">
          <Lottie animationData={LoginAnimation} loop={false} />
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10  bg-[#0d0929] text-gray-600">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl text-[#e8aaff]  font-bold">
                Sign Up
              </h1>
              <p className="text-sm text-gray-400">
                Welcome to TastyTwistOnline
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Your Name Here"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400  bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <label htmlFor="image" className="block mb-2 text-sm">
                    Select Image:
                  </label>
                  <input required type="file" name="image" accept="image/*" />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Your Email Here"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                </div>
                <div>
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm mb-2">
                      Password
                    </label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-red-400 bg-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div className=" w-full rounded-md bg-gradient-to-r from-[#3a4cd8] my-3 via-indigo-500 to-[#9058e7] p-[1px] ">
                <button className=" justify-center items-center space-x-2  bg-[#131237] text-gray-200 font-semibold p-2 border-rounded cursor-pointer flex h-full rounded-md w-full back hover:shadow-xl">
                  {loading ? (
                    <TbFidgetSpinner className="text-3xl text-primary animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 bg-white "></div>
              <p className="px-3 text-sm ">Signup with social accounts</p>
              <div className="flex-1 h-px sm:w-16 bg-white"></div>
            </div>
            <Social />
            <p className="px-6 text-sm text-center ">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="hover:underline hover:text-rose-500 text-gray-200"
              >
                Sign In
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
