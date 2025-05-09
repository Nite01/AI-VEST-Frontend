import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./Profile.css"; // Ensure this file has updated styles

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div className="loading">Loading user details...</div>;
  }

  return (
    <div className="profile-container bg-white shadow-md p-6 rounded-md w-80 mx-auto">
      {/* Profile Header */}
      <div className="profile-header flex flex-col items-center mb-6">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-20 h-20 rounded-full border border-gray-300 shadow-md"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">
            {user.fullname ? user.fullname[0].toUpperCase() : "?"}
          </div>
        )}
        <h2 className="mt-2 text-lg font-semibold text-gray-700">{user.fullname || "Guest"}</h2>
      </div>

      {/* Profile Information */}
      <div className="text-gray-600 text-center">
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;