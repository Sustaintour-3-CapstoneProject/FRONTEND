import React, { useEffect, useState } from "react";
import { HiTrash } from "react-icons/hi";
import DeleteRouteAlert from "../../components/User/UserDetail/DeleteRouteAlret";
import axiosInstance from "../../api/axiosInstance";
import useAuthStore from "../../store/authStore";

const SavedRoute = () => {
  const [routes, setRoutes] = useState([]); // State untuk menyimpan data routes
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  const userId = useAuthStore((state) => state.auth?.userId); // Ambil userId dari authStore
  console.log(userId)
  // Fungsi untuk mengambil data dari API
  const fetchRoutes = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(`/route?user_id=${userId}`);
      console.log(response)
      setRoutes(response.data); // Asumsikan data dari API sesuai dengan format yang diperlukan
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchRoutes();
    }
  }, [userId]);

  const openDeleteAlert = (route) => {
    setSelectedRoute(route);
    setIsAlertOpen(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedRoute) {
        await axiosInstance.delete(`/route/${selectedRoute.id}`); // Endpoint untuk menghapus route
        console.log(`Route deleted: ${selectedRoute.name}`);
        setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== selectedRoute.id));
      }
    } catch (error) {
      console.error("Error deleting route:", error);
    } finally {
      setIsAlertOpen(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-center text-xl font-bold text-[#0C4A6E] mb-6">
        See all your routes here
      </h1>

      {isLoading ? (
        <p>Loading routes...</p>
      ) : (
        <div className="space-y-4 w-full max-w-3xl">
          {routes.map((route) => (
            <div
              key={route.id}
              className="flex items-center justify-between px-4 py-3 bg-white border border-gray-300 shadow-md rounded-lg w-full"
            >
              <div className="flex-1 text-start">
                <h5 className="text-md font-bold">{route.name}</h5>
                <p className="text-sm text-gray-500">Estimated costs: {route.cost}</p>
              </div>

              <button
                onClick={() => openDeleteAlert(route)}
                className="text-red-500 hover:text-red-700"
              >
                <HiTrash className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal Alert */}
      {isAlertOpen && (
        <DeleteRouteAlert
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          onConfirm={handleDelete}
          routeName={selectedRoute?.name}
        />
      )}
    </div>
  );
};

export default SavedRoute;
