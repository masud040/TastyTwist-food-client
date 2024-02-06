import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
const DashboardLayout = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <Helmet>
        <title>TastyTwistOnline | Profile</title>
      </Helmet>

      <div className="relative min-h-screen md:flex">
        <Sidebar />
        <div className="flex-1 md:ml-64 pt-[58px]">
          <div className="p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
