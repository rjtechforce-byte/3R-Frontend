import React, { useEffect, useState } from "react";
import Item from "./Item.jsx";
import DropDown from "./form/DropDown.jsx";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { getSchoolBySubDistrict } from "./form/api.js";

function SelectSchool({ schoolDataList }) {

   const [selectedSubDistrict, setSelectedSubDistrict] = useState("default");
   const [selectedSchool, setSelectedSchool] = useState("default");
   const [schoolList, setSchoolList] = useState([]);
   const subDistrict = [
    'Sardarshahar',
    'Rajgarh',
    'Ratangarh',
    'Sujangarh',
    'Taranagar',
    'Bidasar',
    'Churu'
   ]

  function selectedSchoolProductsfun(event) {
  }
  function handleDistrictChange(event) {
     setSelectedSubDistrict(event.target.value);
  }

  function handleSchoolChange(event) {
    setSelectedSchool(event.target.value);
  }

  useEffect(() => {
     if(selectedSubDistrict !== 'default') {
       getSchoolBySubDistrict(selectedSubDistrict).then((res) => {
        console.log(res);
        setSchoolList(res);
       })
     }
  }, [selectedSubDistrict])


   console.log('schoolList', schoolList);
  return (
    <>
      <div className="bg-green-100 h-screen w-full flex items-center flex-col">
        <div className="mt-20 flex items-center justify-center flex-col gap-12">
          <h2 className="text-green-900 text-4xl font-serif font-bold">
            Want to see things in your school!
          </h2>
          <Link
            to="/uploadProducts"
            className="text-white bg-green-800 px-5 py-2 border-2 shadow-xl border-green-800 flex gap-2 font-semibold text-lg items-center transition-all duration-700 rounded-[9px] group hover:bg-white hover:text-green-800"
          >
            <Icon
              className="text-white group-hover:text-green-800"
              icon="proicons:box-add"
              width="35px"
              height="35px"
            />{" "}
            Add New Product
          </Link>
          <span className="text-green-600 text-2xl font-black">OR</span>
          <Link className="bg-white text-green-800 px-5 py-2 border-2 shadow-xl border-white-800 flex gap-2 font-semibold text-lg items-center transition-all duration-700 rounded-[9px] group hover:text-white hover:bg-green-800">
            <Icon
              className="group-hover:text-white text-green-800"
              icon="mdi:donate-outline"
              width="35px"
              height="35px"
            />{" "}
            Add Helped Student
          </Link>
          <h1 className="text-green-900 text-7xl font-serif font-bold">
            Select Your School
          </h1>
        </div>

        <div className="bg-[#D9E4DD] rounded-[9px] mt-14 p-10 min-w-2xl text-2xl font-serif flex flex-col lg:flex-row justify-between px-20 outline-none items-center shadow-2xl gap-8">
          <DropDown
            className="rounded-md text-green-950 w-fit border-green-900 border-2"
            label="Sub-District"
            name="districtSelector"
            id="districtSelector"
            onChange={handleDistrictChange}
            value={selectedSubDistrict}
          >
            <option value="default" className="bg-green-900">
              Select Your Sub-District
            </option>
           {subDistrict.map((item, index) =>  <option
                className="rounded-md  bg-green-900"
                key={index}
                value={item.toLowerCase()}
              >
                {item}
              </option>)}
          </DropDown>

          <DropDown
            className="rounded-md text-green-950 w-fit border-green-900 border-2"
            label="School"
            name="schoolSelector"
            id="schoolSelector"
            onChange={handleSchoolChange}
            value={selectedSchool}
            disabled={selectedSubDistrict === "default"}
          >
            <option value="default" className="bg-green-900">
              Select Your School
            </option>

          {schoolList && schoolList.length > 0 && schoolList.map((school, index) =>  <option
                className="rounded-md  bg-green-900"
                key={school._id || index}
                value={school._id}
              >
                {String(school.schoolName)}
              </option>)}
          </DropDown>
        </div>
      </div>
      <div>
        {'any' ? (
          <>
            <h2 className="text-center text-6xl font-bold text-green-800 mb-8 font-serif">
              Available Products
            </h2>
            <div className="flex flex-wrap gap-5 justify-center px-4">
              {[].map(function ({
                category,
                imgUrl,
                description,
                schoolName,
                id,
              }) {
                return (
                  <Item
                    category={category}
                    imgUrl={imgUrl}
                    description={description}
                    schoolName={schoolName}
                    key={id}
                    id={id}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default SelectSchool;
