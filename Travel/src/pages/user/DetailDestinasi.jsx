import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; // Sesuaikan dengan lokasi file axiosInstance
import { HiLocationMarker, HiClock, HiCurrencyDollar } from "react-icons/hi";
import { FaRestroom, FaParking, FaHiking, FaSwimmer } from "react-icons/fa";
import {
  MdRestaurantMenu,
  MdOutlineLocalGroceryStore,
  MdOutlineDirectionsBoat,
} from "react-icons/md";
import { Carousel, Card } from "flowbite-react";

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState({});

  // Buat state untuk menyimpan status ekspansi setiap video
  const [expandedVideos, setExpandedVideos] = useState({});
  const toggleDescription = (index) => {
    setExpandedVideos((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle ekspansi untuk video tertentu
    }));
  };

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await axiosInstance.get(`/destination/${id}`);
        console.log(response);
        setDestination(response.data.destination);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching destination data:", err);
        setError("Failed to fetch destination data.");
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-blue-600">Loading...</h2>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">
          Destination not found!
        </h2>
        {error && <p className="text-gray-600 mt-2">{error}</p>}
      </div>
    );
  }

  // Mapping fasilitas ke ikon
  const facilityIcons = {
    Parking: FaParking,
    Toilets: FaRestroom,
    "Souvenir Shops": MdOutlineLocalGroceryStore,
    Guides: HiLocationMarker,
    "Swimming Pool": FaSwimmer,
    "Food Stalls": MdRestaurantMenu,
    Bars: MdRestaurantMenu, // Menggunakan ikon yang sama untuk bar dan restoran
    "Hiking Trails": FaHiking,
    Boats: MdOutlineDirectionsBoat,
  };

  return (
    <section className="  py-10 px-6 mx-auto font-poppins">
      {/* Hero Image */}
      <div className="relative w-full h-[500px]">
        <Carousel slideInterval={5000} className="h-full">
          {destination.images && destination.images.length > 0 ? (
            destination.images.map((image, index) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Slide ${index + 1}`}
                className="rounded-lg shadow-lg w-full h-full object-cover object-center md:object-fill"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/650x500/gray/FefcFFc/png"; // Ganti dengan path placeholder
                  e.target.alt = "Placeholder Image"; // Alternatif teks untuk placeholder
                }}
              />
            ))
          ) : (
            <img
              src="https://placehold.co/650x500/gray/FefcFFc/png" // Ganti dengan path atau URL gambar placeholder
              alt="Placeholder"
              className="rounded-lg shadow-lg w-full h-full object-cover object-center md:object-fill"
            />
          )}
        </Carousel>
      </div>
      {/* Title and Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-sky-800">{destination.name}</h1>
        <div className="flex items-center text-gray-800 mt-2">
          <HiLocationMarker size={24} className="mr-2 " />
          <p>{destination.address}</p>
        </div>
        <div className="flex items-center mt-2 text-gray-800">
          <HiClock size={24} className="mr-2 " />
          <p>{destination.operational_hours}</p>
        </div>
        <div className="flex items-center mt-2 text-gray-800">
          <HiCurrencyDollar size={24} className="mr-2 " />
          <p>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(destination.ticket_price)}
          </p>
        </div>
      </div>
      {/* Description */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-gray-700">
          Explore the Beauty
        </h4>
        <p className="text-gray-600 mt-2 leading-relaxed">
          {destination.description}
        </p>
      </div>
      {/* Facilities Section
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-gray-700 mb-4">Facility</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {destination.facilities.map((facility, index) => {
            const IconComponent = facilityIcons[facility]; // Ambil ikon dari mapping
            return (
              <Card
                key={index}
                className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md"
              >
                {IconComponent && (
                  <div className="flex justify-center">
                    <IconComponent size={70} className="text-blue-700" />
                  </div>
                )}
                <p className="text-[13px] font-semibold text-blue-700 text-center">
                  {facility.toUpperCase()}
                </p>
              </Card>
            );
          })}
        </div>
      </div> */}
      {/* Video Section */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-gray-700 mb-4">
          A Visual Escape
        </h4>
        {destination.video_contents && (
          <div className="flex space-x-6 overflow-x-auto">
            {destination.video_contents.map((videoData, index) => {
              // Membentuk URL embed dari video TikTok
              const embedUrl = `https://www.tiktok.com/embed/${
                videoData.url.split("/").pop().split("?")[0]
              }?autoplay=1`;

              return (
                <div
                  key={videoData.id}
                  className="flex-none w-[300px] overflow-hidden rounded-lg shadow-lg relative group my-4"
                >
                  {/* Video Player */}
                  <div className="relative overflow-hidden rounded-lg">
                    {/* Thumbnail Placeholder */}
                    {!isVideoPlaying[index] && (
                      <div
                        className="bg-gray-900 w-full h-[610px] flex items-center justify-center cursor-pointer rounded-lg relative"
                        onClick={() =>
                          setIsVideoPlaying({
                            ...isVideoPlaying,
                            [index]: true,
                          })
                        }
                      >
                        <iframe
                          src={embedUrl}
                          width="100%"
                          height="575"
                          frameBorder="0"
                          allow="encrypted-media; autoplay; fullscreen"
                          allowFullScreen
                          title={`TikTok Video ${index}`}
                          className="rounded-lg mb-14  "
                        ></iframe>
                      </div>
                    )}
                  </div>
                  {/* Overlay for Text */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-2 rounded-lg">
                    <p
                      className={`text-sm text-white font-semibold transition-all duration-300 ${
                        expandedVideos[index]
                          ? "line-clamp-none"
                          : "line-clamp-2"
                      }`}
                    >
                      {videoData.title}
                    </p>
                    <button
                      onClick={() => toggleDescription(index)}
                      className="text-xs text-blue-400 mt-1 hover:underline focus:outline-none"
                    >
                      {expandedVideos[index]
                        ? "Tampilkan lebih sedikit"
                        : "Tampilkan lebih banyak"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationDetail;
