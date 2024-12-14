import React, { useState, useEffect } from "react";
import ProfileForm from "../../components/User/UserDetail/ProfileForm";
import axiosInstance from "../../api/axiosInstance"; // Gunakan instance axios yang sudah disiapkan
import useAuthStore from "../../store/authStore"; // Import auth store

export const InsertUserDetail = () => {
  const { auth } = useAuthStore(); // Ambil userId dari auth store
  const [editableUser, setEditableUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Mode editing diaktifkan secara default
  const [loading, setLoading] = useState(true);
  console.log(editableUser);
  // Fetch user detail on mount
  useEffect(() => {
    if (!auth) return; // Jika userId tidak ada, hentikan proses

    const loadUser = async () => {
      setLoading(true);
      try {
        // Fetch user by ID from backend
        const response = await axiosInstance.get(`/user/${auth.id_user}`);
        setEditableUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [auth.id_user]);

  // Save user changes
  const saveChanges = async () => {
    if (!editableUser) return;

    const formData = new FormData();

    Object.keys(editableUser).forEach((key) => {
      if (key === "file" && editableUser.file instanceof File) {
        formData.append("file", editableUser.file); // Kirim file asli
      } else {
        formData.append(key, editableUser[key]);
      }
    });

    try {
      const response = await axiosInstance.put(
        `/user/${auth.id_user}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Profile updated successfully!", response.data);
      alert("Profile updated successfully!");
      // Perbarui store auth
      useAuthStore.getState().setAuth({
        ...auth,
        ...response.data.data, // Gabungkan data baru dengan data lama
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to save changes");
    }
    setIsEditing(false);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && editableUser && (
        <>
          {/* Form Profil */}
          <ProfileForm
            profileData={editableUser}
            setProfileData={setEditableUser}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            saveChanges={saveChanges}
          />
        </>
      )}
    </div>
  );
};

export default InsertUserDetail;
