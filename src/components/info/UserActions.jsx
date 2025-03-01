import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const UserActions = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [captureText, setCaptureText] = useState("");

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
            >
              <option value="">Name</option>
              <option value="User1">User 1</option>
              <option value="User2">User 2</option>
            </select>
            <ChevronDown className="absolute top-4 right-3 text-gray-500" />
          </div>
          <button className="bg-[#FF9060] text-white w-[66px] px-4 py-2 rounded-[11px] font-semibold cursor-pointer hover:bg-[#ff8060]">
            Del
          </button>
        </div>
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
          <button className="bg-[#F4C427] w-[66px] text-white px-4 py-2 rounded-[11px] font-semibold cursor-pointer hover:bg-[#f4ba27]">
            Cap
          </button>
        </div>
      </div>

      {/* Training Button */}
      <div className="text-center">
        <button className="bg-[#030391] text-white px-8 py-3 rounded-[15px] cursor-pointer font-semibold text-lg">
          Training
        </button>
      </div>
    </div>
  );
};

export default UserActions;
