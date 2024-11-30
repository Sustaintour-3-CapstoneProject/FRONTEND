import { List } from "flowbite-react";

const WhySection = () => (
  <div className="py-16 px-4 lg:px-0">
    <div className="md:grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-20">
      {/* Bagian Gambar */}
      {/* Gambar hanya muncul di bawah judul untuk mobile */}
      <div className="block lg:hidden mb-4 ">
        <img
          src="/LandingPage/TripWise.jpg"
          alt="About TripWise"
          className="rounded-lg shadow-md max-w-full h-auto object-cover"
        />
      </div>

      <div className="hidden md:flex justify-center">
        <img
          src="/LandingPage/TripWise.jpg" // Ganti dengan path gambar yang sesuai
          alt="Why TripWise"
          className="rounded-lg shadow-md w-full  lg:max-w-[650px] h-[410px] "
        />
      </div>

      {/* Bagian Konten */}
      <div>
        <h3 className="text-sky-600 font-semibold text-lg lg:text-xl mb-2">
          Why TripWise
        </h3>
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left">
          We Are Providing The Best Travel Experience For You
        </h2>
        <p className="text-gray-600 mb-6 text-center lg:text-left">
          Your ultimate travel companion for personalized adventures,
          hassle-free planning, and unforgettable experiences across Indonesia.
        </p>

        {/* List menggunakan Flowbite */}
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <List>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Effortless Planning for Your Journey
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Personalized Travel Experience
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Safe Recommendations
            </List.Item>
          </List>
          <List>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Travel Responsibly with Sustainable Standards
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Uncover the Beauty of Indonesia
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Easy to Use & Access
            </List.Item>
          </List>
        </div>
      </div>
    </div>
  </div>
);

export default WhySection;
