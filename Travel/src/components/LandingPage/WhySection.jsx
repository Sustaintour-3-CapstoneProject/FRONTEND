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

        <p className="text-gray-600 mb-6 text-left ">
          Your ultimate travel companion for personalized adventures,
          hassle-free planning, and unforgettable experiences across Indonesia.
        </p>

        {/* List menggunakan Flowbite */}
        <div className="flex flex-col lg:flex-row space-y-3 md:space-y-0 md:space-x-24 ">
          <List className="space-y-3 ">
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Personalized Travel Planning
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Smart Route Planning
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Safe Recommendations
            </List.Item>
          </List>
          <List className="space-y-3">
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Instant Travel Assistance
            </List.Item>
            <List.Item
              icon={() => (
                <img src="/LandingPage/Checkbox.svg" className="mr-2 w-5 h-5" />
              )}
            >
              Easy to Use & Access
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
