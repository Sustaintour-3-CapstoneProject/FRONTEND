import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/Admin/SearchCard";
import Card from "../../components/Admin/Card";
import ReusableTable from "../../components/Admin/ReusableTable";

import { FaUserFriends, FaUser, FaUserMinus } from "react-icons/fa";
import axiosInstance from "../../api/axiosInstance";

const UserPage = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    { key: "phone_number", label: "Nomor Telepon" },
    { key: "gender", label: "Gender" },
    { key: "city", label: "City" },
  ];

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get("/user");
      console.log("API Response:", response.data);
      const users = Array.isArray(response.data?.data) ? response.data.data : [];
      setUserData(users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Tambahkan fungsi navigasi ke detail
  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleDelete = async (item) => {
    if (item) {
      try {
        // Mengambil ID dari data destinasi
        const url = `/user/${item}`; // Endpoint DELETE
        await axiosInstance.delete(url); // Menghapus data ke server

        // Perbarui daftar destinasi setelah berhasil dihapus
        fetchUserData();
        alert("Destinasi berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus destinasi:", error);
        alert("Terjadi kesalahan saat menghapus destinasi.");
      }
    }
  };

  return (
    <div>
      <SearchCard topic="User" />
      <div className="flex flex-col md:flex-row w-full gap-5 my-5 md:h-32">
        <Card
          title="Total User"
          totalData={userData.length}
          icon={<FaUserFriends className="text-3xl" />}
        />
        <Card
          title="User Aktif"
          totalData={userData.filter((user) => !user.isActive).length}
          icon={<FaUser className="text-3xl" />}
        />
        <Card
          title="User Nonaktif"
          totalData={userData.filter((user) => user.isActive).length}
          icon={<FaUserMinus className="text-3xl" />}
        />
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={userData}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default UserPage;
