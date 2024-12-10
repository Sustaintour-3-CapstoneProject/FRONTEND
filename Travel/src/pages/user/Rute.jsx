import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "flowbite-react";

import AlertModal from "../../components/common/AlertModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import { HiExclamationCircle, HiCheckCircle } from "react-icons/hi";
import useCalculateDistance from "../../hooks/useCalculateDistance";
import CityDropdown from "../../components/User/Rute/CityDropdown";
// Ikon marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
import { fetchDestinationsAPI } from "../../services/FetchDestinationRute";
import DestinationList from "../../components/User/Rute/DestinationList";
import RouteSummary from "../../components/User/Rute/RouteSummary";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../../api/axiosInstance";

const Rutes = () => {
  const { distance, time, calculateDistance, setDistance, setTime } =
    useCalculateDistance();
  const { auth } = useAuthStore();

  const [cities, setCities] = useState([]); // Data kota dari API
  const [origin, setOrigin] = useState(null); // Kota Asal
  const [destination, setDestination] = useState(null); // Kota Tujuan
  const [destinations, setDestinations] = useState([]); // Daftar destinasi
  const [selectedDestination, setSelectedDestination] = useState(null); // Destinasi dipilih
  const [totalCost, setTotalCost] = useState(0); // Total biaya
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Modal error
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal sukses
  const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(false); // State untuk modal tata cara
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Jumlah item per halaman

  // Ambil data kota dari Backend
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://www.tripwise.my.id/city");
        const data = await response.json();

        // Map data sesuai kebutuhan komponen
        const formattedCities = data.cities.map((city) => ({
          id: city.id, // Tambahkan ID kota
          name: city.name,
          position: [parseFloat(city.lat), parseFloat(city.long)],
        }));

        setCities(formattedCities); // Simpan data yang diformat ke state
      } catch (error) {
        console.error("Gagal mengambil data kota:", error);
      }
    };

    fetchCities();
  }, []);

  // Fetch destinations when destination changes
  useEffect(() => {
    const fetchDestinations = async () => {
      if (!destination?.id) {
        setDestinations([]);
        return;
      }
      setIsLoading(true);
      try {
        const destinationsData = await fetchDestinationsAPI(destination.id);
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, [destination]);

  useEffect(() => {
    if (origin && destination) {
      const originCoord = origin.position;
      const destCoord = destination.position;

      if (originCoord && destCoord) {
        calculateDistance(originCoord, destCoord);
      }
    }
  }, [origin, destination]);

  const handleSelectDestination = (dest) => {
    if (!origin) {
      setIsErrorModalOpen(true);
      return;
    }
    setSelectedDestination(dest);
    setTotalCost(dest.ticket_price);
  };

  const handleSave = () => {
    if (!origin || !destination || !selectedDestination) {
      setIsErrorModalOpen(true);
      return;
    }
    if (origin.id === destination.id) {
      alert("Kota asal dan tujuan tidak boleh sama.");
      return;
    }
    setIsConfirmationOpen(true);
  };

  const handleConfirmSave = async () => {
    setIsConfirmationOpen(false);

    // Ubah nama properti sesuai kebutuhan backend
    const savedData = {
      userID: auth.id_user,
      originCityName: origin.name,
      destinationCityName: destination.name,
      destinations: selectedDestination, // Asumsikan selectedDestination memiliki properti `name`
      // cost: totalCost,
      // distance_km: distance,
      // duration_minutes: time,
    };
    console.log("Data yang akan disimpan:", savedData);
    try {
      const response = await axiosInstance.post("/route", savedData);
      console.log("Respon dari backend:", response.data);

      setIsSuccessModalOpen(true); // Buka modal sukses
    } catch (error) {
      console.error("Gagal menyimpan data ke backend:", error);
      alert("Terjadi kesalahan saat menyimpan data. Coba lagi.");
    }
  };

  const handleRefresh = () => {
    setOrigin(null); // Reset kota asal
    setDestination(null); // Reset kota tujuan
    setDestinations([]); // Kosongkan daftar destinasi
    setSelectedDestination(null); // Hilangkan destinasi yang dipilih
    setTotalCost(0); // Reset total biaya
    setDistance(0); // Reset jarak
    setTime(0); // Reset waktu
    setCurrentPage(1); // Reset pagination
  };

  const handleHowToUseClick = () => {
    setIsHowToUseModalOpen(true); // Buka modal
  };

  const closeHowToUseModal = () => {
    setIsHowToUseModalOpen(false); // Tutup modal
  };

  return (
    <div className="flex flex-col my-10 rounded-lg p-3 space-y-4 bg-gray-100 min-h-screen pb-10 font-poppins">
      <h1 className="text-2xl font-bold">Planning Route</h1>
      <div className="flex justify-around items-center  space-x-3 py-3">
        {/* Dropdown Kota asal */}
        <CityDropdown
          label="Origin"
          options={cities}
          value={origin?.id || ""} // Tetap gunakan `id` sebagai nilai yang dipilih
          onChange={setOrigin} // Simpan objek kota
        />
        {/* Dropdown Kota tujuan */}
        <CityDropdown
          label="Destination"
          options={cities}
          value={destination?.id || ""} // Tetap gunakan `id` sebagai nilai yang dipilih
          onChange={setDestination} // Simpan objek kota
        />
        {/* Tombol Refresh */}
        <Button onClick={handleRefresh} color="failure" className=" w-32">
          Refresh
        </Button>
      </div>
      {/* Destinasi */}

      <DestinationList
        destinations={destinations}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        handleSelectDestination={handleSelectDestination}
      />
      {/* Peta */}

      <div className="h-[450px]">
        {origin && destination && (
          <MapContainer
            center={cities.find((city) => city.id == destination.id)?.position}
            zoom={8}
            className="h-[450px] rounded-lg shadow-md"
            style={{ zIndex: 1 }}
          >
            {/* Tile Layer */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker Kota Asal */}
            <Marker
              position={cities.find((city) => city.id == origin.id)?.position}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <span>{origin.name}</span>
              </Tooltip>
            </Marker>

            {/* Marker Kota Tujuan */}
            <Marker
              position={
                cities.find((city) => city.id == destination.id)?.position
              }
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <span>{destination.name}</span>
              </Tooltip>
            </Marker>

            {/* Polyline Menghubungkan Kota Asal ke Tujuan */}
            <Polyline
              positions={[
                cities.find((city) => city.id == origin.id)?.position,
                cities.find((city) => city.id == destination.id)?.position,
              ]}
              color="blue"
              weight={4}
            />
          </MapContainer>
        )}
      </div>

      <RouteSummary
        origin={origin}
        destination={destination}
        distance={distance}
        time={time}
        totalCost={totalCost}
        handleSave={handleSave}
        handleHowToUseClick={handleHowToUseClick}
      />
      <AlertModal
        isOpen={isHowToUseModalOpen}
        title="Tata Cara Menggunakan Fitur Rute"
        message={
          <div className="text-left">
            1. Pilih kota asal dari daftar yang tersedia.
            <br />
            2. Pilih kota tujuan yang ingin Anda kunjungi.
            <br />
            3. Pilih destinasi di kota tujuan dari daftar yang muncul.
            <br />
            4. Klik tombol 'Save Rute' untuk menyimpan rencana rute Anda.
            <br />
            5. Anda dapat melihat total biaya dan jarak estimasi di bagian
            bawah.
          </div>
        }
        onClose={closeHowToUseModal} // Fungsi untuk menutup modal
      />

      {/* Modal Konfirmasi */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onCancel={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmSave}
        message={`Anda akan menyimpan rute ini apkah anda yakin?`}
      />
      {/* Error Modal */}
      <AlertModal
        isOpen={isErrorModalOpen}
        title="Validasi Gagal"
        icon={<HiExclamationCircle className="text-red-500 w-20 h-20" />}
        message="Harap isi semua bidang: kota asal, kota tujuan, dan destinasi."
        onClose={() => setIsErrorModalOpen(false)}
      />

      {/* Success Modal */}
      <AlertModal
        isOpen={isSuccessModalOpen}
        title="Sukses"
        icon={<HiCheckCircle className="text-green-500 w-20 h-20" />}
        message="Rute Anda berhasil disimpan. Silakan cek data Anda!"
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Rutes;
