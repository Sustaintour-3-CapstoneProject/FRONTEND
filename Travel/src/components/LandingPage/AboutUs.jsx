import { Button } from "flowbite-react";

const AboutUs = () => (
  <div className="py-16 px-4 md:px-10 lg:px-20">
    <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-start gap-10">
      {/* Bagian Teks dan Gambar (Mobile) */}
      <div className="flex flex-col">
        <h2 className="text-sky-900 font-bold text-3xl mt-1 mb-6">TripWise</h2>
        {/* Gambar dipindahkan ke bawah judul untuk mobile */}
        <div className="block lg:hidden mb-6">
          <img
            src="/LandingPage/TripWise.jpg" // Ganti dengan path gambar yang sesuai
            alt="About TripWise"
            className="rounded-lg shadow-md max-w-full h-auto object-cover"
          />
        </div>
        <p className="text-gray-700 text-base leading-6">
          TripWise empowers travelers with access to sustainable destination
          guides, personalized routes, cultural exchanges, and environmental
          education. We aim to connect you with meaningful, responsible travel
          experiences that enrich your journey and promote sustainability.
          Explore the world with TripWise, where every trip makes a positive
          impact.
        </p>
        <Button color="customBlue" className="mt-6 w-full sm:w-44" size="lg">
          Let's Go Explore!
        </Button>
      </div>

      {/* Bagian Gambar (Desktop) */}
      <div className="hidden lg:flex justify-end">
        <img
          src="/LandingPage/TripWise.jpg" // Ganti dengan path gambar yang sesuai
          alt="About TripWise"
          className="rounded-lg shadow-md max-w-full lg:max-w-[608px] h-auto object-cover"
        />
      </div>
    </div>
  </div>
);

export default AboutUs;
