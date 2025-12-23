import { useState, useEffect } from "react";
import { getAllSchool, getSchoolLeaderBoard } from "./form/api";
import { ImSpinner10 } from "react-icons/im";

export default function SchoolDetail() {
  const [schoolData, setSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allSchools, leaderboardData] = await Promise.all([
          getAllSchool(),
          getSchoolLeaderBoard(),
        ]);

        const productsMap = new Map(
          leaderboardData.map((school) => [
            school._id,
            {
              totalProducts: school.totalProducts || 0,
              helpedStudents: school.helpedStudents ?? 0,
            },
          ])
        );

        const mergedAndSortedData = allSchools
          .map((school) => {
            const stats = productsMap.get(school._id) || {
              totalProducts: 0,
              helpedStudents: 0,
            };
            return {
              ...school,
              totalProducts: stats.totalProducts,
              helpedStudents: stats.helpedStudents,
            };
          })
          .sort((a, b) => b.totalProducts - a.totalProducts);

        setSchoolData(mergedAndSortedData);
      } catch (error) {
        console.error("Failed to fetch school data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-w-full flex items-center justify-center my-10">
        <ImSpinner10 className="animate-spin text-6xl text-green-700" />
      </div>
    );
  }

  const getRankClass = (index) => {
    if (index < 3) {
      return "text-3xl font-bold text-yellow-500";
    }
    return "text-2xl font-bold text-gray-600";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-green-800 text-white rounded-t-lg shadow-lg p-4 md:flex hidden items-center justify-between font-bold text-lg">
        <h1 className="w-1/12 text-center">Rank</h1>
        <h1 className="w-4/12">School Name</h1>
        <h1 className="w-3/12">Sub District</h1>
        <h1 className="w-3/12">Address</h1>
        <h1 className="w-1/12 text-center">Products</h1>
      </div>

      <div className="space-y-4 mt-4">
        {schoolData.map((school, index) => {
          const isTopThree = index < 3;

          return (
            <a
              key={school._id}
              href={`/schoolPage?id=${school._id}`}
              className={`block transform transition-all duration-300 hover:scale-105 hover:shadow-2xl rounded-lg shadow-md ${
                isTopThree ? 'bg-yellow-50 border-2 border-yellow-200' : 'bg-white'
              }`}
            >
              <div className="flex flex-col md:flex-row items-center p-4">
                <div className="w-full md:w-1/12 flex justify-center items-center mb-4 md:mb-0">
                  <span className={getRankClass(index)}>{index + 1}</span>
                </div>
                <div className="w-full md:w-4/12 text-center md:text-left font-semibold text-green-900 text-lg">
                  {String(school.schoolName)}
                </div>
                <div className="w-full md:w-3/12 text-center md:text-left text-gray-700 mt-2 md:mt-0">
                  {school.subDistrict}
                </div>
                <div className="w-full md:w-3/12 text-center md:text-left text-gray-500 mt-2 md:mt-0">
                  {school.address}
                </div>
                <div className="w-full md:w-1/12 text-center font-bold text-3xl text-green-800 mt-4 md:mt-0">
                  {school.totalProducts}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
