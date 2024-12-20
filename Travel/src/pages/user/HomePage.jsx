import React from "react";
import HeroSection from "../../components/User/HomePage/HeroSection";
import NearByDestinations from "../../components/User/HomePage/NearBy";
import RuteSection from "../../components/User/HomePage/RuteSection";
import PopularDestinations from "../../components/User/HomePage/PopularDestinations";

export default function HomePage() {
  return (
    <div className="mx-auto my-10 font-poppins">
      <HeroSection />
      <NearByDestinations />
      <RuteSection />
      <PopularDestinations />
    </div>
  );
}
