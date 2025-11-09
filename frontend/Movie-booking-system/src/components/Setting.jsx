import React from "react";
import { FaUserEdit, FaBell, FaLock, FaTrash } from "react-icons/fa";

const Settings = () => {
  const settingsOptions = [
    { label: "Edit Profile", icon: <FaUserEdit />, route: "/profile" },
    { label: "Notifications", icon: <FaBell />, route: "/notifications" },
    { label: "Change Password", icon: <FaLock />, route: "/change-password" },
    { label: "Delete Account", icon: <FaTrash />, route: "/delete-account", danger: true },
  ];

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4 text-center">⚙️ Settings</h2>

        <div className="flex flex-col gap-3">
          {settingsOptions.map((option, idx) => (
            <button
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition ${
                option.danger
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => console.log(`Navigate to: ${option.route}`)}
            >
              <span className="text-blue-500 text-lg">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
