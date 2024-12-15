import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import SearchCard from "../../components/Admin/SearchCard";
import Card from "../../components/Admin/Card";
import ReusableTable from "../../components/Admin/ReusableTable";

import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ContentPage = () => {
  const [content, setContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const extractVideoContents = (destinations) => {
    const expandedData = [];

    destinations.forEach((destination) => {
      if (
        !destination.video_contents ||
        destination.video_contents.length === 0
      ) {
        expandedData.push({
          id: destination.id,
          name: destination.name,
          description: destination.description,
          video_contents: [],
        });
      } else {
        destination.video_contents.forEach((video) => {
          expandedData.push({
            id: destination.id,
            name: destination.name,
            description: destination.description,
            video_contents: [video],
          });
        });
      }
    });

    return expandedData;
  };

  const fetchContent = async (name = "") => {
    try {
      const response = await axiosInstance.get("/destination", {
        params: { name },
      });

      const data = response.data.destinations;
      const expandedData = extractVideoContents(data);
      console.log(expandedData);
      setContent(expandedData);
    } catch (error) {
      console.error(error);
      setContent([]);
    }
  };

  const column = [
    { key: "name", label: "Destination Name" },
    { key: "description", label: "Destination Description" },
    {
      key: "video_contents",
      label: "Content Link",
      render: (videos) => {
        if (videos && videos.length > 0) {
          return (
            <div className="space-y-2">
              {videos.map((video, index) => (
                <div key={index} className="flex items-center space-x-2 group">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-[250px]"
                  >
                    {video.url}
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaPlay className="text-gray-500 hover:text-blue-500" />
                  </button>
                </div>
              ))}
            </div>
          );
        }
        return "No Video";
      },
    },
  ];

  useEffect(() => {
    fetchContent();
  }, []);

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

  const handleRowClick = (row) => {
    if (row.video_contents && row.video_contents.length > 0) {
      navigate(
        `/dashboard/content/content-details/${
          row.id
        }?videoUrl=${encodeURIComponent(row.video_contents[0].url)}`
      );
    } else {
      navigate(`/dashboard/content/content-details/${row.id}`);
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
            link="/dashboard/content/add-content"
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
            route="content"
            itemsPerPage={10}
            onRowClick={handleRowClick}
            actionColumn={false}
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
