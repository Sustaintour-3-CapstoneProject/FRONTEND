import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DestinationCard from "../../common/DestinationCard";
import SkeletonCard from "../../common/SkeletonCard";
import useAuthStore from "../../../store/authStore";
import useNearbyStore from "../../../store/nearByStore";
import { fetchNearbyDestinations } from "../../../utils/apiUtils";

const NearByDestinations = () => {
  const { auth } = useAuthStore(); // Data autentikasi
  const { registerAuth } = useAuthStore(); // Data registrasi
  const { destinations, setDestinations } = useNearbyStore();
  const userCity = auth?.city || registerAuth?.city; // Ambil username dengan fallback
  const [startIndex, setStartIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const loadDestinations = async () => {
      setLoading(true);
      try {
        const data = await fetchNearbyDestinations(userCity);
        setDestinations(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadDestinations();
  }, [userCity]);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Cek apakah di perangkat mobile
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

  // Menggandakan array hanya jika jumlah destinasi lebih dari 5 dan bukan dalam mode mobile
  const infiniteDestinations =
    !isMobile && destinations.length >= 5
      ? [...destinations, ...destinations]
      : destinations;

  // Menampilkan destinasi sesuai dengan mode mobile atau desktop
  const displayedItems = isMobile
    ? infiniteDestinations
    : infiniteDestinations.slice(startIndex, startIndex + 5);

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold mb-6">Near By Destinations</h2>
      {loading ? (
        <div className="flex gap-2 md:gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
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
        <div className="relative">
          {/* Tombol Previous */}
          {!isMobile && destinations.length >= 5 && (
            <button
              onClick={prevItem}
              className="absolute top-1/2 -translate-y-1/2 -left-14 bg-black text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800"
              aria-label="Previous"
            >
              <FaChevronLeft size={20} />
            </button>
          )}
          <div
            className={`flex gap-2 md:gap-4 w-full transition-transform duration-300 ease-in-out ${
              isMobile ? "overflow-x-auto" : "overflow-hidden"
            }`}
            style={{
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
            }}
          >
            {displayedItems.map((destination, index) => (
              <div
                key={index}
                className={`flex-shrink-0 ${
                  isMobile
                    ? "min-w-[45%] max-w-[45%] snap-start"
                    : "sm:min-w-[250px] sm:max-w-[250px] snap-start"
                }`}
              >
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>

          {/* Tombol Next */}
          {!isMobile && destinations.length >= 5 && (
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
