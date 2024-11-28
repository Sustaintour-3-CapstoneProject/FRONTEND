import React from "react";
import { useParams } from "react-router-dom";
import destinations from "../../data/destinationData";
import { HiLocationMarker, HiClock, HiCurrencyDollar } from "react-icons/hi";
import { FaRestroom, FaParking, FaHiking, FaSwimmer } from "react-icons/fa";
import { MdRestaurantMenu, MdOutlineLocalGroceryStore, MdOutlineDirectionsBoat } from "react-icons/md";
import { Button, Card } from "flowbite-react";

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find((dest) => dest.id === parseInt(id));

  if (!destination) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">
          Destination not found!
        </h2>
      </div>
    );
  }

  // Mapping fasilitas ke ikon
  const facilityIcons = {
    Parking: FaParking,
    Toilets: FaRestroom,
    Shops: MdOutlineLocalGroceryStore,
    Guides: HiLocationMarker,
    "Swimming Pool": FaSwimmer,
    Restaurants: MdRestaurantMenu,
    Bars: MdRestaurantMenu, // Menggunakan ikon yang sama untuk bar dan restoran
    "Hiking Trails": FaHiking,
    Boats: MdOutlineDirectionsBoat,
  };

  return (
    <section className="py-10 px-6 max-w-6xl mx-auto">
      {/* Hero Image */}
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="rounded-lg shadow-lg w-full h-[400px] object-cover"
        />
        <div className="absolute top-4 left-4">
          <Button color="dark" size="sm">
            Explore More
          </Button>
        </div>
      </div>

      {/* Title and Info */}
      <div className="mt-6">
        <h1 className="text-3xl font-bold text-gray-800">{destination.name}</h1>
        <div className="flex items-center text-gray-600 mt-2">
          <HiLocationMarker className="mr-2 text-blue-500" />
          <p>{destination.address}</p>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <HiClock className="mr-2 text-blue-500" />
          <p>{destination.openingHours}</p>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <HiCurrencyDollar className="mr-2 text-blue-500" />
          <p>{destination.ticketPrice}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h4 className="font-semibold text-lg text-gray-700">Explore the Beauty</h4>
        <p className="text-gray-600 mt-2 leading-relaxed">
          {destination.description}
        </p>
      </div>

      {/* Facilities Section */}
<div className="mt-6">
  <h4 className="font-semibold text-lg text-gray-700 mb-4">Facility</h4>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {destination.facilities.map((facility, index) => {
      const IconComponent = facilityIcons[facility]; // Ambil ikon dari mapping
      return (
        <Card
          key={index}
          className="flex flex-col  items-center bg-blue-50 p-4 rounded-lg shadow-md"
        >
              {IconComponent && (
                  <div className="flex justify-center">
                      <IconComponent size={70 } className="text-blue-700 " />
                      </div>
          )}
          <p className="text-[13px] font-semibold text-blue-700 text-center">
            {facility.toUpperCase()}
          </p>
        </Card>
      );
    })}
  </div>
</div>

      {/* Video Section */}
      {destination.videoContent && (
        <div className="mt-6">
          <h4 className="font-semibold text-lg text-gray-700">A Visual Escape</h4>
          <video
            controls
            className="rounded-lg mt-4 shadow-lg w-full h-[300px] object-cover"
          >
            <source src={destination.videoContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
};

export default DestinationDetail;
