import React, { useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import ikon dari Flowbite (Heroicons)

export const ChangePasswordModal = ({ showModal, toggleModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
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

    // Tambahkan logika untuk mengubah kata sandi di sini
    console.log("Password changed successfully!");
    toggleModal(); // Tutup modal setelah berhasil
  };

  return (
    <Modal show={showModal} onClose={toggleModal}>
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
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
              className="absolute right-2 top-2"
            >
              {showCurrentPassword ? (
                <HiEye className="h-5 w-5 text-gray-500" />
            ) : (
                <HiEyeOff className="h-5 w-5 text-gray-500" />
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
              className="absolute right-2 top-2"
            >
              {showNewPassword ? (
                <HiEye className="h-5 w-5 text-gray-500" />
              ) : (
                <HiEyeOff className="h-5 w-5 text-gray-500" />
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
              className="absolute right-2 top-2"
            >
              {showConfirmPassword ? (
                <HiEye className="h-5 w-5 text-gray-500" />
            ) : (
                <HiEyeOff className="h-5 w-5 text-gray-500" />
            )}
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleModal}>Close</Button>
        <Button onClick={handleSubmit}>Change Password</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
