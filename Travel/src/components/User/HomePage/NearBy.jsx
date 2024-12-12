import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DestinationCard from "../../common/DestinationCard";
import SkeletonCard from "../../common/SkeletonCard";
import useAuthStore from "../../../store/authStore";
import useNearbyStore from "../../../store/nearByStore";
import { fetchNearbyDestinations } from "../../../utils/apiUtils";

const NearByDestinations = () => {
  const userCityId = useAuthStore((state) => state.auth.city);
  const { destinations, setDestinations } = useNearbyStore();

  const [startIndex, setStartIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (destinations.length === 0 && userCityId) {
        setLoading(true);
        try {
          const data = await fetchNearbyDestinations(userCityId); // Gunakan file fetching Anda
          setDestinations(data); // Simpan data ke Zustand
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [userCityId, destinations, setDestinations]);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Mobile jika lebar layar < 640px
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const nextItem = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % destinations.length);
  };

  const prevItem = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length
    );
  };

  const carouselItems = Array.from({ length: 5 }, (_, i) => {
    const index = (startIndex + i) % destinations.length;
    return destinations[index];
  });

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Near By Destinations</h2>
      {loading ? (
        <div className="flex gap-2 md:gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                isMobile
                  ? "min-w-[45%] max-w-[45%]"
                  : "sm:min-w-[250px] sm:max-w-[250px]"
              }`}
            >
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : destinations.length === 0 ? (
        <div className="text-center">No destinations found.</div>
      ) : (
        <div className="relative flex items-center">
          {!isMobile && (
            <button
              onClick={prevItem}
              className="absolute top-1/2 -translate-y-1/2 -left-14 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800"
              aria-label="Previous"
            >
              <FaChevronLeft size={20} />
            </button>
          )}
          <div className="flex overflow-x-auto md:overflow-hidden gap-2 md:gap-4 w-full scrollbar-hide">
            {(isMobile ? destinations : carouselItems).map((destination) => (
              <div
                key={destination.id}
                className={`flex-shrink-0 ${
                  isMobile
                    ? "min-w-[45%] max-w-[45%]"
                    : "sm:min-w-[250px] sm:max-w-[250px]"
                }`}
              >
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
          {!isMobile && (
            <button
              onClick={nextItem}
              className="absolute top-1/2 -translate-y-1/2 -right-14 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800"
              aria-label="Next"
            >
              <FaChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default NearByDestinations;
