import SearchCard from "../../components/Admin/SearchCard";
import Card from "../../components/Admin/Card";
import ReusableTable from "../../components/Admin/ReusableTable";

import { IoMapSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const DestinationPage = () => {
  const column = [
    { key: "name", label: "Destination Name" },
    { key: "description", label: "Destination Description" },
    { key: "ticket_price", label: "Entrance Ticket Price" },
    { key: "operational_hours", label: "Operating Hours" },
    { key: "address", label: "Destination Address" },
  ];

  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async (searchQuery = "") => {
    try {
      const url = searchQuery
        ? `/destination?name=${searchQuery}`
        : "/destination";
      const response = await axiosInstance.get(url);
      const data = response.data.destinations;
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleSearch = (query) => {
    fetchDestinations(query);
  };

  const handleDelete = async (item) => {
    if (item) {
      try {
        // Mengambil ID dari data destinasi
        const url = `/destination/${item}`; // Endpoint DELETE
        await axiosInstance.delete(url); // Menghapus data ke server

        // Perbarui daftar destinasi setelah berhasil dihapus
        fetchDestinations();
        alert("Destinasi berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus destinasi:", error);
        alert("Terjadi kesalahan saat menghapus destinasi.");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 h-fit">
        <div className="w-full md:w-1/2 flex">
          <Card
            title="Total Destination"
            totalData={destinations ? destinations.length : 0}
            icon={<IoMapSharp className="text-3xl" />}
            className="flex-grow"
          />
        </div>
        <div className="w-full flex">
          <SearchCard
            topic="Destination"
            create
            className="flex-grow"
            link="/admin/destination/create"
            onSearch={handleSearch}
          />
        </div>
      </div>
      <div className="my-5">
        {destinations && destinations.length > 0 ? (
          <ReusableTable
            columns={column}
            data={destinations}
            onDelete={handleDelete}
          />
        ) : (
          <div className="bg-white w-full flex items-center justify-center">
            <h1 className="text-center">Data tidak ada hiks</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
