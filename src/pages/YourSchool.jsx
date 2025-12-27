import React, { useState, useEffect } from "react";
import Slidebar from "../components/Slidebar";
import SchoolLoginForm from "../components/form/SchoolLoginForm";
import { getSchoolProducts } from "../components/form/api";
import Cards from "../components/Cards";
import { getThumbnailUrl } from "../utils/fileUtils";
import { FaSignOutAlt, FaBars, FaTimes, FaUpload } from 'react-icons/fa';
import { Icon } from "@iconify/react";
import { Loading } from "../components/form/MiniComp";
import AdminPanel from "../components/AdminPanel";
import SchoolProfile from "../components/SchoolProfile";
import AdminProfile from "../components/AdminProfile";

const YourSchool = ({ auth, showAlert }) => {
  const [schoolDataList2, setSchoolDataList2] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [showProfileSidebar, setShowProfileSidebar] = useState(false); // New state for sidebar visibility

  useEffect(() => {
    if (auth === undefined) {
      setIsLoadingPage(true);
      return;
    }

    if (!auth) {
        setIsLoadingPage(false);
        return;
    }

    if (auth._id && auth.role !== 'admin') {
      setIsLoadingPage(true);
      getSchoolProducts(auth._id)
        .then((products) => {
          setSchoolDataList2(products);
        }).catch((err) => {
          console.error('Error fetching school products:', err);
        })
        .finally(() => setIsLoadingPage(false));
    } else {
      setIsLoadingPage(false);
    }
  }, [auth]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
    window.location.reload();
  };

  if (isLoadingPage) {
    return <Loading />;
  }

  if (!auth) {
    return <SchoolLoginForm showAlert={showAlert} />;
  }

  return (
    <>
      <Slidebar />
      <div className="min-h-screen w-full bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
       
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-linear-to-br from-emerald-200/20 to-green-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-linear-to-tr from-teal-200/20 to-emerald-300/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="relative flex flex-col lg:flex-row gap-6">
           
            <button
              className="3xl:hidden p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 self-start mb-4 hover:bg-white/90 transition-all duration-300"
              onClick={() => setShowProfileSidebar(!showProfileSidebar)}
            >
              {showProfileSidebar ? <FaTimes className="h-6 w-6 text-emerald-700" /> : <FaBars className="h-6 w-6 text-emerald-700" />}
            </button>

            
            <aside
              className={`fixed 3xl:relative top-15 overflow-auto max-md:pb-20 left-0 h-full bg-white/95 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 transform ${
                showProfileSidebar ? 'translate-x-0' : '-translate-x-full'
              } 3xl:translate-x-0 transition-all duration-500 ease-in-out z-40
              w-11/12 md:w-1/2 3xl:w-1/4 hover:shadow-3xl`} 
            >
              <div className="flex flex-col items-center">
               
                <button
                  className="3xl:hidden self-end p-2 mb-4 focus:outline-none hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  onClick={() => setShowProfileSidebar(false)}
                >
                  <FaTimes className="h-6 w-6 text-gray-600" />
                </button>

               
                
                <div className="w-full bg-linear-to-r from-emerald-100 to-green-100 rounded-2xl p-1 mb-6">
                  <div className="w-full bg-white rounded-xl">
                    {auth.role === 'admin' ? <AdminProfile auth={auth} /> : <SchoolProfile auth={auth} />}
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="mt-6 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-full flex items-center justify-center gap-2 shadow-md"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </aside>

            
            {showProfileSidebar && (
              <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
                onClick={() => setShowProfileSidebar(false)}
              ></div>
            )}

            
            <main className="w-full lg:w-3/4 lg:ml-4"> 
              {auth.role === 'admin' ? (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-6">
                  <AdminPanel auth={auth} handleLogout={handleLogout} />
                </div>
              ) : (
                <div className="flex items-center flex-col gap-8">
                  
                  <div className="relative text-center mb-8">
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-400/10 to-green-400/10 blur-2xl transform scale-110 rounded-3xl"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-100">
                      <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="w-16 h-0.5 bg-linear-to-r from-transparent to-emerald-400 rounded-full"></div>
                        <div className="relative p-3 bg-emerald-100 rounded-full">
                          <FaUpload className="text-emerald-600" size={24} />
                        </div>
                        <div className="w-16 h-0.5 bg-linear-to-l from-transparent to-green-400 rounded-full"></div>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Add New Products</h3>
                        <p className="text-gray-600">Upload Products from your school to help needers</p>
                      </div>
                      
                      <a 
                        href="/uploadProducts" 
                        className="group relative bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 cursor-pointer text-white px-8 py-4 rounded-2xl inline-flex gap-3 font-bold text-lg md:text-xl items-center transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center gap-3">
                          <FaUpload/>
                          Upload Products
                        </span>
                      </a>
                      
                      <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full">
                          <Icon icon="mdi:check-circle" className="text-emerald-500" />
                          <span className="text-sm text-emerald-700 font-medium">Easy to upload</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  
                  <div className="w-full">
                    <div className="bg-white/80 max-md:w-full backdrop-blur-md rounded-3xl shadow-xl border border-white/20 p-6 flex flex-col items-center">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Products</h2>
                      <div className="grid w-full justify-items-center grid-cols-1 md:grid-cols-2 4lg:grid-cols-3 gap-6">
                        {schoolDataList2.length > 0 ? (
                          schoolDataList2.map((schoolData, index) => (
                            <div key={schoolData._id || index} className="w-full flex justify-center transform hover:scale-105 transition-all duration-300">
                              <Cards 
                                key={schoolData._id || index} 
                                title={schoolData.title} 
                                _id={schoolData._id} 
                                availability={schoolData.availability ? "Available" : "Unavailable"} 
                                thumbnail={getThumbnailUrl(schoolData.thumbnail)} 
                              />
                            </div>
                          ))
                        ) : (
                          <div className="col-span-full text-center py-12">
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Yet</h3>
                            <p className="text-gray-500">Start by uploading your first product!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};


export default YourSchool;
