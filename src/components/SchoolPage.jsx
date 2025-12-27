import React, { useState, useEffect } from "react";
import { getSchoolById, getSchoolLeaderBoard } from "./form/api";
import { FaBackward, FaMapMarkerAlt, FaEnvelope, FaPhone, FaUser, FaBuilding, FaBoxOpen, FaHandHoldingHeart } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { getThumbnailUrl } from "../utils/fileUtils";
import { Icon } from "@iconify/react";
import { BackButton } from "./form/MiniComp";
import InfoCard from "./form/InfoCard";

export default function SchoolPage() {

  const [searchParams] = useSearchParams();
  const schoolId = searchParams.get('id');
  const [selectedSchool, setSelectedSchool] = useState();
  const [helpedCount, setHelpedCount] = useState(0);

  useEffect(() => {
    if (schoolId) {
      const fetchSchoolData = async () => {
        try {
          const [schoolDetails, leaderboardData] = await Promise.all([
            getSchoolById(schoolId),
            getSchoolLeaderBoard(),
          ]);

          const schoolFromLeaderboard = leaderboardData.find((s) => s._id === schoolId);
          const totalProducts = schoolFromLeaderboard ? schoolFromLeaderboard.totalProducts : 0;
          const helped = schoolFromLeaderboard ? (schoolFromLeaderboard.helpedStudents ?? 0) : 0;
          setHelpedCount(helped);

          setSelectedSchool({ ...schoolDetails, totalProducts, helpedStudentsCount: helped });
        } catch (error) {
          console.error("Failed to fetch school details:", error);
        }
      };
      fetchSchoolData();
    }
  }, [schoolId]);



  return(
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl">
        <div className="flex flex-col md:flex-row h-full">
          
          
          <div className="md:w-2/5 relative min-h-[300px] md:min-h-auto bg-gray-200">
             <img 
               className="absolute inset-0 w-full h-full object-cover" 
               src={selectedSchool?.schoolImage ? getThumbnailUrl(selectedSchool.schoolImage) : '/images/placeholder-school.png'} 
               alt="School" 
             />
             <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent md:hidden"></div>
             <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden text-white">
                <h2 className="text-3xl font-bold mb-2 shadow-sm">{selectedSchool?.schoolName}</h2>
                <div className="flex items-center gap-2 text-gray-200 font-medium">
                  <FaMapMarkerAlt />
                  <span>{selectedSchool?.subDistrict}</span>
                </div>
             </div>
          </div>

          
          <div className="md:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
            
          
            <div className="hidden md:block mb-8 border-b border-gray-100 pb-6">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                {selectedSchool?.schoolName || "Loading..."}
              </h1>
              <div className="flex items-center gap-2 text-gray-500 text-lg">
                <FaMapMarkerAlt className="text-red-500" />
                <span>{selectedSchool?.subDistrict}, {selectedSchool?.address}</span>
              </div>
            </div>

            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100 flex flex-col items-center justify-center text-center group hover:bg-blue-100 transition-colors">
                <FaBoxOpen className="text-blue-500 text-3xl mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-blue-900">{selectedSchool?.totalProducts || 0}</span>
                <span className="text-sm font-bold text-blue-600 uppercase tracking-wide">Total Products</span>
              </div>
              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 flex flex-col items-center justify-center text-center group hover:bg-emerald-100 transition-colors">
                <FaHandHoldingHeart className="text-emerald-500 text-3xl mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-3xl font-black text-emerald-900">{helpedCount}</span>
                <span className="text-sm font-bold text-emerald-600 uppercase tracking-wide">Helped Students</span>
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InfoCard icon={<FaBuilding size={20}/>} label="Address" value={selectedSchool?.address} />
              <InfoCard icon={<FaEnvelope size={20}/>} label="Email" value={selectedSchool?.schoolEmail} colorClass="bg-orange-50 text-orange-600" />
              <InfoCard icon={<Icon icon="ic:baseline-phone" width="24" height="24" />} label="School Phone" value={selectedSchool?.schoolPhone} colorClass="bg-purple-50 text-purple-600" />
              <InfoCard icon={<FaUser size={20}/>} label="Incharge Name" value={selectedSchool?.inchargeName} colorClass="bg-pink-50 text-pink-600" />
              <InfoCard icon={<Icon icon="ic:baseline-phone" width="24" height="24"/>} label="Incharge Phone" value={selectedSchool?.inchargePhone} colorClass="bg-teal-50 text-teal-600" />
            </div>

          </div>
        </div>
      </div>

      
     <BackButton to="/schoolContribution" className="mt-6"/>
    </div>
  )

}
