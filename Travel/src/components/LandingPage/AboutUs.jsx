const AboutUs = () => (
  <div className="py-16 bg-gray-50">
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
      {/* Bagian Teks */}
      <div>
        <h2 className="text-blue-600 font-semibold text-lg mb-2">TripWise</h2>
        <p className="text-gray-700 text-base leading-relaxed">
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
          src="/about-us.jpg" // Ganti dengan path gambar yang sesuai
          alt="About TripWise"
          className="rounded-lg shadow-md max-w-full"
        />
      </div>
    </div>
  </div>
);

export default AboutUs;
