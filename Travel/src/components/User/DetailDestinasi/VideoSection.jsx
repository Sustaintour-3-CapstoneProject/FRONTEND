import React, { useState } from "react";

const VideoSection = ({ videos }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState({});
  const [expandedVideos, setExpandedVideos] = useState({});

  const toggleDescription = (index) => {
    setExpandedVideos((prevState) => ({
      ...prevState,
      [index]: !prevState[index], // Toggle ekspansi untuk video tertentu
    }));
  };

  if (!videos || videos.length === 0) {
    return <p className="text-gray-500 mt-4">No videos available.</p>;
  }

  return (
    <div className="mt-6">
      <h4 className="font-semibold text-lg text-gray-700 mb-4">
        A Visual Escape
      </h4>
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
                      className="rounded-lg mb-20 "
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
                  style={{ wordBreak: "break-word", whiteSpace: "normal" }} // Gaya tambahan
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
