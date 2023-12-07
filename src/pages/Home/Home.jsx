import Banner from "../../components/Home/Banner/Banner";
import Business from "../../components/Home/Business/Business";
import FaQ from "../../components/Home/FaQ/FaQ";
import OurApp from "../../components/Home/OurApp/OurApp";
import Restaurant from "../../components/Home/Restaurant/Restaurant";
import Reviews from "../../components/Home/Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner />
      <Restaurant />
      <Reviews />
      <OurApp />
      <Business />
      <FaQ />
    </div>
  );
};

export default Home;
