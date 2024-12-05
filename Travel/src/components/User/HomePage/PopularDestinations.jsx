import React from "react";
import destinations from "../../../data/destinationData";

export default function PopularDestinations() {
  return (
    <section className="px-4  bg-white">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Popular Destinations
      </h2>
      <div className="flex space-x-6 overflow-x-auto">
        {destinations.map((destination) =>
          destination.videoContent.map((video, index) => (
            <div
              key={`${destination.id}-${index}`}
              className="flex-none w-[250px] bg-gray-100 rounded-lg shadow-lg relative group"
            >
              {/* Video Container */}
              <div className="relative overflow-hidden rounded-lg">
                <iframe
                  src={video.video}
                  width="100%"
                  height="500"
                  className="rounded-lg"
                  allow="autoplay; encrypted-media"
                  title={`video-${destination.id}-${index}`}
                />
                {/* Overlay for Text */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-4 py-2">
                  <p className="text-sm text-white font-semibold">
                    {video.title}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
