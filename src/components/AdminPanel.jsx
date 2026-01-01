import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

const AdminPanel = ({ auth, handleLogout }) => (
    <div className="bg-green-800 text-white p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-500 pb-2">Admin Dashboard</h2>
        <p className="mb-6">Welcome, {auth.schoolName} Here are your administrative options:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a href="/approveSchool" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 text-center">
                Approve Schools
            </a>
            <a href="/admin/products" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 text-center">
                Manage All Products
            </a>
            <a href="/statistics" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 text-center">
                Site Statistics
            </a>
            <a href="/viewallschool" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 text-center">
                View All school
            </a>
            <a href="/usermanagement" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 text-center">
                User Management
            </a>
        </div>
    </div>
);

export default AdminPanel;
