import React, { useState, useEffect } from 'react';
import Slidebar from '../components/Slidebar';
import { approveSchool, getUnapprovedSchools, deleteSchool } from '../components/form/api';
import { Loading } from '../components/form/MiniComp';
import { getThumbnailUrl } from '../utils/fileUtils';

const ApproveSchool = ({ showAlert }) => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
   getUnapprovedSchools().then((data) => {
    console.log('Unapproved schools data:', data);
      setSchools(data);
      setLoading(false);
    }).catch((err) => {
      setError('Failed to fetch unapproved schools.');
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, [loading]);

  const handleApprove = (schoolId) => {
    setLoading(true);
   approveSchool(schoolId).then((res) => {
    console.log('approve', res)
      showAlert(res.data?.message || res.message, "not-error", "approve");
      
    }).catch((err) => {
      setError('Failed to approve school.');
      console.error(err);
    });
  };
  
  const handleReject = (schoolId) => {
    setSelectedSchoolId(schoolId);
    setShowModal(true);
  };

  const confirmReject = () => {
    setIsDeleting(true);
    deleteSchool(selectedSchoolId).then((res) => {
      console.log('rejct', res);
      showAlert(res.data?.message || res.message, "not-error", "reject");
      setSchools(schools.filter((school) => school._id !== selectedSchoolId));
      setShowModal(false);
      setSelectedSchoolId(null);
    }).catch((err) => {
      setError('Failed to reject school.');
      console.error(err);
    }).finally(() => {
      setIsDeleting(false);
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
       <Loading/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100">
        <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-xl font-bold text-red-700">An Error Occurred</h2>
            <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
     <>
      <Slidebar />
    <div className="min-h-screen bg-gray-50">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {isDeleting ? (
              <div className="flex flex-col items-center justify-center py-8">
                <h3 className="text-xl font-bold text-green-800 animate-pulse">Rejecting school...</h3>
              </div>
            ) : (
              <>
                <h3 className="text-lg text-center font-bold text-red-600 mb-4">Confirm Rejection</h3>
                <p className="text-gray-600 mb-6">Do you want to Reject <span className="text-green-700 font-bold">{schools.find((school) => school._id === selectedSchoolId)?.schoolName}</span>?</p>
                <div className="flex justify-around">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors"
              >
                    No
                  </button>
                  <button
                    onClick={confirmReject}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                  >
                    Yes
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">School Approval Queue</h1>
            <p className="mt-2 text-lg text-gray-600">Review and approve new school registrations.</p>
        </div>

        {schools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-medium text-gray-500">No pending school approvals.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="min-w-full divide-y divide-gray-200">
                    <div className="bg-gray-50">
                      <div className="flex w-full">
                        <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                          School Name
                        </div>
                        <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                          Contact
                        </div>
                        <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                          Incharge
                        </div>
                         <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                          Address
                        </div>
                        <div className="relative px-6 py-3 w-1/5">
                          <span className="sr-only">Actions</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white divide-y divide-gray-200">
                      {schools.map((school) => (
                        <div key={school._id} className="flex w-full items-center hover:bg-gray-50 py-2">
                          <div className="px-6 py-4 whitespace-nowrap w-1/5">
                            <div className="flex items-center">
                              <div className="shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={school.schoolImage} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{school.schoolName}</div>
                                <div className="text-sm text-gray-500">{school.subDistrict}</div>
                              </div>
                            </div>
                          </div>
                          <div className="px-6 py-4 whitespace-nowrap w-1/5">
                            <div className="text-sm text-gray-900">{school.schoolEmail}</div>
                            <div className="text-sm text-gray-500">{school.schoolPhone}</div>
                          </div>
                           <div className="px-6 py-4 whitespace-nowrap w-1/5">
                            <div className="text-sm text-gray-900">{school.inchargeName}</div>
                            <div className="text-sm text-gray-500">{school.inchargePhone}</div>
                          </div>
                          <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/5">
                            {school.address}
                          </div>
                          <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium w-1/5">
                            <button
                              onClick={() => handleApprove(school._id)}
                              className="mr-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(school._id)}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ApproveSchool;
