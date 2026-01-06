import React, { useEffect, useState } from "react";
import Slidebar from "../components/Slidebar";
import { getAllSchool, deleteSchool } from "../components/form/api";
import { ImSpinner10 } from "react-icons/im";
import { Loading } from "../components/form/MiniComp";


export default function UserManagement(){
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getAllSchool()
      .then((res) => {
        const data = Array.isArray(res) ? res : res?.data || [];
        setSchools(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  
  const handleDeleteClick = (schoolId) => {
    setSelectedSchoolId(schoolId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    deleteSchool(selectedSchoolId).then((res) => {
      setSchools(schools.filter((school) => school._id !== selectedSchoolId));
      setShowModal(false);
      setSelectedSchoolId(null);
    }).catch((err) => {
      console.error('Failed to delete school', err);
    }).finally(() => {
      setIsDeleting(false);
    });
  };

  const filteredSchools = schools.filter((school) =>
    school.schoolName?.toLowerCase().includes(search.toLowerCase())
  );

  return(
    <>
    <Slidebar />
    <div className="min-h-screen w-full bg-[#f0f8ef] p-4 md:p-8">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {isDeleting ? (
              <div className="flex flex-col items-center justify-center py-8">
                <h3 className="text-xl font-bold text-green-800 animate-pulse">Removing {schools.find((school) => school._id === selectedSchoolId)?.schoolName}...</h3>
              </div>
            ) : (
            <>
            <h3 className="text-lg font-bold text-red-600 text-center mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Do you want to remove <span className="text-green-700 font-bold">{schools.find((school) => school._id === selectedSchoolId)?.schoolName}</span>?</p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 transition-colors"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
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
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10 font-serif">Registered Schools</h1>
      
      <div className="flex justify-center mb-8">
        <input
          type="text"
          className="w-full max-w-md px-6 py-3 rounded-full shadow-md bg-white focus:border-green-500 focus:outline-none text-lg"
          placeholder="Search school by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {loading ? (
        <Loading message="Loading All Schools..."/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredSchools.map((school) => (
            <div key={school._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
              <div className="h-48 w-full bg-gray-200 relative">
                <img 
                  src={school.schoolImage ? `https://rrr-backend-9ait.onrender.com/${school.schoolImage}` : "https://via.placeholder.com/300?text=No+Image"} 
                  alt={school.schoolName}
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = "https://via.placeholder.com/300?text=No+Image"}}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1" title={school.schoolName}>{school.schoolName}</h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2" title={school.address}>{school.address || "No address provided"}</p>
                
                <div className="mt-auto space-y-2 text-sm text-gray-700">
                  <p><span className="font-semibold">Email:</span> {school.schoolEmail}</p>
                  <p><span className="font-semibold">Phone:</span> {school.schoolPhone}</p>
                  <p><span className="font-semibold">Incharge:</span> {school.inchargeName}</p>
                </div>

                <div className="min-w-full flex items-center justify-center mt-5">
                  <button
                    onClick={() => handleDeleteClick(school._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove school
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && filteredSchools.length === 0 && (
        <div className="text-center text-gray-500 text-xl">No schools found</div>
      )}
    </div>
    </>
  );
};
