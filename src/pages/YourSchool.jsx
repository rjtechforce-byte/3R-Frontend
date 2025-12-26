import React, { useState, useEffect } from "react";
import Slidebar from "../components/Slidebar";
import SchoolLoginForm from "../components/form/SchoolLoginForm";
import { getSchoolProducts } from "../components/form/api";
import Cards from "../components/Cards";
import { getThumbnailUrl } from "../utils/fileUtils";
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'; // Import FaBars and FaTimes
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
      <div className="min-h-screen w-full bg-gray-50 p-4">
        <div className="relative flex flex-col lg:flex-row gap-4">
         
          <button
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 self-start mb-4"
            onClick={() => setShowProfileSidebar(!showProfileSidebar)}
          >
            {showProfileSidebar ? <FaTimes className="h-6 w-6 text-green-800" /> : <FaBars className="h-6 w-6 text-green-800" />}
          </button>

          
          <aside
            className={`fixed lg:relative top-15 left-0 h-full bg-white p-4 rounded-lg shadow-lg transform ${
              showProfileSidebar ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40
            w-11/12 md:w-1/2 lg:w-1/4`} 
          >
            <div className="flex flex-col items-center">
             
              <button
                className="lg:hidden self-end p-2 mb-4 focus:outline-none"
                onClick={() => setShowProfileSidebar(false)}
              >
                <FaTimes className="h-6 w-6 text-gray-600" />
              </button>

              <div className="w-12 h-12 rounded-full bg-green-800 text-white flex items-center justify-center mb-4">
                <span>{auth.schoolName ? auth.schoolName.charAt(0) : (auth.name ? auth.name.charAt(0) : 'U')}</span>
              </div>
              {auth.role === 'admin' ? <AdminProfile auth={auth} /> : <SchoolProfile auth={auth} />}
              <button
                onClick={handleLogout}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 w-full flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          
          {showProfileSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setShowProfileSidebar(false)}
            ></div>
          )}

          
          <main className="w-full lg:w-3/4 lg:ml-4"> 
            {auth.role === 'admin' ? (
              <AdminPanel auth={auth} handleLogout={handleLogout} />
            ) : (
              <div className="flex items-center flex-col gap-10">
                <div className="flex justify-around min-w-full">
                  <a href="/uploadProducts" className="bg-white cursor-pointer text-green-800 px-15 xl:mt-27 py-2 mt-7 border-2 shadow-xl border-white-800 inline-flex gap-2 font-serif font-semibold text-2xl md:text-4xl items-center transition-all duration-700 rounded-[9px] group hover:text-white hover:bg-green-800">
                    Upload Products
                  </a>
                </div>
                <div className="flex 2xl:gap-14 flex-wrap justify-around">
                  {schoolDataList2.map((schoolData, index) => (
                    <Cards key={schoolData._id || index} title={schoolData.title} _id={schoolData._id} availability={schoolData.availability ? "Available" : "Unavailable"} thumbnail={getThumbnailUrl(schoolData.thumbnail)} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};


export default YourSchool;
