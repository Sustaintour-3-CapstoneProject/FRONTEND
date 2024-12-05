import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // Path disesuaikan
import { Pagination } from "flowbite-react";

import SkeletonCard from "../../components/common/SkeletonCard";
import SearchInput from "../../components/common/SearchInput";
import FilterButton from "../../components/User/Destination/FilterButton";
import DestinationCard from "../../components/common/DestinationCard";
import SortButton from "../../components/User/Destination/SortButton";
import { useSearchParams } from "react-router-dom";

export default function Destination() {
  const [destinations, setDestinations] = useState([]); // State untuk menyimpan data
  const [filteredDestinations, setFilteredDestinations] = useState([]); // Data untuk pagination
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk menangkap error
  const [sortOption, setSortOption] = useState(""); // Sort option
  const [currentPage, setCurrentPage] = useState(1); // Halaman aktif
  const itemsPerPage = 12; // Jumlah item per halaman
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("name") || ""; // Mendapatkan nilai dari query string

  // Fetch data dari API
  const fetchDestinations = async (query) => {
    console.log("Fetching destinations with query:", query); // Log query
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("/destination", {
        params: {
          name: query,
          sort: sortOption,
        },
      });
      console.log("API response:", response.data); // Log hasil API
      setDestinations(response.data.destinations || []);
    } catch (err) {
      setError(err.message || "Failed to fetch destinations.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce untuk search query
  useEffect(() => {
    console.log(
      "Triggering fetch for searchQuery:",
      searchQuery,
      "sortOption:",
      sortOption
    );
    const debounceSearch = setTimeout(() => {
      if (searchQuery.trim().length >= 3 || searchQuery.trim().length === 0) {
        fetchDestinations(searchQuery);
      }
    }, 500); // Waktu debounce 500ms

    return () => clearTimeout(debounceSearch); // Bersihkan timeout saat searchQuery berubah
  }, [searchQuery, sortOption]); // Refetch saat search atau sort berubah

  // Filter data berdasarkan halaman saat ini
  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setFilteredDestinations(
      destinations.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [destinations, currentPage]);

  // Handle sort option
  const handleSort = (option) => {
    setSortOption(option);
    setCurrentPage(1); // Reset halaman ke awal saat sort
  };

  return (
    <div className="  my-10 font-poppins">
      {/* Header */}
      <div className="max-w-full sm:max-w-md md:max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <header className="flex flex-col justify-center md:flex-row md:justify-center md:items-center mb-8 space-y-3 md:space-y-0 md:space-x-3">
          <SearchInput
            value={searchQuery}
            onChange={(value) => setSearchParams({ name: value })}
          />
          <div className="flex justify-center items-center space-x-3">
            <FilterButton />
            <SortButton onSort={handleSort} />
          </div>
        </header>

        {/* Error Handling */}
        {error && (
          <div className="text-center text-red-500">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          // Destinations Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  className="sm:p-2 md:p-4"
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
            currentPage={currentPage}
            totalPages={Math.ceil(destinations.length / itemsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
