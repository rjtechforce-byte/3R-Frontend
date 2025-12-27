import React, { useState, useEffect } from "react";
import { Chart as ChartJS, defaults} from 'chart.js/auto';
import { Line, Radar, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { getSchoolLeaderBoard } from "../components/form/api";
import Slidebar from "../components/Slidebar";
import { ImSpinner10 } from "react-icons/im";


export default function SiteStatistics () {
  const [schoolLabels, setSchoolLabels] = useState([]);
  const [helpedData, setHelpedData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSchoolLeaderBoard()
      .then((data) => {
        if (!data || !Array.isArray(data)) return;
        const names = data.map((item) => (item.school && item.school.schoolName) || item.schoolName || item.name || "");
        const helped = data.map((item) => Number(item.helpedStudents) || 0);
        const products = data.map((item) => Number(item.totalProducts) || 0);
        setSchoolLabels(names);
        setHelpedData(helped);
        setProductData(products);
      })
      .catch((err) => {
        console.error('Error fetching leaderboard', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return(
    <>
    <Slidebar />
    <div className="flex w-full min-h-screen flex-col bg-[#f0f8ef] pb-10">
      <div className="w-full mx-auto flex flex-col mt-0 h-fit items-center justify-center px-4">
      <h1 className="mt-10 mb-6 font-serif text-2xl text-green-800 md:text-4xl lg:text-5xl font-bold text-center drop-shadow-sm">Total Available Products & Helped Students</h1>
      <div className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl w-full lg:w-[90%] xl:w-[85%] h-[400px] md:h-[600px] flex items-center justify-center border border-green-100">
        {loading ? (
          <div className="flex items-center justify-center text-6xl text-green-800"><ImSpinner10 className="animate-spin" /></div>
        ) : (
          <Line 
            className="w-full h-full"
            data={{
              labels: schoolLabels,
              datasets: [
                {
                  label: 'Helped Students',
                  data: helpedData,
                  fill: false,
                  borderColor: '#16a34a',
                  backgroundColor: "#16a34a",
                  tension: 0.1
                },
                {
                  label: 'Available Products',
                  data: productData,
                  fill: false,
                  borderColor: '#ca8a04',
                  backgroundColor: "#ca8a04",
                  tension: 0.1
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            family: 'serif'
                        },
                        color: '#166534'
                    }
                }
              },
              scales: {
                x: {
                  ticks: {
                    font: {
                      size: 12,
                      family: "serif",
                    },
                    color: '#14532d',
                    maxRotation: 45,
                    minRotation: 0
                  },
                  grid: {
                      color: '#dcfce7'
                  }
                },
                y: {
                    ticks: {
                        color: '#14532d',
                        font: {
                            family: 'serif'
                        }
                    },
                    grid: {
                        color: '#dcfce7'
                    }
                }
              }
            }}
          />
        )}
      </div>
      </div>


      <div className="w-full lg:w-[90%] xl:w-[85%] mx-auto mt-12 px-4 flex flex-col lg:flex-row justify-between gap-8 lg:gap-10">
      <div className="flex flex-col w-full lg:w-1/2 h-fit">
      <h1 className="text-center font-serif text-xl text-green-800 md:text-3xl font-bold mb-4">Available Products</h1>
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl w-full h-[400px] flex items-center justify-center border border-green-100 hover:shadow-2xl transition-shadow duration-300">
        {loading ? (
          <div className="flex items-center justify-center text-6xl text-green-800"><ImSpinner10 className="animate-spin" /></div>
        ) : (
          <Bar 
            className="w-full h-full"
            data={{
              labels: schoolLabels,
              datasets: [
                {
                  label: 'Available Products',
                  data: productData,
                  fill: false,
                  backgroundColor: "rgba(202, 138, 4, 0.7)",
                  borderColor: '#ca8a04',
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(202, 138, 4, 1)",
                  tension: 0.1
                }
              ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: { family: 'serif' },
                            color: '#166534'
                        }
                    }
                },
                scales: {
                    x: { ticks: { color: '#14532d', font: { family: 'serif' } }, grid: { display: false } },
                    y: { ticks: { color: '#14532d', font: { family: 'serif' } }, grid: { color: '#f0fdf4' } }
                }
            }}
          />
        )}
      </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 h-fit">
      <h1 className="text-center font-serif text-xl text-green-800 md:text-3xl font-bold mb-4">Helped Students</h1>
      <div className="bg-white p-4 md:p-6 rounded-3xl shadow-xl w-full h-[400px] flex items-center justify-center border border-green-100 hover:shadow-2xl transition-shadow duration-300">
        {loading ? (
          <div className="flex items-center justify-center text-6xl text-green-800"><ImSpinner10 className="animate-spin" /></div>
        ) : (
          <Bar 
            className="w-full h-full"
            data={{
              labels: schoolLabels,
              datasets: [
                {
                  label: 'Helped Students',
                  data: helpedData,
                  fill: false,
                  backgroundColor: "rgba(22, 163, 74, 0.7)",
                  borderColor: '#16a34a',
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(22, 163, 74, 1)",
                  tension: 0.1
                }
              ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            font: { family: 'serif' },
                            color: '#166534'
                        }
                    }
                },
                scales: {
                    x: { ticks: { color: '#14532d', font: { family: 'serif' } }, grid: { display: false } },
                    y: { ticks: { color: '#14532d', font: { family: 'serif' } }, grid: { color: '#f0fdf4' } }
                }
            }}
          />
        )}
      </div>
      </div>
      </div>
    </div>
    </>
  )
}