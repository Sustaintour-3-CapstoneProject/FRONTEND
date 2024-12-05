import { Outlet } from "react-router-dom";
import NavigationBar from "../components/User/HomePage/Navbar";
import Footers from "../pages/user/Footer";

export default function HomeLayout() {
  return (
    <div className="overflow-x-hidden">
      <NavigationBar />
      <div className="container">
        <Outlet />
      </div>
      <Footers />
    </div>
  );
}
