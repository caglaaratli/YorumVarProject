
import PropTypes from "prop-types";
import iconSet from "../assets/selection.json";
import Icon from "react-icomoon";

function AccountSettingsForm({ user, setUser, editMode, setEditMode, handleUpdate, handleDelete }) {
  return (
    <div >
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
          onClick={() => {
            handleUpdate();
           
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
        <button
          onClick={() => {
            handleDelete();
           
          }}
          className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
}

AccountSettingsForm.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,


};

export default AccountSettingsForm;
