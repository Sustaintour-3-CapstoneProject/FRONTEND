import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapComponent = ({ origin, destination }) => {
  const indonesiaBounds = [
    [-11, 95], // Titik barat daya
    [6, 141], // Titik timur laut
  ];

  const SetViewBounds = ({ origin, destination }) => {
    const map = useMap();
    useEffect(() => {
      if (origin && destination) {
        const bounds = [origin.position, destination.position];
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      } else if (origin) {
        map.setView(origin.position, 13);
      } else if (destination) {
        map.setView(destination.position, 13);
      }
    }, [origin, destination, map]);
    return null;
  };

  return (
    <MapContainer
      bounds={indonesiaBounds}
      maxBounds={indonesiaBounds}
      minZoom={5}
      maxZoom={18}
      zoom={7}
      className="w-full h-[250px] md:h-[450px] rounded-lg shadow-md z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Marker untuk origin */}
      {origin && (
        <Marker position={origin.position} icon={customIcon}>
          <Popup>
            <strong>{origin.name}</strong>
          </Popup>
        </Marker>
      )}

      {/* Marker untuk destination */}
      {destination && (
        <Marker position={destination.position} icon={customIcon}>
          <Popup>
            <strong>{destination.name}</strong>
          </Popup>
        </Marker>
      )}

      {/* Polyline */}
      {origin && destination && (
        <Polyline
          positions={[origin.position, destination.position]}
          color="blue"
        />
      )}

      <SetViewBounds origin={origin} destination={destination} />
    </MapContainer>
  );
};

export default MapComponent;
