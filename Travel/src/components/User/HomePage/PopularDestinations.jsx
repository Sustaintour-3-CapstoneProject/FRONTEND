import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance"; // Pastikan path sesuai
import PopularSkeleton from "./PopularSkeleton";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState({});
  const [expandedVideos, setExpandedVideos] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axiosInstance.get("/video-content/most");
        const data = response.data.data;

        // Ambil video pertama dari setiap destinasi
        const filteredVideos = data
          .map((destination) => {
            // Periksa apakah destinasi memiliki video
            if (destination.videos && destination.videos.length > 0) {
              return destination.videos[0]; // Ambil video pertama
            }
            return null; // Jika tidak ada video, kembalikan null
          })
          .filter(Boolean) // Hapus nilai null dari array
          .slice(0, 5); // Ambil hanya 5 video teratas

        setVideos(filteredVideos); // Set array video terfilter ke state
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setIsLoading(false); // Selesaikan proses loading
      }
    };

    fetchVideos();
  }, []);

  const toggleDescription = (index) => {
    setExpandedVideos((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (isLoading) return <PopularSkeleton />;
  if (!videos || videos.length === 0) {
    return <p className="text-gray-500 mt-4">No videos available.</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="font-bold text-2xl text-gray-900 my-4">
        Popular Destinations
      </h2>
      <div className="flex space-x-5 overflow-x-auto">
        {videos.map((videoData, index) => {
          // Membentuk URL embed dari video TikTok
          const embedUrl = `https://www.tiktok.com/embed/${
            videoData.url.split("/").pop().split("?")[0]
          }?autoplay=1`;

          return (
            <div
              key={videoData.id}
              className="flex-none w-[315px] overflow-hidden rounded-lg shadow-lg relative group my-4"
            >
              {/* Video Player */}
              <div className="relative overflow-hidden rounded-lg">
                {/* Thumbnail Placeholder */}
                {!isVideoPlaying[index] && (
                  <div
                    className="bg-gray-900 w-full h-[590px] flex items-start justify-center cursor-pointer rounded-lg relative"
                    onClick={() =>
                      setIsVideoPlaying({
                        ...isVideoPlaying,
                        [index]: true,
                      })
                    }
                  >
                    <iframe
                      src={embedUrl}
                      width="100%"
                      height="575"
                      frameBorder="0"
                      allow="encrypted-media; autoplay; fullscreen"
                      allowFullScreen
                      title={`TikTok Video ${index}`}
                      className="rounded-lg mb-20"
                    ></iframe>
                  </div>
                )}
              </div>
              {/* Overlay for Text */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-2 rounded-lg overflow-hidden">
                <p
                  className={`text-sm text-white font-semibold transition-all duration-300 cursor-pointer ${
                    expandedVideos[index] ? "line-clamp-none" : "line-clamp-1"
                  }`}
                  onClick={() => toggleDescription(index)}
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                >
                  {videoData.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoSection;
