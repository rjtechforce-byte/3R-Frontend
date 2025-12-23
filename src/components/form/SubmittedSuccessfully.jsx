import React from 'react';
import { FaCheckSquare } from "react-icons/fa";
import { useLocation, Navigate } from 'react-router-dom';

const SubmittedSuccessfully = () => {
        const location = useLocation();
        const formRegister = location.state;

        if(formRegister?.fromRegister !== true){
          return <Navigate to="/" />;
        }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
         <FaCheckSquare className=" text-[50.5px] text-green-popup"/>
        </div>
        <h2 className="text-2xl font-bold mb-4">School Registered Successfully!</h2>
        <p className="text-gray-700 mb-6">
          Your school has been successfully registered. We will review the details you provided and send you a confirmation email shortly.
        </p>
        <p className="text-gray-500 text-sm">
          Thank you for joining our community!
        </p>
      </div>
    </div>
  );
};

export default SubmittedSuccessfully;
