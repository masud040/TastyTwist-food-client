import { Link, useLocation, useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import LoginAnimation from "../../animation/LoginAnimation.json";
import Container from "../../components/Container/Container";
import Social from "../../components/Social/Social";
import useAuth from "../../hooks/useAuth";
const SignIn = () => {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const email = form.email?.value;
    const password = form.password?.value;

    signIn(email, password)
      .then(() => {
        toast.success("Login Successfully");
        setLoading(false);
        navigate(state ? state : "/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };
  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="flex-1">
          <Lottie animationData={LoginAnimation} loop={false} />
        </div>
        <div className="flex-1 flex justify-center items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100  border border-gray-300 text-gray-900">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl  font-bold">Log In</h1>
              <p className="text-sm ">Sign in to access your account</p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter Your Email Here"
                    className="w-full px-3 py-2 border rounded-md  focus:outline-none focus:border-pink-500  focus:transition-colors focus:duration-500 bg-gray-300 text-gray-900"
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
                    autoComplete="current-password"
                    required
                    placeholder="*******"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-pink-500 focus:transition-colors focus:duration-500 bg-gray-300 text-gray-900"
                  />
                </div>
              </div>

              <button className=" justify-center items-center space-x-2  bg-pink-400 text-gray-200 font-semibold p-2 border-rounded cursor-pointer flex h-full rounded-md w-full back hover:shadow-xl">
                {loading ? (
                  <TbFidgetSpinner className="text-3xl text-indigo-800 animate-spin" />
                ) : (
                  "Continue"
                )}
              </button>
            </form>
            <div className="space-y-1">
              <button className="text-xs hover:underline hover:text-rose-500 text-blue-800">
                Forgot password?
              </button>
            </div>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px  bg-gray-700 sm:w-16 "></div>
              <p className="px-3 text-sm ">Login with social accounts</p>{" "}
              <div className="flex-1 h-px bg-gray-700 sm:w-16"></div>
            </div>

            <Social />
            <p className="px-6 text-sm text-center ">
              Don&apos;t have an account yet?{" "}
              <Link
                to="/signup"
                className="hover:underline hover:text-rose-500 text-indigo-500 font-semibold"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignIn;
