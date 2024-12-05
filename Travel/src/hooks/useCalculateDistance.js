// src/hooks/useCalculateDistance.js
import { useState } from "react";

const useCalculateDistance = () => {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState("");

  const calculateDistance = async (originCoord, destCoord) => {
    const apiKey = "5b3ce3597851110001cf62483a8056d98cdb4e0a8376166e1cc1e650";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoord[1]},${originCoord[0]}&end=${destCoord[1]},${destCoord[0]}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const distanceInKm = data.features[0].properties.summary.distance / 1000;
      const durationInSeconds = data.features[0].properties.summary.duration;

      const hours = Math.floor(durationInSeconds / 3600); // Jam
      const minutes = Math.floor((durationInSeconds % 3600) / 60); // Menit

      setDistance(distanceInKm.toFixed(2));
      setTime(`${hours} jam ${minutes} menit`);
    } catch (error) {
      console.error("Error fetching distance:", error);
      setDistance(0);
      setTime("0 jam 0 menit");
    }
  };

  return { distance, time, calculateDistance, setDistance, setTime };
};

export default useCalculateDistance;
