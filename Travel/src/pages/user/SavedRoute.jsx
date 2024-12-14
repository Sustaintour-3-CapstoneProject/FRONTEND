import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import DeleteRouteAlert from "../../components/User/UserDetail/DeleteRouteAlret";
import RouteDetailModal from "../../components/User/UserDetail/RouteDetailModal";
import axiosInstance from "../../api/axiosInstance";
import useAuthStore from "../../store/authStore";

const SavedRoute = () => {
  const [routes, setRoutes] = useState([]); // State untuk menyimpan data routes
  const [selectedRoute, setSelectedRoute] = useState(null); // Untuk modal detail
  const [isAlertOpen, setIsAlertOpen] = useState(false); // State untuk alert delete
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Modal detail state

  const { auth, registerAuth } = useAuthStore(); // Ambil state auth dan registerAuth dari store
  const userId = auth?.id_user || registerAuth?.id_user; // Prioritaskan auth, fallback ke registerAuth

  // Fungsi untuk mengambil data dari API
  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/route?user_id=${userId}`);
      const fetchedRoutes = response.data.data ?? []; // Default ke array kosong jika null
      setRoutes(fetchedRoutes);
    } catch (error) {
      console.error("Error fetching routes:", error);
      setRoutes([]); // Set default ke array kosong jika ada error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRoutes();
    }
  }, [userId]);

  // Fungsi untuk membuka alert delete
  const openDeleteAlert = (route) => {
    setSelectedRoute(route);
    setIsAlertOpen(true);
  };

  // Fungsi untuk menghapus route
  const handleDelete = async () => {
    try {
      if (selectedRoute) {
        await axiosInstance.delete(`/route/${selectedRoute.id}`); // Endpoint untuk menghapus route
        setRoutes((prevRoutes) =>
          prevRoutes.filter((route) => route.id !== selectedRoute.id)
        );
      }
    } catch (error) {
      console.error("Error deleting route:", error);
    } finally {
      setIsAlertOpen(false);
    }
  };

  // Fungsi untuk membuka modal detail
  const openDetailModal = (route) => {
    setSelectedRoute(route);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-center text-xl font-bold text-[#0C4A6E] mb-6">
        See all your routes here
      </h1>

      {isLoading ? (
        <p>Loading routes...</p>
      ) : !routes.length ? ( // Periksa apakah routes kosong
        <p className="text-gray-500">You have no saved routes yet.</p>
      ) : (
        <div className="space-y-4 w-full max-w-3xl">
          {routes.map((route) => {
            // Validasi untuk memastikan destinations ada dan berbentuk array
            const destinationName =
              route.destinations?.[0]?.name || "Unnamed Route";

            return (
              <div
                key={route.id}
                className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 shadow-md rounded-lg w-full cursor-pointer hover:shadow-lg transition duration-300"
                onClick={() => openDetailModal(route)} // Buka modal detail saat card diklik
              >
                <div className="flex-1 text-start">
                  <h5 className="text-md font-bold">{destinationName}</h5>
                  <p className="text-sm text-gray-500">
                    Estimated costs: {route.cost ?? "N/A"}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Hindari trigger modal saat delete diklik
                    openDeleteAlert(route);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <HiTrash className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Alert */}
      {isAlertOpen && (
        <DeleteRouteAlert
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={handleDelete}
          routeName={selectedRoute?.name || "Unnamed Route"}
        />
      )}

      {/* Modal Detail Route */}
      {isDetailModalOpen && (
        <RouteDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          routeDetail={selectedRoute}
        />
      )}
    </div>
  );
};

export default SavedRoute;
