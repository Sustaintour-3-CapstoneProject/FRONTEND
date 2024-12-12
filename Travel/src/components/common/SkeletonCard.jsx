const SkeletonCard = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="animate-pulse bg-gray-100 shadow-lg rounded-lg p-4">
        <div className="h-36 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md "></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
