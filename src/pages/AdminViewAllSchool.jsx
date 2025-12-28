import React, { useState, useEffect } from 'react';
import { getAllSchool, getSchoolProducts, deleteProduct } from '../components/form/api';
import Slidebar from '../components/Slidebar';
import DropDown from '../components/form/DropDown';
import { Chart as ChartJS, defaults} from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { ImSpinner10 } from "react-icons/im";

export default function ViewAllSchool() {
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [helpedData, setHelpedData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      getAllSchool().then((data) => {
        setSchools(data);
        setLoading(false);
      });
    }, []);

  useEffect(() => {
    if (!selectedSchool) {
      setProducts([]);
      setCategoryData(null);
      setHelpedData(null);
      return;
    }

    setLoading(true);
    getSchoolProducts(selectedSchool)
      .then((data) => {
        const prods = Array.isArray(data) ? data : [];
        setProducts(prods);

        // Generate consistent colors for categories
        const uniqueCategories = [...new Set(prods.map(p => p.category || 'Others'))];
        const palette = [
          'rgba(255, 99, 132, 0.8)',   // Red
          'rgba(54, 162, 235, 0.8)',   // Blue
          'rgba(255, 206, 86, 0.8)',   // Yellow
          'rgba(75, 192, 192, 0.8)',   // Teal
          'rgba(153, 102, 255, 0.8)',  // Purple
          'rgba(255, 159, 64, 0.8)',   // Orange
          'rgba(201, 203, 207, 0.8)',  // Grey
          'rgba(233, 30, 99, 0.8)',    // Pink
          'rgba(103, 58, 183, 0.8)',   // Deep Purple
          'rgba(0, 150, 136, 0.8)',    // Teal Dark
        ];
        
        const colorMap = {};
        uniqueCategories.forEach((cat, index) => {
          colorMap[cat] = palette[index % palette.length];
        });

        const getColor = (cat) => colorMap[cat] || palette[0];

        // Category distribution for available products (availability > 0)
        const avail = prods.filter((p) => Number(p.availability) > 0);
        const categoryCounts = avail.reduce((acc, cur) => {
          const cat = cur.category || 'Others';
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        }, {});

        const catLabels = Object.keys(categoryCounts);
        const catColors = catLabels.map(cat => getColor(cat));

        setCategoryData({
          labels: catLabels,
          datasets: [
            {
              label: 'Available Products by Category',
              data: Object.values(categoryCounts),
              backgroundColor: catColors,
              hoverBackgroundColor: catColors.map(c => c.replace('0.8', '1')),
              borderColor: catColors.map(c => c.replace('0.8', '1')),
              borderWidth: 1,
              borderRadius: 8,
              barPercentage: 0.6,
            },
          ],
        });

        // Helped students aggregated by category (use same category labels/colors)
        const helpedByCategory = {};
        // initialize with category labels to ensure same order and include zeros
        catLabels.forEach((cat) => { helpedByCategory[cat] = 0; });

        prods.forEach((p) => {
          const cat = p.category || 'Others';
          let count = 0;
          if (Array.isArray(p.helpedStudents)) {
            count = p.helpedStudents.filter(h => h && (h.name || h.name === '') ? Boolean(h.name) : false).length;
          } else if (p.helpedStudents && typeof p.helpedStudents === 'object') {
            if (p.helpedStudents.name) count = 1;
          }
          helpedByCategory[cat] = (helpedByCategory[cat] || 0) + count;
        });

        const helpedLabels = catLabels;
        const helpedCounts = helpedLabels.map((c) => helpedByCategory[c] || 0);
        const helpedColors = helpedLabels.map((c) => getColor(c));

        setHelpedData({
          labels: helpedLabels,
          datasets: [
            {
              label: 'Helped Students by Category',
              data: helpedCounts,
              backgroundColor: helpedColors,
              hoverBackgroundColor: helpedColors.map(c => c.replace('0.8', '1')),
              borderColor: helpedColors.map(c => c.replace('0.8', '1')),
              borderWidth: 1,
              borderRadius: 8,
              barPercentage: 0.6,
            },
          ],
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error('error fetching school products', err);
        setLoading(false);
      });
  }, [selectedSchool]);

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#111827',
        bodyColor: '#374151',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: { size: 13, weight: 'bold' },
        bodyFont: { size: 12 },
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6', borderDash: [4, 4], drawBorder: false },
        ticks: { precision: 0, color: '#6b7280', font: { size: 11 } },
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: '#6b7280', font: { size: 11 }, maxRotation: 45, autoSkip: true },
      },
    },
  };

  const helpedOptions = {
    ...commonOptions,
  };
    

  return (
    <>
      <Slidebar />
      <div className="p-4 min-h-screen items-center flex flex-col mt-0 w-full bg-[#f0f8ef]">
      <div className="xl:max-w-[80%] min-w-full xl:min-w-[80%] bg-white p-8 rounded-2xl shadow-xl border border-green-100 mt-10">
        <DropDown
          inputClass="w-full border-2 border-green-100 bg-white text-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-50 transition-all duration-300 shadow-sm hover:border-green-300 cursor-pointer placeholder-transparent peer"
          labelClass="absolute left-3 -top-2.5 bg-white px-2 text-sm font-bold text-green-600 transition-all peer-focus:text-green-700 peer-focus:scale-105"
          name="school-select"
          label={<span>Select School</span>}
          id="school-select"
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
          className="relative min-w-full"
        >
          <option className='text-gray-400' value="">{loading ? "Loading All Schools..." : "-- Choose a school --"}</option>
          {schools.map((school) => (
            <option className='text-gray-700 py-2 cursor-pointer' key={school._id} value={school._id}>
              {school.schoolName}
            </option>
          ))}
        </DropDown>
      </div>
      {selectedSchool && (
          <div className="xl:max-w-[80%] xl:min-w-[80%] mt-8 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">Available Products by Category</h3>
                <div style={{ height: 340 }} className="w-full">
                  {loading && !categoryData ? (
                     <div className="flex items-center h-full justify-center text-6xl text-green-800"><ImSpinner10 className="animate-spin" /></div>
                  ) : categoryData && categoryData.labels.length ? (
                    <Bar
                     data={categoryData}
                     options={commonOptions} />
                  ) : (
                    <p className="text-sm text-gray-500">No available products to display.</p>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-700 mb-6 text-center">Helped Students per Product</h3>
                <div style={{ height: 340 }} className="w-full">
                  {loading && !helpedData ? (
                     <div className="flex items-center h-full justify-center text-6xl text-green-800"><ImSpinner10 className="animate-spin" /></div>
                  ) : helpedData && helpedData.labels.length ? (
                    <Bar data={helpedData} options={helpedOptions} />
                  ) : (
                    <p className="text-sm text-gray-500">No helped-student data available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}