import React, { useState, useEffect } from "react";
import ProfileForm from "../../components/User/UserDetail/ProfileForm";
import axiosInstance from "../../api/axiosInstance"; // Use the prepared axios instance
import useAuthStore from "../../store/authStore"; // Import auth store
import AlertModal from "../../components/common/AlertModal";
import { Spinner } from "flowbite-react"; // Import Spinner from Flowbite

export const InsertUserDetail = () => {
  const { auth, registerAuth, setAuth } = useAuthStore(); // Get auth and registerAuth state from store
  const [editableUser, setEditableUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Editing mode is enabled by default
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalTitle, setModalTitle] = useState(""); // State for modal title
  const [modalMessage, setModalMessage] = useState(""); // State for modal message
  const userId = auth?.id_user || registerAuth?.id_user; // Prioritize auth, fallback to registerAuth

  // Fetch user detail when the component first mounts
  useEffect(() => {
    const loadUser = async () => {
      if (!userId) {
        setLoading(false); // Stop loading if userId is not available
        return;
      }

      setLoading(true);
      try {
        const response = await axiosInstance.get(`/user/${userId}`);
        const userData = response.data.data;

        setEditableUser(userData); // Set local user data
        setAuth(userData); // Sync with global auth state
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, setAuth]);

  const saveChanges = async () => {
    if (!editableUser) return;

    const formData = new FormData();

    Object.keys(editableUser).forEach((key) => {
      if (key === "file" && editableUser.file instanceof File) {
        formData.append("file", editableUser.file);
      } else {
        formData.append(key, editableUser[key]);
      }
    });

    try {
      // Update data ke server
      await axiosInstance.put(`/user/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Profile updated successfully!");

      // Fetch data terbaru setelah update berhasil
      const response = await axiosInstance.get(`/user/${userId}`);
      const updatedData = response.data.data;

      console.log("Fetched updated user data:", updatedData);

      // Update store dan state lokal
      setAuth(updatedData);
      setEditableUser(updatedData);

      setModalTitle("Success");
      setModalMessage("Profile updated successfully!");
      setIsModalOpen(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      setModalTitle("Error");
      setModalMessage("Failed to save changes");
      setIsModalOpen(true);
    }
  };

  // Render
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner aria-label="Loading..." />
        </div>
      ) : (
        <>
          {!editableUser && <p>No user data available.</p>}
          {editableUser && (
            <ProfileForm
              profileData={editableUser}
              setProfileData={setEditableUser}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              saveChanges={saveChanges}
            />
          )}
        </>
      )}

      {/* Alert Modal */}
      <AlertModal
        isOpen={isModalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)} // Close the modal
      />
    </div>
  );
};

export default InsertUserDetail;
