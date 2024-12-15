import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import SearchCard from "../../components/Admin/SearchCard";
import Card from "../../components/Admin/Card";
import ReusableTable from "../../components/Admin/ReusableTable";

import { FaPlay } from "react-icons/fa";

const ContentPage = () => {
  const column = [
    { key: "name", label: "Destination Name" },
    { key: "description", label: "Destination Description" },
    {
      key: "video_contents",
      label: "Content Link",
      render: (videos) => {
        if (videos && videos.length > 0) {
          return <>{videos[0].url || "Video Link"}</>;
        }
        return "No Video";
      },
    },
  ];

  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async (name = "") => {
    try {
      const response = await axiosInstance.get("/destination", {
        params: { name },
      });

      const data = response.data.destinations;
      setContent(data);
    } catch (error) {
      console.error(error);
      setContent([]);
    }
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    fetchContent(search);
  };

  const handleDelete = async (item) => {
    try {
      await axiosInstance.delete(`/destination/${item.id}`);
      fetchContent(searchTerm);
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-1/2 flex">
          <Card
            title="Total Content"
            totalData={content ? content.length : 0}
            icon={<FaPlay className="text-3xl" />}
            className="flex-grow"
          />
        </div>
        <div className="w-full flex">
          <SearchCard
            topic="content"
            create
            className="flex-grow"
            link="/admin/content/create"
            onSearch={handleSearch}
          />
        </div>
      </div>
      <div className="my-5">
        {content ? (
          <ReusableTable
            columns={column}
            data={content}
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

export default ContentPage;
