// src/layouts/LandingLayout.jsx

import { Outlet } from "react-router-dom";

import NavigationBar from "../components/LandingPage/Navbar";

const LandingLayout = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
