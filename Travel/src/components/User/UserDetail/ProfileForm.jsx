import React, { useState } from "react";
import { TextInput, Radio, Label, Button } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import ImageUploadModal from "./ImageUploadModal";
import ChangePasswordModal from "./ChangePasswordModal";

export const ProfileForm = ({
  profileData,
  setProfileData,
  isEditing,
  setIsEditing,
  saveChanges,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState({});

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const toggleChangePasswordModal = () => {
    setShowChangePasswordModal((prevState) => !prevState);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create URL for image preview
      setPreviewImage(imageUrl); // Set image preview
      setProfileData((prevState) => ({
        ...prevState,
        file: file, // Save the original file
      }));
      toggleModal(); // Close the modal after selecting an image
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      gender: e.target.value,
    }));
  };

  // Validate form inputs before saving
  const validateForm = () => {
    const newErrors = {};

    if (!profileData.first_name) {
      newErrors.name = "First name is required";
    }

    if (!profileData.username) {
      newErrors.username = "Username is required";
    }

    if (!profileData.phone_number || !/^\d+$/.test(profileData.phone_number)) {
      newErrors.phone_number = "Valid phone number is required";
    }

    if (
      !profileData.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(profileData.email)
    ) {
      newErrors.email = "Valid email is required";
    }

    setErrors(newErrors);

    // If no errors, return true, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  const toggleEditMode = () => {
    if (isEditing) {
      if (validateForm()) {
        saveChanges(); // Only save changes if validation passes
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Image Section */}
          <div className="flex flex-col items-center justify-center mb-8 md:mb-0 md:w-1/3">
            <img
              src={previewImage || `${profileData.file}`} // Use preview if available, fallback to the default file
              alt="Profile"
              className="h-[274px] w-[274px] rounded-full object-cover mb-4"
            />
            {isEditing && (
              <>
                <label
                  onClick={toggleModal} // Open the modal when clicked
                  className="cursor-pointer text-4xl text-gray-600 mt-4"
                >
                  <FaCamera />
                </label>
              </>
            )}
          </div>

          {/* Form Section */}
          <div className="flex-grow md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div className="col-span-2">
                <Label htmlFor="name" value="Name" />
                <TextInput
                  id="name"
                  type="text"
                  value={`${profileData.first_name} ${profileData.last_name}`}
                  onChange={(e) => {
                    const [firstName, ...lastNameParts] =
                      e.target.value.split(" ");
                    setProfileData((prevData) => ({
                      ...prevData,
                      first_name: firstName || "",
                      last_name: lastNameParts.join(" ") || "",
                    }));
                  }}
                  disabled={!isEditing}
                  color={errors.name ? "failure" : undefined} // Highlight error field
                  helperText={errors.name} // Show error message
                />
              </div>

              {/* Username */}
              <div className="col-span-2">
                <Label htmlFor="username" value="Username" />
                <TextInput
                  id="username"
                  type="text"
                  value={profileData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  color={errors.username ? "failure" : undefined}
                  helperText={errors.username}
                />
              </div>

              {/* Phone */}
              <div className="col-span-2">
                <Label htmlFor="phone_number" value="Phone Number" />
                <TextInput
                  id="phone_number"
                  type="text"
                  value={profileData.phone_number || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  color={errors.phone_number ? "failure" : undefined}
                  helperText={errors.phone_number}
                />
              </div>

              {/* Email */}
              <div className="col-span-2">
                <Label htmlFor="email" value="Email" />
                <TextInput
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  color={errors.email ? "failure" : undefined}
                  helperText={errors.email}
                />
              </div>

              {/* Gender */}
              <div className="col-span-2">
                <Label value="Gender" />
                <div className="flex items-center gap-4">
                  <Radio
                    id="male"
                    name="gender"
                    value="Male"
                    checked={profileData.gender === "Male"}
                    onChange={handleGenderChange}
                    disabled={!isEditing}
                  />
                  <Label htmlFor="male" value="Male" />
                  <Radio
                    id="female"
                    name="gender"
                    value="Female"
                    checked={profileData.gender === "Female"}
                    onChange={handleGenderChange}
                    disabled={!isEditing}
                  />
                  <Label htmlFor="female" value="Female" />
                </div>
              </div>

              {/* City */}
              <div className="col-span-2">
                <Label htmlFor="city" value="City" />
                <TextInput
                  id="city"
                  type="text"
                  value={profileData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="mt-4 flex justify-between">
          <div className="flex gap-4">
            {isEditing && (
              <button
                onClick={toggleChangePasswordModal}
                className="w-full max-w-xs border-2 border-sky-600 text-sky-600 rounded-lg py-2 px-4 hover:bg-sky-600 hover:text-white transition-colors duration-300"
              >
                Change Password
              </button>
            )}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={toggleEditMode}
              color="customBlue"
              className="w-full max-w-xs"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </Button>
            {isEditing && (
              <Button
                onClick={handleCancel}
                color="gray"
                className="w-full max-w-xs"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Image Upload Modal */}
      <ImageUploadModal
        showModal={showModal}
        toggleModal={toggleModal}
        handleImageChange={handleImageChange}
      />

      {/* Change Password Modal */}
      <ChangePasswordModal
        showModal={showChangePasswordModal}
        toggleModal={toggleChangePasswordModal}
      />
    </div>
  );
};

export default ProfileForm;
