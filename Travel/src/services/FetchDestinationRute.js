import axiosInstance from "../api/axiosInstance";
export const fetchDestinationsAPI = async (cityId) => {
  const response = await axiosInstance.get(`/destination?city=${cityId}`);
  return response.data.destinations || [];
};
