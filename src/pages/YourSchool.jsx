import React, { useContext, useState, useEffect } from "react";
import SelectSchool from "../components/SelectSchool";
import Slidebar from "../components/Slidebar";
import { AllProductsData } from "../context/AllProducts";
import SchoolLoginForm from "../components/form/SchoolLoginForm";
import { getSchoolProducts } from "../components/form/api"; 
import Cards from "../components/Cards";
const YourSchool = ({ auth, showAlert }) => {
  const [schoolDataList2, setSchoolDataList2] = useState([]);
  const schoolDataList = useContext(AllProductsData);

  console.log("School Data List:", schoolDataList);
  useEffect(() => {
    if (auth) {
      getSchoolProducts(auth._id)
        .then((products) => {
          setSchoolDataList2(products);
          console.log("Products for school:", products);
        })
    }
  }, [auth]);

  console.log("scholldata", schoolDataList2);

  return (
    <>
      <Slidebar />
      <div className="min-h-screen w-full">
        {auth ? (
          <div className="flex items-center flex-col gap-10">
            <div className="flex justify-around min-w-full">
              <a href="/uploadProducts" className="bg-white cursor-pointer text-green-800 px-15 xl:mt-27 py-2 mt-7 border-2 shadow-xl border-white-800  inline-flex gap-2 font-semibold text-4xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-white hover:bg-green-800">Upload Products</a>
              <a href={"/product/" + auth._id + "/helpedStudent"} className='bg-green-800 cursor-pointer text-white px-15 xl:mt-27 py-2 mt-7 border-2 shadow-xl border-white-800  inline-flex gap-2 font-semibold text-4xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-green-800 hover:bg-white'>Add Helped Student</a>
            </div>
            <div className="flex flex-wrap justify-center">
              {schoolDataList2 || [].map((schoolData, index) => <Cards key={schoolData._id || index} title={schoolData.title} _id={schoolData._id} availability={schoolData.availability ? "Available" : "Unavailable"} thumbnail={`https://rrr-frontend.onrender.com/${schoolData.thumbnail}`} />)}
            </div>
          </div>
        ) : (
          <SchoolLoginForm showAlert={showAlert} />
        )}
      </div>
    </>
  );
};

export default YourSchool;
