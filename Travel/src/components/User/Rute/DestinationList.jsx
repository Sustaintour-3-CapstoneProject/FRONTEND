import React, { useState } from "react";
import { Pagination } from "flowbite-react";

const DestinationList = ({
  destinations,
  currentPage,
  itemsPerPage,
  setCurrentPage,
  handleSelectDestination,
}) => {
  const [selectedDestination, setSelectedDestination] = useState(null);

  const totalPages = Math.ceil(destinations.length / itemsPerPage);

  const paginatedDestinations = destinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log(paginatedDestinations);
  const toggleDestination = (dest) => {
    if (selectedDestination === dest.name) {
      // Batalkan pilihan jika sama dengan yang sudah dipilih
      setSelectedDestination(null);
      handleSelectDestination(null); // Opsional: Beri tahu parent bahwa tidak ada pilihan
    } else {
      // Pilih destinasi baru
      setSelectedDestination(dest.name);
      handleSelectDestination(dest);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Daftar Destinasi</h3>
      <div className="grid grid-cols-1 gap-4">
        {paginatedDestinations.map((dest) => (
          <div
            key={dest.id}
            className="border p-4 rounded-md shadow-sm flex justify-between items-center"
          >
            <div className="">
              <h4 className="font-medium">{dest.name}</h4>
              <h4 className="font-medium">{dest.ticket_price}</h4>
            </div>
            <button
              onClick={() => toggleDestination(dest)}
              className={`px-4 py-2 rounded-md transition ${
                selectedDestination === dest.name
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              {selectedDestination === dest.name ? "Cancel" : "Pilih"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default DestinationList;
