import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";

import { Button } from "flowbite-react";
import AlertModal from "../../components/common/AlertModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import {
  HiExclamationCircle,
  HiCheckCircle,
  HiQuestionMarkCircle,
  HiRefresh,
} from "react-icons/hi";
import useCalculateDistance from "../../hooks/useCalculateDistance";
import CityDropdown from "../../components/User/Rute/CityDropdown";
import { fetchDestinationsAPI } from "../../utils/apiUtils";
import DestinationList from "../../components/User/Rute/DestinationList";
import RouteSummary from "../../components/User/Rute/RouteSummary";
import useAuthStore from "../../store/authStore";
import axiosInstance from "../../api/axiosInstance";
import MapComponent from "../../components/User/Rute/Map";

const Rutes = () => {
  const { distance, time, calculateDistance, setDistance, setTime } =
    useCalculateDistance();
  const { auth, registerAuth } = useAuthStore(); // Ambil data auth dan registerAuth
  const user = auth || registerAuth; // Gunakan registerAuth jika auth tidak ada
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
        const destinationsData = await fetchDestinationsAPI(destination.name);
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

  const handleSelectDestination = (destination) => {
    if (destination) {
      setSelectedDestination(destination);
      setTotalCost(destination.ticket_price); // Atur biaya sesuai destinasi
    } else {
      setSelectedDestination(null);
      setTotalCost(0); // Set biaya ke 0 saat batal
    }
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
      userID: user.id_user,
      originCityName: origin.name,
      destinations: [selectedDestination.id],
      destinationCityName: destination.name,
      distance: Math.round(Number(distance)), // Membulatkan jarak ke bilangan bulat
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
        <Button onClick={handleRefresh} color="customBlue">
          Refresh Chat
          <HiRefresh className="ml-3 h-6 w-5" />
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
        title="How to Use the Route Feature"
        message={
          <div className="text-left text-sm md:text-base">
            1. Select the departure city from the available list.
            <br />
            2. Choose the destination city you want to visit.
            <br />
            3. Select the destination within the target city from the displayed
            list.
            <br />
            4. Click the 'Save Route' button to save your route plan.
            <br />
            5. You can view the total estimated cost and distance at the bottom.
          </div>
        }
        onClose={closeHowToUseModal}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onCancel={() => setIsConfirmationOpen(false)}
        icon={
          <HiQuestionMarkCircle className="text-gray-500 w-12 h-12 md:w-20 md:h-20" />
        }
        onConfirm={handleConfirmSave}
        message="You are about to save this route. Are you sure?"
      />

      <AlertModal
        isOpen={isErrorModalOpen}
        title="Validation Failed"
        icon={
          <HiExclamationCircle className="text-red-500 w-12 h-12 md:w-20 md:h-20" />
        }
        message="Please fill in all the fields: departure city, destination city, and the specific destination."
        onClose={() => setIsErrorModalOpen(false)}
      />

      <AlertModal
        isOpen={isSuccessModalOpen}
        title="Success"
        icon={
          <HiCheckCircle className="text-green-500 w-12 h-12 md:w-20 md:h-20" />
        }
        message="Your route has been successfully saved. Please check your data!"
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};

export default Rutes;
