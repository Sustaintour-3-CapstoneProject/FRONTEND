import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Label, TextInput } from "flowbite-react";
import PlainCard from "../../components/Admin/PlainCard";
import ReusableTable from "../../components/Admin/ReusableTable";
import axiosInstance from "../../api/axiosInstance"; // Pastikan path sesuai struktur proyek Anda

const UserDetailPage = () => {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { key: "startingCity", label: "Starting City" },
    { key: "destination", label: "City of Destination" },
    { key: "route", label: "Destination Route" },
    { key: "distance", label: "Destination KM Distance" },
  ];
  console.log(userDetail);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}`);
        console.log("User Detail Response:", response.data);
        setUserDetail(response.data.data); // Simpan data ke state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user detail:", error);
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  const handleDelete = (item) => {
    console.log("Menghapus:", item);
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (!userDetail) {
    return <p>User not found.</p>;
  }

  return (
    <div className="space-y-5 h-full w-full">
      <PlainCard title="User Details" description="View detailed user data" />
      <div className="bg-white rounded-lg shadow-lg border border-[#E5E7EB]">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar
              img={userDetail.file || ""}
              alt="Logo Profile"
              rounded
              className="text-4xl"
              size="xl"
            />
            <form className="w-full space-y-4">
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="username"
                    type="text"
                    value={userDetail.username || ""}
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="email"
                    type="email"
                    value={userDetail.email || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="phoneNumber" value="Phone Number" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="phoneNumber"
                    type="number"
                    value={userDetail.phone_number || ""}
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="city" value="City" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="city"
                    type="text"
                    value={userDetail.city || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="md:w-1/2 w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="gender" value="Gender" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="gender"
                    type="text"
                    value={userDetail.gender || ""}
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
