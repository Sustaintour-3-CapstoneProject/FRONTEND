import React, { useEffect, useState } from "react";
import { fetchDestinations } from "../../../utils/apiUtils";
import { fetchDestinationsAPI } from "../../../utils/apiUtils"; // Fungsi untuk cityId
import DestinationCard from "../../common/DestinationCard";
import SkeletonCard from "../../common/SkeletonCard";

const SimilarDestinations = ({ category, city, currentDestinationId }) => {
  const [similarDestinations, setSimilarDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarDestinations = async () => {
      setLoading(true);
      try {
        // Fetch berdasarkan cityId
        const cityDestinations = await fetchDestinationsAPI(city?.name);

        // Fetch berdasarkan category
        const categoryDestinations = await fetchDestinations("", "", category);

        // Gabungkan dan filter hasilnya
        const combinedDestinations = cityDestinations.filter((cityDest) =>
          categoryDestinations.some(
            (catDest) =>
              catDest.id === cityDest.id && catDest.id !== currentDestinationId
          )
        );

        setSimilarDestinations(combinedDestinations);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (category && city?.name) {
      fetchSimilarDestinations();
    }
  }, [category, city, currentDestinationId]);

  return (
    <section className="py-6">
      <h2 className="text-xl font-semibold mb-4  text-gray-700">
        More Like This
      </h2>
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
      ) : similarDestinations.length === 0 ? (
        <div className=" text-gray-500">No similar destinations available.</div>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {similarDestinations.map((destination) => (
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

export default SimilarDestinations;
