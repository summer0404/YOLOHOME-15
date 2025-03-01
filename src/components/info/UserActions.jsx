import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { capture } from "../../api/services/capture";
import { getUser } from "../../api/services/getUser";
import { deleteUser } from "../../api/services/deleteUser";
import { train } from "../../api/services/train";

const UserActions = () => {
  const [captureText, setCaptureText] = useState("");
  const [captureMessage, setCaptureMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [userError, setUserError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // Add new state for training
  const [trainingMessage, setTrainingMessage] = useState("");
  const [isTraining, setIsTraining] = useState(false);
  const [trainingSuccess, setTrainingSuccess] = useState(false);

  const clearMessage = (setter) => {
    setTimeout(() => {
      setter("");
    }, 3000); // Message will disappear after 3 seconds
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoadingUsers(true);
      setUserError("");
      try {
        const response = await getUser();
        console.log("Response:", response);
        // Ensure response is an array
        const userArray = Array.isArray(response) ? response : [];
        setUsers(userArray);
      } catch (error) {
        setUserError("Failed to fetch users. Please try again.");
        console.error("Error fetching users:", error);
setUsers([]); // Set empty array on error
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleCapture = async () => {
    if (!captureText.trim()) {
      setCaptureMessage("Please enter a name.");
      setIsSuccess(false);
      clearMessage(setCaptureMessage);
      return;
    }

    try {
      const response = await capture(captureText);
      setCaptureMessage("Capture successful!");
      setIsSuccess(true);
      setCaptureText("");
      clearMessage(setCaptureMessage);
      console.log("Response:", response);
    } catch (error) {
      setCaptureMessage("Capture failed. Please try again.");
      setIsSuccess(false);
      clearMessage(setCaptureMessage);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) {
      setUserError("Please select a user to delete");
      setDeleteSuccess(false);
      clearMessage(setUserError);
      return;
    }

    try {
      await deleteUser(selectedUser);
      setUserError("User deleted successfully!"); // Success message
      setDeleteSuccess(true);
      setSelectedUser("");
      clearMessage(setUserError);
      // Refresh the users list after successful deletion
      const response = await getUser();
      const userArray = Array.isArray(response) ? response : [];
      setUsers(userArray);
    } catch (error) {
      setUserError("Failed to delete user. Please try again.");
      setDeleteSuccess(false);
      clearMessage(setUserError);
      console.error("Delete failed:", error);
    }
  };

  const handleTraining = async () => {
    setIsTraining(true);
    setTrainingMessage("Training in progress...");
    setTrainingSuccess(false);

    try {
      await train();
      setTrainingMessage("Training completed successfully!");
      setTrainingSuccess(true);
      clearMessage(setTrainingMessage);
    } catch (error) {
      setTrainingMessage("Training failed. Please try again.");
      setTrainingSuccess(false);
      clearMessage(setTrainingMessage);
      console.error("Training failed:", error);
    } finally {
      setIsTraining(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      {/* Delete User Section */}
      <div>
        <h2 className="text-xl font-semibold pb-[10px]">Delete User</h2>
        <div className="flex items-center space-x-4 mt-2">
          <div className="relative flex-1">
            <select
              className="w-full p-3 bg-gray-100 rounded-xl appearance-none pr-8 outline-none"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={loadingUsers}
            >
              <option value="">Select a user...</option>
              {Array.isArray(users) && users.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute top-4 right-3 text-gray-500" />
          </div>
          <button 
            className="bg-[#FF9060] text-white w-[66px] px-4 py-2 rounded-[11px] font-semibold cursor-pointer hover:bg-[#ff8060]
                     disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!selectedUser}
            onClick={handleDelete}
          >
            Del
          </button>
        </div>
{userError && (
          <p className={`text-sm mt-2 ${deleteSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {userError}
          </p>
        )}
      </div>

      {/* Capture User Section */}
      <div>
        <h2 className="text-xl font-semibold pb-[10px]">Capture User</h2>
        <div className="flex items-center space-x-4 mt-2">
          <input
            type="text"
            placeholder="Name..."
            value={captureText}
            onChange={(e) => setCaptureText(e.target.value)}
            className="flex-1 p-3 bg-gray-100 rounded-[11px] outline-none"
          />
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-semibold">
            Cap
          </button>
        </div>
        {captureMessage && (
            <p className={`text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
              {captureMessage}
            </p>
          )}
      </div>

      {/* Training Button */}
      <div className="text-center">
        <button className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold text-lg"
        onClick={handleTraining}
        disabled={isTraining}
        >
          Training
        </button>
        {trainingMessage && (
          <p className={`mt-2 text-sm ${trainingSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {trainingMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserActions;
