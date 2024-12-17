import React, { useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axiosInstance from "../../../api/axiosInstance"; // Import axiosInstance
import useAuthStore from "../../../store/authStore"; // Import useAuthStore
export const ChangePasswordModal = ({ showModal, toggleModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { auth, registerAuth } = useAuthStore();
  const [loading, setLoading] = useState(false); // Untuk animasi loading
  const userId = auth?.id_user || registerAuth?.id_user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi input
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setLoading(true);

      // Request API menggunakan PUT method
      const response = await axiosInstance.put(
        `/user/change-password/${userId}`,
        {
          currentPassword,
          newPassword,
        }
      );

      console.log("Response:", response.data);

      // Reset state setelah berhasil
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toggleModal(); // Tutup modal
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.meta?.message || "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onClose={toggleModal} size="md" className="p-4">
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="relative">
            <TextInput
              id="current-password"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-2/4 transform -translate-y-2/4"
            >
              {showCurrentPassword ? (
                <HiEye className="h-5 w-5 text-gray-400" />
              ) : (
                <HiEyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="relative">
            <TextInput
              id="new-password"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-2/4 transform -translate-y-2/4"
            >
              {showNewPassword ? (
                <HiEye className="h-5 w-5 text-gray-400" />
              ) : (
                <HiEyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          <div className="relative">
            <TextInput
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2/4 transform -translate-y-2/4"
            >
              {showConfirmPassword ? (
                <HiEye className="h-5 w-5 text-gray-400" />
              ) : (
                <HiEyeOff className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={toggleModal}
          color="gray"
          className="border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
