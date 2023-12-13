import { Parallax } from "react-parallax";
import banner from "../../../assets/home/banner.jpg";
import { Input } from "@material-tailwind/react";

const Banner = () => {
  return (
    <Parallax
      blur={{ min: -35, max: 35 }}
      bgImage={banner}
      bgImageAlt="banner"
      strength={-500}
    >
      <div className="h-[35vh] md:h-[20vh] lg:h-[70vh] flex flex-col justify-center items-center">
        <h3 className="text-white mb-2 font-bold text-xl md:text-2xl text-center">
          It is the food and groceries you love, delivered
        </h3>
        <div className="w-full max-w-[600px] mx-auto px-10 space-y-4">
          <Input
            size="lg"
            label="Your street and street number"
            className="bg-white  border border-gray-600 "
            placeholder="Street, Postal Code"
            multiple
          />
          <button className="bg-[#ec407a] w-full p-2 rounded-lg text-white font-semibold text-lg">
            Find Food
          </button>
        </div>
      </div>
    </Parallax>
  );
};

export default Banner;
