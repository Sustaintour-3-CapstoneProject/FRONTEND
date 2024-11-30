import React from "react";
import destinations from "../../data/destinationData";
import { Button, Pagination } from "flowbite-react";

import SearchInput from "../../components/common/SearchInput";
import FilterButton from "../../components/User/Destination/FilterButton";
import DestinationCard from "../../components/common/DestinationCard";
import SortButton from "../../components/User/Destination/SortButton";

export default function Destination() {
  return (
    <div>
      {" "}
      <div className=" bg-slate-100">
        {/* Header */}
        <div className="max-w-7xl mx-auto py-8">
          <header className="flex justify-center items-center mb-8 space-x-3">
            <SearchInput />
            <FilterButton />
            <SortButton />
          </header>

          {/* Destinations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

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
    </div>
  );
}
