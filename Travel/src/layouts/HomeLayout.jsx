import { Outlet } from "react-router-dom";
import NavigationBar from "../components/User/HomePage/Navbar";
import Footers from "../pages/user/Footer";

export default function HomeLayout() {
  return (
    <div className="font-poppins max-w-[1440px] mx-auto">
      <NavigationBar />
      <div className="overflow-x-hidden container">
        <Outlet />
      </div>
      <Footers />
    </div>
  );
}
