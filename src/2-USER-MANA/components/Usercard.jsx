import React from 'react';

const Usercard = ({ user }) => {
  return (
    <div className="border rounded p-4 mb-4">
      <h3 className="font-bold text-lg">{user.name}</h3>
      <p className="text-gray-600">Username: {user.username}</p>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">City: {user.address.city}</p>
      <p className="text-gray-600">Phone: {user.phone}</p>
    </div>
  );
};

export default Usercard;
