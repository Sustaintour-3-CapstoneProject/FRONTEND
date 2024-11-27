const AboutUs = () => (
  <div className="container py-16">
    <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-16">
      {/* Bagian Teks */}
      <div className="flex flex-col justify-start">
        <h2 className="text-sky-900 font-bold text-3xl mt-1 mb-10">TripWise</h2>
        <p className="text-gray-700 text-base leading-relaxed text-justify">
          TripWise empowers travelers with access to sustainable destination
          guides, personalized routes, cultural exchanges, and environmental
          education. We aim to connect you with meaningful, responsible travel
          experiences that enrich your journey and promote sustainability.
          Explore the world with TripWise, where every trip makes a positive
          impact.
        </p>
      </div>

      {/* Bagian Gambar */}
      <div className="flex justify-center">
        <img
          src="/LandingPage/TripWise.jpg" // Ganti dengan path gambar yang sesuai
          alt="About TripWise"
          className="rounded-lg shadow-md max-w-xl w-full h-[390px] object-cover object-center"
        />
      </div>
    </div>
  </div>
);

export default AboutUs;
