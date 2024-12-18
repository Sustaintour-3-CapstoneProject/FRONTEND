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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async (name = "") => {
    try {
      const response = await axiosInstance.get("/destination", {
        params: { name },
      });

      const data = response.data.destinations;
      setDestinations(data);
    } catch (error) {
      console.error(error);
      setDestinations([]);
    }
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    fetchDestinations(search);
  };

  const handleDelete = async (item) => {
    try {
      await axiosInstance.delete(`/destination/${item.id}`);
      fetchDestinations(searchTerm);
    } catch (error) {
      console.error("Error deleting destination:", error);
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
            addText="Add Destination"
            link="/dashboard/destination/add-destination"
            onSearch={handleSearch}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="my-5">
        {destinations && destinations.length > 0 ? (
          <ReusableTable
            columns={column}
            data={destinations}
            onDelete={handleDelete}
            route="destination"
          />
        ) : (
          <div className="bg-white w-full flex items-center justify-center">
            <h1 className="text-center">Data tidak ada</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
