import apps from "../../../assets/home/home-foodpanda-apps.webp";
const OurApp = () => {
  return (
    <>
      <h1 className="text-dark-gray text-xl md:text-2xl font-semibold">
        Put us in your pocket
      </h1>
      <div className="bg-primary my-4 p-4 rounded-xl  md:grid grid-cols-2 gap-6 justify-center items-center">
        <div className="text-white text-center ">
          <h6 className="font-body text-xl  py-6">
            Download the food and groceries you love
          </h6>
          <p>
            It's all at your fingertips – the restaurants and shops you love.
            Find the right food and groceries to suit your mood, and make the
            first bite last. Go ahead, download us.
          </p>
        </div>
        <img src={apps} className="w-full mx-auto" alt="" />
      </div>
    </>
  );
};

export default OurApp;
