import { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile ,deleteUserAccount } from "../services/api";
import iconSet from "../assets/selection.json";
import Icon from "react-icomoon";

function AccountPage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(null); 

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
    window.location.href = '/';
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
    if (window.confirm('Do you confirm deleting your account?')) {
      try {
        await deleteUserAccount();
        setMessage('Your account has been successfully deleted.');
        setTimeout(() => {
          logout(); 
        }, 3000); 
      } catch (error) {
        console.error('Failed to delete user account:', error);
        setMessage('An error occurred while deleting the account.');
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      {user ? (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
          {message && (
            <div className="text-center p-3 mb-2 bg-green-100 border border-green-400 text-green-700">
              {message}
            </div>
          )}
          <div className="flex items-center space-x-3 mb-4">
            <Icon
              iconSet={iconSet}
              icon="user-filled"
              className="h-6 w-6 text-gray-500"
            />
            <p className="text-gray-500">Name:</p>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              readOnly={!editMode}
            />
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Icon
              iconSet={iconSet}
              icon="user-filled"
              className="h-6 w-6 text-gray-500"
            />
            <p className="text-gray-500">Surname:</p>
            <input
              type="text"
              value={user.surname}
              onChange={(e) => setUser({ ...user, surname: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              readOnly={!editMode}
            />
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Icon
              iconSet={iconSet}
              icon="user-circle"
              className="h-6 w-6 text-gray-500"
            />
            <p className="text-gray-700 flex-1">
              <span className="font-medium">Username:</span> {user.username}
            </p>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Icon
              iconSet={iconSet}
              icon="email"
              className="h-6 w-6 text-gray-500"
            />
            <p className="text-gray-500">E-mail:</p>
            <input
              type="text"
              value={user.mail}
              onChange={(e) => setUser({ ...user, mail: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              readOnly={!editMode}
            />
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <Icon
              iconSet={iconSet}
              icon="telephone"
              className="h-6 w-6 text-gray-500"
            />
            <p className="text-gray-500">Phone Number:</p>
            <input
              type="text"
              value={user.phone}
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
              className="flex-1 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              readOnly={!editMode}
            />
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit my information
            </button>
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              onClick={handleDelete}
              className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete my account
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default AccountPage;
