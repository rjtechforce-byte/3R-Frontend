import React, { useState, Link } from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoClose } from "react-icons/io5";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { PiStepsFill } from "react-icons/pi";
import { MdDeveloperMode } from "react-icons/md";
import { GiInspiration } from "react-icons/gi";
import { MdContactMail } from "react-icons/md";
import { FaSchool } from "react-icons/fa6";
import { FaFileContract } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiArrowDropUpLine } from "react-icons/ri";
import { MdAdd } from "react-icons/md";

const Logo = "/images/Logo.png";

function Slidebar () {
  const pathName = window.location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {
    setIsOpen((!isOpen));
  };

  const [openDrop, setDrop] = useState(false);
  const openDropdown = () => {
    setDrop((!openDrop))
  };

  return(
    <>
    <header className="sticky top-0 z-50 background-blur-md opacity-90">
      <nav className={"bg-white flex justify-between items-center text-white h-16 px-4 backdrop-blur-md shadow-md " + (localStorage.getItem('token') && "2xl:pr-40") }>
       <div className="max-w-[60px]">
        <a href="https://education.rajasthan.gov.in" className='z-20' target="_blank"><img className="max-w-full max-h-full" src={Logo} alt="" /></a>
      </div>
      <div className="flex justify-between hover:scale-105 transition-all duration-700 backdrop-blur-md ease-in-out px-2 py-2 shrink-0">
        <a href="/" className='font-extrabold hover:bg-green-100 rounded-lg py-2 px-6 text-2xl text-green-900 z-20'>CODE <span className='text-yellow-600 font-extrabold'>चूरू</span></a>
      </div>
      {!isOpen && (
        <div onClick={openMenu} className="2xl:hidden text-green-900 cursor-pointer">
          <TfiMenuAlt size={30} />
        </div>
      )}

      {isOpen ? (
        
      <div className="bg-green-800 overflow-y-hidden fixed z-10 top-16 left-0 w-[400px] 2xl:hidden lg:w-[500px] opacity-99 rounded-r-3xl h-[calc(100vh-4rem)] flex items-center flex-col gap-10 ease-in duration-700">
        <div className="w-full items-center flex flex-col">
          <h1 className="text-6xl font-serif font-bold mr-6 mt-5 mb-4">Menu</h1>
          <div className="w-full h-0.5 bg-green-100"></div>
        </div>
        <div className="absolute top-12 right-5">
          {isOpen && (
            <div onClick={openMenu} className="2xl:hidden text-green-100 cursor-pointer z-20">
              <IoChevronBackCircle size={30} />
            </div>
          )}
        </div>
        <div className="flex justify-end items-center flex-col mt-10 gap-7 text-green-100">

          <div className="flex flex-col gap-7">
          <div className="max-w-fit">
            <a href="/home" className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center'><span className="mr-2"><FaHome /></span> HOME</a>
          </div>
          <div className="max-w-fit">
            <a className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/yourSchool"><span className="mr-2"><FaSchool /></span>ADMIN PANEL</a>
          </div>
          <div className="max-w-fit">
            <a className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/schoolContribution"><span className="mr-2"><FaFileContract /></span> LEADERBOARD</a>
          </div>
          <div className="max-w-fit">
            <a className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/initiatives"><span className="mr-2"><PiStepsFill /></span> INITIATIVES</a>
          </div>
          <div className="max-w-fit">
          <a className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-700 hover:after:w-full flex items-center' href="/inspiration"><span className="mr-2"><GiInspiration /></span> OUR INSPIRATION</a>
          </div>
          <div className="max-w-fit">
          <a className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/developer"><span className="mr-2"><MdDeveloperMode /></span>DEVELOPERs</a>
          </div>
          <div className="max-w-fit">
          <a className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/contact"><span className="mr-2"><MdContactMail /></span> CONTACT Us</a>
          </div>
          </div>
        </div>

          <div className="w-full items-center h-80 flex flex-col justify-end">
            <div className="bg-green-100 w-full h-0.5 mb-11"></div>
          <div className="max-w-fit rounded-lg text-green-100 animate-bounce cursor-pointer mt-3 mb-0 bg-green-500 py-3 px-7">
          <a className='text-2xl font-serif font-semibold flex items-center' href="/schoolRegister"><span className="mr-1"><MdAdd /></span> REGISTER</a>
          </div>
          </div>
      </div>

      ) : (

      <div className="bg-gray-800 overflow-y-hidden fixed z-10 top-16 left-[-150%] w-screen h-[calc(100vh-4rem)] flex items-center justify-center flex-col gap-10 ease-in duration-700"></div>
    )}


      {isOpen && (
            <div onClick={openMenu} className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] z-5">
            </div>
          )}

          {isOpen && (
            <div onClick={openMenu} className="2xl:hidden text-green-900 cursor-pointer z-20">
              <IoClose size={35} />
            </div>
          )}

      <div className="hidden 2xl:flex gap-8 justify-center items-center h-full text-green-900">
        <a href="/home" className='group relative text-lg font-semibold text-green-800 after:absolute after:content-[""] after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-linear-to-r after:from-emerald-500 after:to-green-600 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100 py-3 px-4 rounded-lg hover:bg-linear-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 flex items-center shadow-sm hover:shadow-md'><span className="mr-2 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300"><FaHome /></span> HOME</a>
       {pathName !== '/' && <a className='group relative text-lg font-semibold text-green-800 after:absolute after:content-[""] after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-linear-to-r after:from-emerald-500 after:to-green-600 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100 py-3 px-4 rounded-lg hover:bg-linear-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 flex items-center shadow-sm hover:shadow-md' href="/yourSchool"><span className="mr-1 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300"><FaSchool /></span>ADMIN PANEL</a> }
        <a className='group relative text-lg font-semibold text-green-800 after:absolute after:content-[""] after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-linear-to-r after:from-emerald-500 after:to-green-600 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100 py-3 px-4 rounded-lg hover:bg-linear-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 flex items-center shadow-sm hover:shadow-md' href="/schoolContribution"><span className="mr-1 text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300"><FaFileContract /></span> LEADERBOARD</a>
        
        <div className="relative group">
          <div onClick={openDropdown} className='group relative text-lg font-semibold text-green-800 after:absolute after:content-[""] after:w-full after:h-1 after:bottom-0 after:left-0 after:bg-linear-to-r after:from-emerald-500 after:to-green-600 after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-300 hover:after:scale-x-100 py-3 px-4 rounded-lg hover:bg-linear-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 flex items-center cursor-pointer shadow-sm hover:shadow-md'>
            <h1 className="group-hover:text-emerald-700 transition-colors duration-300">CONTEXT</h1>
            {openDrop ? <RiArrowDropUpLine size={30} className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" /> : <RiArrowDropDownLine size={30} className="text-emerald-600 group-hover:text-emerald-700 transition-colors duration-300" />}
          </div>
          
          {openDrop && (
            <div className="absolute top-full left-0 mt-2 bg-white/95 backdrop-blur-md border border-emerald-200/50 rounded-2xl shadow-2xl z-20 w-64 overflow-hidden animate-in slide-in-from-top-2 duration-300">
              <div className="text-green-900 overflow-y-hidden rounded-lg h-fit flex flex-col gap-1 p-2 bg-linear-to-b from-white to-emerald-50/30">
                <a className='group/item text-lg font-medium hover:bg-linear-to-r hover:from-emerald-100 hover:to-green-100 rounded-xl px-4 py-3 transition-all duration-300 flex items-center shadow-sm hover:shadow-md transform hover:scale-[1.02]' href="/inspiration"><span className="mr-3 text-yellow-500 group-hover/item:text-yellow-600 transition-colors duration-300"><GiInspiration /></span> <span className="group-hover/item:text-emerald-700 transition-colors duration-300">OUR INSPIRATION</span></a>
                <a className='group/item text-lg font-medium hover:bg-linear-to-r hover:from-emerald-100 hover:to-green-100 rounded-xl px-4 py-3 transition-all duration-300 flex items-center shadow-sm hover:shadow-md transform hover:scale-[1.02]' href="/initiatives"><span className="mr-3 text-blue-500 group-hover/item:text-blue-600 transition-colors duration-300"><PiStepsFill /></span> <span className="group-hover/item:text-emerald-700 transition-colors duration-300">INITIATIVES</span></a>
                <a className='group/item text-lg font-medium hover:bg-linear-to-r hover:from-emerald-100 hover:to-green-100 rounded-xl px-4 py-3 transition-all duration-300 flex items-center shadow-sm hover:shadow-md transform hover:scale-[1.02]' href="/developer"><span className="mr-3 text-gray-500 group-hover/item:text-gray-600 transition-colors duration-300"><MdDeveloperMode /></span> <span className="group-hover/item:text-emerald-700 transition-colors duration-300">DEVELOPERs</span></a>
              </div>
            </div>
          )}
        </div>

     

        {!localStorage.getItem('token') && <div className="flex items-center justify-center pl-6">
          <div className="border-l-2 h-8 border-emerald-300/60"></div>
          <a href="/schoolRegister" className="ml-8 max-w-fit rounded-md text-white cursor-pointer bg-green-700 transition-all duration-300 py-3 px-8 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 border border-emerald-400/30 backdrop-blur-sm font-bold tracking-wide relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <h1 className='text-base font-bold flex items-center tracking-wider relative z-10'><span className="mr-2 text-gray-50"><MdAdd /></span> REGISTER</h1>
          </a>
        </div>}
      </div>

    </nav>
  </header>
  </>
)
};

export default Slidebar;
