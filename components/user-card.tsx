// components/UserCard.js
import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2 text-black">{user.name}</h2>
      <p className="text-gray-600">Username: {user.username}</p>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">Bio: {user.bio}</p>
    </div>
  );
};

export default UserCard;
