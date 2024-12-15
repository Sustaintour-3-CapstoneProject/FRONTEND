import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/Admin/SearchCard";
import Card from "../../components/Admin/Card";
import ReusableTable from "../../components/Admin/ReusableTable";
import { FaUserFriends, FaUser , FaUserMinus } from "react-icons/fa";
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

  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleDelete = async (item) => {
    if (item) {
      try {
        const url = `/user/${item}`;
        await axiosInstance.delete(url);
        fetchUserData();
        alert("User  berhasil dihapus!");
      } catch (error) {
        console.error("Gagal menghapus user:", error);
        alert("Terjadi kesalahan saat menghapus user.");
      }
    }
  };

  // Function to handle search input
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Filter user data based on search term
  const filteredUserData = userData.filter(user =>
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
          icon={<FaUser  className="text-3xl" />}
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
        />
      )}
    </div>
  );
};

export default UserPage;