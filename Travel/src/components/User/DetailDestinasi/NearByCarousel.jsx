import React, { useEffect, useState } from "react";
import useNearbyStore from "../../../store/nearByStore";
import DestinationCard from "../../common/DestinationCard";
import { fetchNearbyDestinations } from "../../../utils/apiUtils";
import useAuthStore from "../../../store/authStore";
import SkeletonCard from "../../common/SkeletonCard";

const NearbyCarousel = () => {
  const { destinations, setDestinations } = useNearbyStore();
  const [loading, setLoading] = useState(false);
  const userCityId = useAuthStore((state) => state.auth.city);

  useEffect(() => {
    const fetchData = async () => {
      if (destinations.length === 0) {
        setLoading(true);
        try {
          const data = await fetchNearbyDestinations(userCityId);
          setDestinations(data);
        } catch (error) {
          console.error("Failed to fetch nearby destinations:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [destinations, setDestinations]);

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4">More Like This</h2>
      {loading ? (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="mb-2 flex-shrink-0 w-[200px] sm:w-[250px] md:w-[295px]"
            >
              <SkeletonCard />
            </div>
          ))}
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center">No destinations available.</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="mb-2 flex-shrink-0 w-[200px] sm:w-[250px] md:w-[295px]"
            >
              <DestinationCard destination={destination} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NearbyCarousel;
