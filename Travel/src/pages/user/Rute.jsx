import React, { useState, useEffect } from "react";
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
import MapComponent from "../../components/User/Rute/Map";

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
  const [isProcessing, setIsProcessing] = useState(false);

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
      setIsProcessing(true);
      try {
        const destinationsData = await fetchDestinationsAPI(destination.id);
        setDestinations(destinationsData);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      } finally {
        setIsProcessing(false);
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
  // Reset selected destination and related states when destination changes
  useEffect(() => {
    if (destination) {
      setSelectedDestination(null); // Reset destinasi terpilih
      setTotalCost(0); // Reset total biaya
    }
  }, [destination]);

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
    setIsProcessing(true); // Set ke true sebelum memulai
    setIsConfirmationOpen(false);

    const savedData = {
      userID: auth.id_user,
      originCityName: origin.name,
      destinations: [selectedDestination.id],
      destinationCityName: destination.name,
      distance: Number(distance),
      time,
      cost: totalCost,
    };

    try {
      const response = await axiosInstance.post("/route", savedData);
      console.log("Respon dari backend:", response.data);

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Gagal menyimpan data ke backend:", error);
      alert("Terjadi kesalahan saat menyimpan data. Coba lagi.");
    } finally {
      setIsProcessing(false); // Set ke false setelah selesai
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
    <div className="flex flex-col items-center my-10 rounded-lg space-y-4 bg-gray-100 min-h-screen pb-10 font-poppins">
      <h1 className="text-lg md:text-2xl font-bold text-center">
        Planning Route
      </h1>

      {/* Dropdown dan tombol Refresh */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-3 py-3 w-full px-5">
        <CityDropdown
          label="Enter Your Location"
          options={cities}
          value={origin?.id || ""}
          onChange={setOrigin}
          className="w-full md:w-[45%]" /* Responsive width */
        />
        <CityDropdown
          label="Your Destination Location"
          options={cities}
          value={destination?.id || ""}
          onChange={setDestination}
          className="w-full md:w-[45%]" /* Responsive width */
        />
        <Button
          onClick={handleRefresh}
          color="failure"
          className="w-32 md:w-32"
        >
          Refresh
        </Button>
      </div>

      {/* Daftar destinasi */}
      <div className="w-full px-5">
        <DestinationList
          destinations={destinations}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          handleSelectDestination={handleSelectDestination}
        />
      </div>

      {/* Peta */}
      <div className="w-full px-5">
        <div className="h-[250px] md:h-[350px] lg:h-[450px] w-full overflow-hidden rounded-lg shadow-md">
          <MapComponent origin={origin} destination={destination} />
        </div>
      </div>

      {/* Ringkasan Rute */}
      <div className="w-full flex flex-col px-5">
        <RouteSummary
          origin={origin}
          destination={destination}
          distance={distance}
          time={time}
          totalCost={totalCost}
          handleSave={handleSave}
          handleHowToUseClick={handleHowToUseClick}
          isProcessing={isProcessing}
        />
      </div>

      {/* Modals */}
      <AlertModal
        isOpen={isHowToUseModalOpen}
        title="Tata Cara Menggunakan Fitur Rute"
        message={
          <div className="text-left text-sm md:text-base">
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
        onClose={closeHowToUseModal}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onCancel={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirmSave}
        message="Anda akan menyimpan rute ini, apakah Anda yakin?"
      />

      <AlertModal
        isOpen={isErrorModalOpen}
        title="Validasi Gagal"
        icon={
          <HiExclamationCircle className="text-red-500 w-12 h-12 md:w-20 md:h-20" />
        }
        message="Harap isi semua bidang: kota asal, kota tujuan, dan destinasi."
        onClose={() => setIsErrorModalOpen(false)}
      />

      <AlertModal
        isOpen={isSuccessModalOpen}
        title="Sukses"
        icon={
          <HiCheckCircle className="text-green-500 w-12 h-12 md:w-20 md:h-20" />
        }
        message="Rute Anda berhasil disimpan. Silakan cek data Anda!"
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Rutes;
