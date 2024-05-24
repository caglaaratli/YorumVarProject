
import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../services/api";
import AccountSettingsForm from "../components/AccountSettingsForm";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  const handleUpdate = async () => {
    try {
      await updateUserProfile(user);
      setEditMode(false);
      fetchUserProfile();
      setMessage("User updated successfully");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Failed to update user profile:", error);
      setMessage("Failed to update user profile");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const handleDelete = async () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUserAccount();
      setMessage('Your account has been successfully deleted.');
      setTimeout(() => {
        logout();
      }, 2000);
    } catch (error) {
      console.error('Failed to delete user account:', error);
      setMessage('An error occurred while deleting the account.');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } finally {
      setShowConfirmModal(false);
    }
  };

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        {message && (
          <div className="text-center p-3 mb-2 bg-green-100 border border-green-400 text-green-700">
            {message}
          </div>
        )}
        {user ? (
          <AccountSettingsForm
            user={user}
            setUser={setUser}
            editMode={editMode}
            setEditMode={setEditMode}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ) : (
          <p className="text-lg text-gray-500">Loading...</p>
        )}
        {showConfirmModal && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded">
              <p>Are you sure you want to delete your account?</p>
              <button onClick={confirmDelete} className="bg-red-500 text-white p-2 rounded mr-2">Yes</button>
              <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 text-white p-2 rounded">No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountPage;