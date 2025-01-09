import Lottie from "lottie-react";
import { TbFidgetSpinner } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import LoginAnimation from "../../animation/LoginAnimation.json";
import { imageUpload, saveUser } from "../../api/auth";
import Container from "../../components/Container/Container";
import Social from "../../components/Social/Social";
import useAuth from "../../hooks/useAuth";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

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
    try {
      const { url } = await imageUpload(image);
      const { user } = await createUser(email, password);
      await updateUserProfile(name, url);
      if (user?.email) {
        const data = await saveUser(user);
        if (data.upsertedId) {
          toast.success("Sign up successfully");
        }
        setLoading(false);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Sign Up</title>
      </Helmet>

      <Container>
        <div className="flex flex-col-reverse items-center justify-between py-4 lg:flex-row">
          <div className="flex-1">
            <Lottie animationData={LoginAnimation} loop={false} />
          </div>
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col max-w-md p-6 text-gray-900 bg-gray-100 border border-gray-300 rounded-md sm:p-10">
              <div className="mb-8 text-center">
                <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                <p className="text-sm text-gray-800">
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
                      className="w-full px-3 py-2 text-gray-900 bg-gray-300 border rounded-md focus:outline-none focus:border-pink-500 focus:transition-colors focus:duration-500"
                      data-temp-mail-org="0"
                      required
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
                      className="w-full px-3 py-2 text-gray-900 bg-gray-300 border rounded-md focus:outline-none focus:border-pink-500 focus:transition-colors focus:duration-500"
                      data-temp-mail-org="0"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label htmlFor="password" className="mb-2 text-sm">
                        Password
                      </label>
                    </div>
                    <input
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      required
                      placeholder="*******"
                      className="w-full px-3 py-2 text-gray-900 bg-gray-300 border rounded-md focus:outline-none focus:border-pink-500 focus:transition-colors focus:duration-500"
                    />
                  </div>
                </div>

                <button className="flex items-center justify-center w-full h-full p-2 space-x-2 font-semibold text-gray-200 bg-pink-400 rounded-md cursor-pointer border-rounded back hover:shadow-xl">
                  {loading ? (
                    <TbFidgetSpinner className="text-3xl text-indigo-800 animate-spin" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </form>
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px bg-gray-700 sm:w-16 "></div>
                <p className="px-3 text-sm ">Signup with social accounts</p>
                <div className="flex-1 h-px bg-gray-700 sm:w-16"></div>
              </div>
              <Social />
              <p className="px-6 text-sm text-center ">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-indigo-500 hover:underline hover:text-rose-500"
                >
                  Sign In
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
