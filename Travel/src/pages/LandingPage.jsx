import HeroSection from "../components/LandingPage/HeroSection";
import ExcitingSection from "../components/LandingPage/ExicitingSection";
import AboutUs from "../components/LandingPage/AboutUs";
import CustomFooter from "../components/LandingPage/Footer";
import Testimonials from "../components/LandingPage/Testimonials";
import WhySection from "../components/LandingPage/WhySection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ExcitingSection />
      <WhySection />
      <AboutUs />
      <Testimonials />
      <CustomFooter />
    </div>
  );
}
