// src/layouts/LandingLayout.jsx

import { Outlet } from "react-router-dom";

import NavigationBar from "../components/LandingPage/Navbar";

const LandingLayout = () => {
  return (
    <div className="container">
      <NavigationBar />

      <Outlet />
    </div>
  );
};

export default LandingLayout;
