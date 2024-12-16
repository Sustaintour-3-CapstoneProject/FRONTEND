import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

import PlainCard from "../../components/Admin/PlainCard";
import SelectInput from "../../components/Admin/SelectInput";
import LabelInput from "../../components/Admin/LabelInput";
import { Button } from "flowbite-react";

const DetailContentPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };
  const queryParams = new URLSearchParams(location.search);
  const urlFromQuery = queryParams.get("videoUrl");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/destination/${id}`);
        const destinationData = response.data.destination;
        setData(destinationData);

        if (urlFromQuery) {
          setSelectedVideoUrl(decodeURIComponent(urlFromQuery));
        } else if (destinationData.video_contents?.length > 0) {
          setSelectedVideoUrl(destinationData.video_contents[0].url);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id, urlFromQuery]);

  const extractTikTokVideoId = (url) => {
    const patterns = [/\/video\/(\d+)/, /@[\w.]+\/video\/(\d+)/, /v\/(\d+)/];

    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const getTikTokEmbedUrl = (url) => {
    if (url.includes("tiktok.com")) {
      const videoId = extractTikTokVideoId(url);
      return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : url;
    }
    return url;
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <PlainCard
        className="py-2"
        title="Content Details"
        description="View Content Details"
      />
      <div className="flex md:flex-row flex-col my-5 gap-5 bg-white rounded-3xl shadow-lg p-6 w-full">
        <div className="lg:w-2/5 w-full px-5 space-y-6">
          {selectedVideoUrl && (
            <iframe
              width="100%"
              height="600"
              src={getTikTokEmbedUrl(selectedVideoUrl)}
              title="Video Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <div className="space-y-6 w-full px-4">
          <SelectInput
            label="Destination City"
            id="destination_city"
            name="destination_city"
            placeholder={data.city?.name}
          />
          <SelectInput
            label="Category"
            id="category"
            name="category"
            placeholder={data.category}
          />
          <LabelInput
            label="Destination Description"
            name="description"
            type="description"
            value={data.description}
          />

          {selectedVideoUrl && (
            <div className="cursor-pointer p-2 rounded">
              <LabelInput
                label="Link Content"
                name="link_content"
                type="text"
                value={selectedVideoUrl}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <Button color="blue" onClick={handleBack}>
          Kembali
        </Button>
      </div>
    </div>
  );
};

export default DetailContentPage;
