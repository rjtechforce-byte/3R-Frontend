import React, { useState, useEffect } from 'react';
import Slidebar from '../components/Slidebar';
import { approveSchool, getUnapprovedSchools } from '../components/form/api';
import { Loading } from '../components/form/MiniComp';


const ApproveSchool = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   getUnapprovedSchools().then((data) => {
    console.log('Unapproved schools data:', data);
      setSchools(data);
    }).catch((err) => {
      setError('Failed to fetch unapproved schools.');
      console.error(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleApprove = (schoolId) => {
   approveSchool(schoolId).then(() => {
      setSchools(schools.filter(school => school._id !== schoolId));
    }).catch((err) => {
      setError('Failed to approve school.');
      console.error(err);
    });
  };
  
  const handleReject = (schoolId) => {
    // In a real app, you'd likely want to call a backend endpoint to reject.
    // For this example, we'll just remove it from the list.
    setSchools(schools.filter(school => school._id !== schoolId));
  };

  if (loading) {
    return <Loading message="Loading School Approvals..." />;
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
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          School Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Incharge
                        </th>
                         <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Address
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {schools.map((school) => (
                        <tr key={school._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={`https://rrr-backend-9ait.onrender.com/${school.schoolImage}`} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{school.schoolName}</div>
                                <div className="text-sm text-gray-500">{school.subDistrict}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{school.schoolEmail}</div>
                            <div className="text-sm text-gray-500">{school.schoolPhone}</div>
                          </td>
                           <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{school.inchargeName}</div>
                            <div className="text-sm text-gray-500">{school.inchargePhone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {school.address}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
