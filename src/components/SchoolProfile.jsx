import React from 'react';
import { getThumbnailUrl } from "../utils/fileUtils";
import { FaUser, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaCalendarAlt } from 'react-icons/fa';
import { Icon } from '@iconify/react';

const SchoolProfile = ({ auth }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div className="bg-white shadow-2xl rounded-lg p-6 w-full transition-all duration-300 hover:shadow-none">
            <div className="flex flex-col items-center">
                <img src={getThumbnailUrl(auth.schoolImage)} alt="School Logo" className="w-32 h-32 rounded-full mb-4 border-4 border-green-500 object-cover"/>
                <h2 className="text-3xl font-bold text-center text-green-800">{auth.schoolName}</h2>
                <p className="text-gray-600 text-center mb-6">{auth.schoolEmail}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="flex items-center">
                    <FaUser className="text-green-800 mr-3" />
                    <div>
                        <p className="font-semibold text-gray-700">Incharge</p>
                        <p>{auth.inchargeName}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Icon icon="ic:baseline-phone" width="24px" height="24px" className="text-green-800 mr-3" />
                    <div>
                        <p className="font-semibold text-gray-700">Incharge Contact</p>
                        <p>{auth.inchargePhone}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Icon icon="ic:baseline-local-phone" width="24px" height="24px" className="text-green-800 mr-3" />
                    <div>
                        <p className="font-semibold text-gray-700">School Contact</p>
                        <p>{auth.schoolPhone}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <FaMapMarkerAlt className="text-green-800 mr-3" />
                    <div>
                        <p className="font-semibold text-gray-700">Address</p>
                        <p>{auth.address}, {auth.subDistrict}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    {auth.isApproved ? <FaCheckCircle className="text-green-500 mr-3" /> : <FaTimesCircle className="text-red-500 mr-3" />}
                    <div>
                        <p className="font-semibold text-gray-700">Status</p>
                        <p>{auth.isApproved ? "Approved" : "Pending Approval"}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <FaCalendarAlt className="text-green-800 mr-3" />
                    <div>
                        <p className="font-semibold text-gray-700">Member Since</p>
                        <p>{formatDate(auth.createdAt)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolProfile;
