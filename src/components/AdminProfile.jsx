import React from 'react';

const AdminProfile = ({ auth }) => (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center border-4 border-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        </div>
        <h2 className="text-2xl font-bold text-center text-green-800">{auth.name}</h2>
        <p className="text-gray-600 text-center">{auth.email}</p>
    </div>
);

export default AdminProfile;
