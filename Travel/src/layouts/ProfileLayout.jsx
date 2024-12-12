import { Outlet } from "react-router-dom";
import SideBar from "../components/User/UserDetail/SideBar";
import HeaderProfile from "../components/User/UserDetail/Navbar";

const ProfileLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <HeaderProfile />
      <div className="flex flex-1 overflow-hidden">
        <SideBar className="hidden lg:block" />
        <main 
          className="flex-1 p-4 lg:p-8 
          overflow-y-auto 
          bg-[#F0F9FF] 
          w-full"
        >
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;