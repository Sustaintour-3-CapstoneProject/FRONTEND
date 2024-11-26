const HeroSection = () => (
  <div
    className="bg-cover bg-center h-[550px] flex items-center justify-center my-5 rounded-xl"
    style={{ backgroundImage: "url('/LandingPage/Hero-Section.jpg')" }}
  >
    <div className="text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Discover Your Next Adventure!</h1>
      <h2 className="text-lg mb-4">
        From dream destinations to detailed plans, we’ve got you covered.
      </h2>
      <button className="px-6 py-2 bg-sky-500 rounded-md hover:bg-sky-700">
        Explore Now
      </button>
    </div>
  </div>
);

export default HeroSection;
