import React from "react";
import NavigationBar from "../components/LandingPage/Navbar";
import HeroSection from "../components/LandingPage/HeroSection";
import ExcitingSection from "../components/LandingPage/ExicitingSection";
import AboutUs from "../components/LandingPage/AboutUs";
import CustomFooter from "../components/LandingPage/Footer";
import Testimonials from "../components/LandingPage/Testimonials";

export default function LandingPage() {
  return (
    <div className="container">
      <NavigationBar />
      <HeroSection />
      <ExcitingSection />

      <Testimonials />
      <AboutUs />
      <CustomFooter />
    </div>
  );
}
