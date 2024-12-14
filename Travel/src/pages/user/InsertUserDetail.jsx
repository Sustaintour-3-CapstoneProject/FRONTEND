import React, { useState, useEffect } from "react";
import ProfileForm from "../../components/User/UserDetail/ProfileForm";
import axiosInstance from "../../api/axiosInstance"; // Gunakan instance axios yang sudah disiapkan
import useAuthStore from "../../store/authStore"; // Import auth store

export const InsertUserDetail = () => {
  const { auth, registerAuth, setAuth } = useAuthStore(); // Ambil state auth dan registerAuth dari store
  const [editableUser, setEditableUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Mode editing diaktifkan secara default
  const [loading, setLoading] = useState(true);
  const userId = auth?.id_user || registerAuth?.id_user; // Prioritaskan auth, fallback ke registerAuth
  console.log(editableUser);
  // Fetch user detail saat komponen pertama kali dimount
  useEffect(() => {
    const loadUser = async () => {
      if (!auth && !registerAuth) {
        setLoading(false); // Jika kedua state tidak ada, hentikan loading
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user/${userId}`);
        setEditableUser(response.data.data);

        // Jika menggunakan registerAuth, perbarui auth dengan data yang didapat
        if (!auth && registerAuth) {
          setAuth(response.data.data); // Simpan data ke auth
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [auth, registerAuth, setAuth]);

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
      const response = await axiosInstance.put(`/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  // Render
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
      {!loading && !editableUser && <p>No user data available.</p>}
    </div>
  );
};

export default InsertUserDetail;
