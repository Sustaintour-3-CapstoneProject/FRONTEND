import { Button } from "flowbite-react";

const AboutUs = () => (
  <div className="py-10 md:py-16 " id="about">
    <div className="mx-auto grid lg:grid-cols-2 items-start gap-20">
      {/* Bagian Teks */}
      <div className="flex flex-col justify-start">
        <h2 className="text-sky-600 font-bold text-3xl mt-1 mb-10">TripWise</h2>

        {/* Gambar hanya muncul di bawah judul untuk mobile */}
        <div className="block lg:hidden mb-6">
          <img
            src="/LandingPage/TripWise.jpg"
            alt="About TripWise"
            className="rounded-lg shadow-md max-w-full h-auto object-cover"
          />
        </div>

        <p className="text-gray-700 text-base leading-6 text-justify max-w-[630px] w-full">
          TripWise empowers travelers with access to sustainable destination
          guides, personalized routes, cultural exchanges, and environmental
          education. Our platform is dedicated to inspiring conscious
          exploration by connecting you with meaningful, responsible travel
          experiences that enrich your journey and promote sustainability. With
          TripWise, you can uncover hidden gems, support local communities, and
          embrace eco-friendly practices, ensuring that every adventure
          contributes to a better future for our planet. Together, let’s
          redefine travel—explore the world with purpose, create lasting
          memories, and make every trip a positive impact.
        </p>
        <Button color="customBlue" className="mt-8 w-44" size="lg">
          Let's Go Explore!
        </Button>
      </div>

      {/* Bagian Gambar (tetap berdampingan dengan teks pada desktop) */}
      <div className="hidden lg:flex justify-center">
        <img
          src="/LandingPage/TripWise.jpg"
          alt="About TripWise"
          className="rounded-lg shadow-md max-w-[650px] w-full h-[410px] object-center"
        />
      </div>
    </div>
  </div>
);

export default AboutUs;
