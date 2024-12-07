import React from "react";
import { HiPlay } from "react-icons/hi";

const VideoSectionSkeleton = () => (
  <div className="space-y-4">
    {/* Title Placeholder */}
    <div className="w-1/4 h-6 bg-gray-300 rounded-lg animate-pulse"></div>

    {/* Video Skeletons */}
    <div className="flex space-x-6 overflow-x-auto">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-[300px] h-[580px] bg-gray-300 rounded-lg animate-pulse relative flex items-center justify-center"
        >
          {/* Icon Play */}
          <HiPlay size={50} className="text-gray-500" />
        </div>
      ))}
    </div>
  </div>
);

export default VideoSectionSkeleton;
