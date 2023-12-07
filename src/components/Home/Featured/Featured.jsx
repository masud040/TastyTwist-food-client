import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../../assets/slider/01.jpg";
import img2 from "../../../assets/slider/02.jpg";
import img3 from "../../../assets/slider/03.png";
import img4 from "../../../assets/slider/04.jpg";
import img5 from "../../../assets/slider/05.png";
import img6 from "../../../assets/slider/06.png";
const Featured = () => {
  return (
    <Carousel autoPlay={500} className="text-center" showThumbs={false}>
      <div>
        <img src={img1} />
      </div>
      <div>
        <img src={img2} />
      </div>
      <div>
        <img src={img3} />
      </div>
      <div>
        <img src={img4} />
      </div>
      <div>
        <img src={img5} />
      </div>
      <div>
        <img src={img6} />
      </div>
    </Carousel>
  );
};

export default Featured;
