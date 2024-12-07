const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white shadow-lg rounded-lg p-4">
      <div className="h-36 bg-gray-300 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-300 rounded-md mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded-md "></div>
    </div>
  );
};

export default SkeletonCard;
