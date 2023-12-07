import { Outlet } from "react-router-dom";
import Footer from "../shared/Footer/Footer";
import Navbar from "../shared/Navbar/Navbar";
import Container from "../components/Container/Container";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-[60px] min-h-screen w-[95%] mx-auto">
        <Container>
          <Outlet />
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
