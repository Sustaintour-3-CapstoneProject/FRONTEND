import React from "react";
import { Carousel } from "flowbite-react";

const HeroImageSection = ({ images }) => {
  return (
    <div className="relative w-full h-[500px]">
      <Carousel slideInterval={5000} className="h-full">
        {images && images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={`Slide ${index + 1}`}
              className="rounded-lg shadow-lg w-full h-full object-cover object-center md:object-fill"
              onError={(e) => {
                e.target.src = "https://placehold.co/650x500/gray/FefcFFc/png";
                e.target.alt = "Placeholder Image";
              }}
            />
          ))
        ) : (
          <img
            src="https://placehold.co/650x500/gray/FefcFFc/png"
            alt="Placeholder"
            className="rounded-lg shadow-lg w-full h-full object-cover object-center md:object-fill"
          />
        )}
      </Carousel>
    </div>
  );
};

export default HeroImageSection;
