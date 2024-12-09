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
import { Button, Select, Pagination } from "flowbite-react";
import Datadestinations from "../../data/destinationData";
import AlertModal from "../../components/common/AlertModal";
import ConfirmationModal from "../../components/common/ConfirmationModal";
import {
  HiMap,
  HiClock,
  HiCurrencyDollar,
  HiExclamationCircle,
  HiCheckCircle,
} from "react-icons/hi";
import useCalculateDistance from "../../hooks/useCalculateDistance";
import CityDropdown from "../../components/User/Rute/CityDropdown";
// Ikon marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Rutes = () => {
  const { distance, time, calculateDistance, setDistance, setTime } =
    useCalculateDistance();
  const [cities, setCities] = useState([]); // Data kota dari API
  const [origin, setOrigin] = useState(""); // Kota Asal
  const [destination, setDestination] = useState(""); // Kota Tujuan
  const [destinations, setDestinations] = useState([]); // Daftar destinasi
  const [selectedDestination, setSelectedDestination] = useState(null); // Destinasi dipilih
  const [route, setRoute] = useState([]); // Rute peta
  const [totalCost, setTotalCost] = useState(0); // Total biaya
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Modal error
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Modal sukses
  const [isHowToUseModalOpen, setIsHowToUseModalOpen] = useState(false); // State untuk modal tata cara
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
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

  // Filter destinasi berdasarkan kota tujuan
  useEffect(() => {
    if (destination) {
      const filteredDestinations = Datadestinations.filter(
        (dest) => dest.city === destination
      );
      setDestinations(filteredDestinations);
    } else {
      setDestinations([]);
    }
  }, [destination]);

  useEffect(() => {
    if (origin && destination) {
      const originCoord = cities.find((city) => city.name === origin)?.position;
      const destCoord = cities.find(
        (city) => city.name === destination
      )?.position;

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
    setRoute([dest.position]);
    setTotalCost(dest.cost);
  };

  const handleCancelDestination = () => {
    setSelectedDestination(null);
    setRoute([]);
    setTotalCost(0);
  };

  const handleSave = () => {
    if (!origin || !destination || !selectedDestination) {
      setIsErrorModalOpen(true);
      return;
    }

    setIsConfirmationOpen(true);
  };

  const handleConfirmSave = () => {
    setIsConfirmationOpen(false);

    // Simpan data
    const savedData = {
      origin,
      destination,
      selectedDestination,
      totalCost,
      distance,
      time,
    };
    setIsSuccessModalOpen(true); // Buka modal sukses
    console.log("Data yang disimpan:", savedData);
  };
  // Data untuk halaman saat ini
  const paginatedDestinations = destinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleRefresh = () => {
    setOrigin(""); // Reset kota asal
    setDestination(""); // Reset kota tujuan
    setDestinations([]); // Kosongkan daftar destinasi
    setSelectedDestination(null); // Hilangkan destinasi yang dipilih
    setRoute([]); // Kosongkan rute peta
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
        {/* Kota Asal */}
        <CityDropdown
          label="Origin"
          options={cities}
          value={origin}
          onChange={setOrigin}
        />
        {/* Kota Tujuan */}
        <CityDropdown
          label="Destination"
          options={cities}
          value={destination}
          onChange={setDestination}
        />
        {/* Tombol Refresh */}
        <Button onClick={handleRefresh} color="failure" className=" w-32">
          Refresh
        </Button>
      </div>
      {/* Destinasi */}

      {destination && (
        <div className="">
          <h2 className="text-lg font-semibold">Destinasi di {destination}</h2>
          <ul className="space-y-4">
            {paginatedDestinations.map((dest, idx) => (
              <li
                key={idx}
                className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-sm transition-transform duration-200 ${
                  selectedDestination?.name === dest.name
                    ? "scale-103 border-2"
                    : "hover:bg-gray-100"
                }`}
              >
                <div>
                  <h3 className="text-sm font-medium">{dest.name}</h3>
                  <p className="text-gray-500">
                    Biaya: Rp{dest.cost.toLocaleString()}
                  </p>
                </div>
                {selectedDestination?.name === dest.name ? (
                  <Button onClick={handleCancelDestination} color="red">
                    Batalkan
                  </Button>
                ) : (
                  <Button onClick={() => handleSelectDestination(dest)}>
                    Pilih
                  </Button>
                )}
              </li>
            ))}
          </ul>

          {/* Tambahkan wrapper Flexbox untuk Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(destinations.length / itemsPerPage)}
            />
          </div>
        </div>
      )}

      {/* Peta */}

      <div className="h-[450px]">
        {origin && destination && (
          <MapContainer
            center={cities.find((city) => city.name === destination)?.position}
            zoom={8}
            className="h-[450px] rounded-lg shadow-md"
            style={{ zIndex: 1 }}
          >
            {/* Tile Layer */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* Marker Kota Asal */}
            <Marker
              position={cities.find((city) => city.name === origin)?.position}
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <span>{origin}</span>
              </Tooltip>
            </Marker>

            {/* Marker Kota Tujuan */}
            <Marker
              position={
                cities.find((city) => city.name === destination)?.position
              }
            >
              <Tooltip direction="top" offset={[0, -20]} opacity={1}>
                <span>{destination}</span>
              </Tooltip>
            </Marker>

            {/* Polyline Menghubungkan Kota Asal ke Tujuan */}
            <Polyline
              positions={[
                cities.find((city) => city.name === origin)?.position,
                cities.find((city) => city.name === destination)?.position,
              ]}
              color="blue"
              weight={4}
            />
          </MapContainer>
        )}
      </div>

      <div className="flex justify-around items-center space-x-10 ">
        {/* Jarak */}
        <div className="flex items-center space-x-2 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300">
          <HiMap size={20} />
          <p className="text-lg font-medium">Jarak:</p>
          {origin && destination && (
            <span className="text-lg font-medium">
              {distance ? `${distance} km` : "Menghitung..."}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2 border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300">
          <HiClock size={20} />
          <p className="text-lg font-medium">Waktu:</p>
          {origin && destination && (
            <span className="text-lg font-medium">
              {time ? time : "Menghitung..."}
            </span>
          )}
        </div>

        {/* Total Biaya */}
        <span className="flex items-center gap-2 text-lg font-medium border-2 border-sky-500 p-2 rounded-lg text-sky-800 shadow-lg shadow-sky-300/50 hover:shadow-sky-500/70 transition-shadow duration-300">
          <HiCurrencyDollar size={20} />
          Total Biaya: Rp. {totalCost.toLocaleString()}
        </span>
        <div className="mt-5">
          {/* Tombol Simpan */}
          <Button className="py-1 w-52" color="customBlue" onClick={handleSave}>
            Save Rute
          </Button>
          <div className="flex justify-center items-center mt-1 text-sm">
            <span>Instruction for use?</span>
            <p
              className="text-blue-700  underline cursor-pointer "
              onClick={handleHowToUseClick} // Tambahkan handler klik
            >
              click here
            </p>
          </div>
        </div>
      </div>
      {/* Modal Tata Cara */}

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
