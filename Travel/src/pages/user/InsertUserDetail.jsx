import React, { useState, useEffect } from "react";
import { Select } from "flowbite-react";
import ProfileForm from "../../components/User/UserDetail/ProfileForm";
import { fetchUsers, fetchUserById, updateUserById } from "../../data/mockApi";

export const InsertUserDetail = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch data users on mount
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const userList = await fetchUsers();
        setUsers(userList);
        setSelectedUserId(userList[0]?.id || null);
        const user = await fetchUserById(userList[0]?.id);
        setEditableUser(user);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Fetch user detail when selectedUserId changes
  useEffect(() => {
    if (selectedUserId) {
      const loadUser = async () => {
        setLoading(true);
        try {
          const user = await fetchUserById(selectedUserId);
          setEditableUser(user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        } finally {
          setLoading(false);
        }
      };
      loadUser();
    }
  }, [selectedUserId]);

  // Save user changes
  const saveChanges = async () => {
    if (!editableUser) return;
    try {
      await updateUserById(selectedUserId, editableUser);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to save changes");
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && (
        <>
          {/* <div className="mb-6 w-full max-w-xs">
            <label htmlFor="userSelect" className="block text-sm font-medium text-gray-700">
              Select User
            </label>
            <Select
              id="userSelect"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(parseInt(e.target.value, 10))}
              className="mt-1"
              disabled={isEditing}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </div> */}

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
