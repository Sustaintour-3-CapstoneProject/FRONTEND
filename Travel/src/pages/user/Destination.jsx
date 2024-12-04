import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Path disesuaikan
import { Button, Pagination } from "flowbite-react";

import SearchInput from "../../components/common/SearchInput";
import FilterButton from "../../components/User/Destination/FilterButton";
import DestinationCard from "../../components/common/DestinationCard";
import SortButton from "../../components/User/Destination/SortButton";

export default function Destination() {
  const [destinations, setDestinations] = useState([]); // State untuk menyimpan data
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangkap error
  console.log(destinations);
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true); // Mulai loading
        setError(null); // Reset error
        const response = await axiosInstance.get("/destination");
        console.log(response.data); // Periksa struktur data
        setDestinations(response.data.destinations); // Simpan data dari API
      } catch (err) {
        setError(err.message || "Failed to fetch destinations."); // Tangani error
      } finally {
        setLoading(false); // Akhiri loading
      }
    };

    fetchDestinations(); // Panggil fungsi fetch
  }, []);

  return (
    <div className="bg-slate-100 my-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto py-8">
        <header className="flex justify-center items-center mb-8 space-x-3">
          <SearchInput />
          <FilterButton />
          <SortButton />
        </header>

        {/* Error Handling */}
        {error && (
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center">
            <p>Loading...</p>
          </div>
        ) : (
          // Destinations Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(destinations) && destinations.length > 0 ? (
              destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))
            ) : (
              <p className="col-span-full text-center">
                No destinations found.
              </p>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8">
          <Pagination
            currentPage={1}
            totalPages={3}
            onPageChange={(page) => console.log(`Navigated to page: ${page}`)}
          />
        </div>
      </div>
    </div>
  );
}
