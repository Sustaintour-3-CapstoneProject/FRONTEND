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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
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
      const users = Array.isArray(response.data?.data)
        ? response.data.data
        : [];
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
  const handleRowClick = (user) => {
    console.log(user);
    if (user?.id) {
      navigate(`/dashboard/user/detail/${user.id}`);
    } else {
      alert("User ID tidak valid.");
      console.error("Invalid user ID:", user);
    }
  };

  const handleDelete = async (item) => {
    if (!item) {
      alert("ID tidak valid");
      return;
    }
    try {
      const url = `/user/${item.id}`;
      console.log("Deleting user with ID:", item);
      await axiosInstance.delete(url);
      fetchUserData();
      alert("User berhasil dihapus!");
    } catch (error) {
      console.error(
        "Gagal menghapus user:",
        error.response?.data || error.message
      );
      alert("Terjadi kesalahan saat menghapus user.");
    }
  };

  // Function to handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter user data based on search term
  const filteredUserData = userData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchCard topic="User " onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row w-full gap-5 my-5 md:h-32">
        <Card
          title="Total User"
          totalData={filteredUserData.length}
          icon={<FaUser Friends className="text-3xl" />}
        />
        <Card
          title="User Aktif"
          totalData={filteredUserData.filter((user) => !user.isActive).length}
          icon={<FaUser className="text-3xl" />}
        />
        <Card
          title="User Nonaktif"
          totalData={filteredUserData.filter((user) => user.isActive).length}
          icon={<FaUser Minus className="text-3xl" />}
        />
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <ReusableTable
          columns={columns}
          data={filteredUserData}
          onDelete={handleDelete}
          onRowClick={handleRowClick}
          route="user"
        />
      )}
    </div>
  );
};

export default UserPage;
