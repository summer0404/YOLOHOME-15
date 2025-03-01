import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const UserActions = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [captureText, setCaptureText] = useState("");

  return (
    <div className="w-full p-6 space-y-6">
      {/* Delete User Section */}
      <div>
        <h2 className="text-xl font-bold">Delete User</h2>
        <div className="flex items-center space-x-4 mt-2">
          <div className="relative flex-1">
            <select
              className="w-full p-3 bg-gray-100 rounded-xl appearance-none pr-8"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Name</option>
              <option value="User1">User 1</option>
              <option value="User2">User 2</option>
            </select>
            <ChevronDown className="absolute top-4 right-3 text-gray-500" />
          </div>
          <button className="bg-orange-400 text-white px-4 py-2 rounded-xl font-semibold">
            Del
          </button>
        </div>
      </div>

      {/* Capture User Section */}
      <div>
        <h2 className="text-xl font-bold">Capture User</h2>
        <div className="flex items-center space-x-4 mt-2">
          <input
            type="text"
            placeholder="Name..."
            value={captureText}
            onChange={(e) => setCaptureText(e.target.value)}
            className="flex-1 p-3 bg-gray-100 rounded-xl"
          />
          <button className="bg-yellow-400 text-white px-4 py-2 rounded-xl font-semibold">
            Cap
          </button>
        </div>
      </div>

      {/* Training Button */}
      <div className="text-center">
        <button className="bg-blue-900 text-white px-8 py-3 rounded-xl font-semibold text-lg">
          Training
        </button>
      </div>
    </div>
  );
};

export default UserActions;
