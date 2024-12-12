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

const MapComponent = ({ origin, destination }) => {
  const indonesiaBounds = [
    [-11, 95], // Titik barat daya (bawah kiri)
    [6, 141], // Titik timur laut (atas kanan)
  ];

  // Komponen untuk memperbarui zoom otomatis
  const SetViewBounds = ({ origin, destination }) => {
    const map = useMap();

    useEffect(() => {
      if (origin && destination) {
        // Jika ada origin dan destination, atur tampilan agar lebih fokus
        const bounds = [origin.position, destination.position];
        map.fitBounds(bounds, {
          padding: [50, 50], // Padding untuk jarak antar marker
          maxZoom: 12, // Maksimum zoom saat origin dan destination terlihat
        });
      } else if (origin) {
        // Jika hanya origin tersedia, fokus ke origin dengan zoom default
        map.setView(origin.position, 13);
      } else if (destination) {
        // Jika hanya destination tersedia, fokus ke destination dengan zoom default
        map.setView(destination.position, 13);
      }
    }, [origin, destination, map]);

    return null;
  };

  return (
    <MapContainer
      bounds={indonesiaBounds}
      maxBounds={indonesiaBounds}
      maxBoundsViscosity={1.0}
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
        <Marker position={origin.position}>
          <Popup>
            <strong>{origin.name}</strong>
          </Popup>
        </Marker>
      )}

      {/* Marker untuk destination */}
      {destination && (
        <Marker position={destination.position}>
          <Popup>
            <strong>{destination.name}</strong>
          </Popup>
        </Marker>
      )}

      {/* Polyline antara origin dan destination */}
      {origin && destination && (
        <Polyline
          positions={[origin.position, destination.position]}
          color="blue"
        />
      )}

      {/* Komponen untuk mengatur zoom otomatis */}
      <SetViewBounds origin={origin} destination={destination} />
    </MapContainer>
  );
};

export default MapComponent;
