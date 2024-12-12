import React from "react";

const DescriptionSection = ({ description }) => {
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-lg text-gray-700">
        Explore the Beauty
      </h4>
      <p className="text-gray-600 mt-2 leading-relaxed">{description}</p>
    </div>
  );
};

export default DescriptionSection;
