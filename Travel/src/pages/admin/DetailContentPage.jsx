import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

import PlainCard from "../../components/Admin/PlainCard";
import SelectInput from "../../components/Admin/SelectInput";
import LabelInput from "../../components/Admin/LabelInput";

import { Button } from "flowbite-react";

const DetailContentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/destination/${id}`);
        const data = response.data.destination;
        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    fetchData();
  }, []);

  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

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

  return (
    <div>
      <PlainCard
        className="py-2"
        title="Add Content"
        description="Add Content Details"
      />
      <div className="flex md:flex-row flex-col my-5 gap-5 bg-white rounded-3xl shadow-lg p-6 w-full">
        <div className="w-2/5 px-5 space-y-6">
          {data.video_contents?.map((video, index) => (
            <iframe
              key={video.id}
              width="100%"
              height="600"
              src={getTikTokEmbedUrl(video.url)}
              title="Video Preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ))}
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
          {data.video_contents?.map((video, index) => (
            <LabelInput
              key={video.id}
              label="Link Content"
              name="link_content"
              type="text"
              value={video.url}
            />
          ))}
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
