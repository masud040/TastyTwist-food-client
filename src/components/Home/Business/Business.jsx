import banner from "../../../assets/home/business.jpg";
import "./business.css";
const Business = () => {
  return (
    <div className="business-cont p-6 my-12 rounded-xl">
      <h1 className="text-xl md:text-2xl font-semibold text-dark-gray  mb-4">
        Take your office out to lunch
      </h1>
      <div className="relative">
        <img className="rounded-xl w-full" src={banner} alt="" />
        <div className="text-dark-gray bg-white p-4 rounded-xl space-y-2 absolute -bottom-20 shadow-2xl">
          <h4 className="text-lg font-bold">TastyTwistOnline for business</h4>
          <p className="text-base">
            Order lunch or fuel for work-from-home, late nights in the office,
            corporate events, client meetings, and much more.
          </p>
          <button className="bg-primary p-2 rounded-md text-white  font-bold">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Business;
