import React from "react";
import NavigationBar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/HeroSection";

import ExcitingSection from "../components/LandingPage/ExicitingSection";
import WhySection from "../components/LandingPage/WhySection";
import AboutUs from "../components/LandingPage/AboutUs";
import CustomFooter from "../components/LandingPage/Footer";

export default function LandingPage() {
  return (
    <div className="container">
      <NavigationBar />
      <HeroSection />
      <ExcitingSection />
      <WhySection />
      <AboutUs />
      <CustomFooter />
    </div>
  );
}
