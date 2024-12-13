import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance"; // Sesuaikan dengan lokasi file axiosInstance
import HeroImageSection from "../../components/User/DetailDestinasi/HeroSection";
import TitleAndInfoSection from "../../components/User/DetailDestinasi/TittleAndInfoSection";
import DescriptionSection from "../../components/User/DetailDestinasi/DescriptionSection";
import FacilitiesSection from "../../components/User/DetailDestinasi/FacilitiesSection";
import VideoSection from "../../components/User/DetailDestinasi/VideoSection";
import HeroImageSkeleton from "../../components/User/DetailDestinasi/HeroSectionSkeleton";
import TitleAndInfoSkeleton from "../../components/User/DetailDestinasi/TitleAndInfoSkeleton";
import DescriptionSkeleton from "../../components/User/DetailDestinasi/DescriptionSkeleton";
import FacilitiesSkeleton from "../../components/User/DetailDestinasi/FacilitiesSkeleton";
import VideoSectionSkeleton from "../../components/User/DetailDestinasi/VideoSectionSkeleton";
import { fetchDestinationById } from "../../utils/apiUtils"; // Sesuaikan dengan lokasi file
import SimilarDestinations from "../../components/User/DetailDestinasi/SimilarDestination"; // Import komponen SimilarDestinations

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(destination);
  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await fetchDestinationById(id); // Ambil detail destinasi
        setDestination(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return (
      <section className="py-10 px-6 mx-auto font-poppins space-y-10">
        <HeroImageSkeleton />
        <TitleAndInfoSkeleton />
        <DescriptionSkeleton />
        <FacilitiesSkeleton />
        <VideoSectionSkeleton />
      </section>
    );
  }

  if (error || !destination) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">
          Destination not found!
        </h2>
        {error && <p className="text-gray-600 mt-2">{error}</p>}
      </div>
    );
  }

  return (
    <section className="py-10 px-6 mx-auto font-poppins">
      {/* Hero Image */}
      <HeroImageSection images={destination.images} />
      {/* Title and Info */}
      <TitleAndInfoSection destination={destination} />
      {/* Description */}
      <DescriptionSection description={destination.description} />
      {/* Facilities Section */}
      <FacilitiesSection facilities={destination.facilities} />
      {/* Video Section */}
      <VideoSection videos={destination.video_contents} />

      {/* Rekomendasi Destinasi Serupa */}
      <SimilarDestinations
        category={destination.category}
        currentDestinationId={destination.id}
        city={destination.city}
      />
    </section>
  );
};

export default DestinationDetail;
