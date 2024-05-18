import banner from "../../../assets/home/business.jpg";
import "./business.css";
const Business = () => {
  return (
    <div className="p-6 my-12 business-cont rounded-xl">
      <h1 className="mb-4 text-xl font-semibold md:text-2xl text-dark-gray">
        Take your office out to lunch
      </h1>
      <div className="relative">
        <img className="w-full rounded-xl" src={banner} alt="" />
        <div className="absolute p-4 space-y-2 bg-white shadow-2xl text-dark-gray rounded-xl -bottom-20">
          <h4 className="text-lg font-bold">Tasty Twist for business</h4>
          <p className="text-base">
            Order lunch or fuel for work-from-home, late nights in the office,
            corporate events, client meetings, and much more.
          </p>
          <button className="p-2 font-bold text-white rounded-md bg-primary">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Business;
