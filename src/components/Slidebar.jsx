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
      <nav className="bg-white flex justify-between items-center text-white h-16 px-4 backdrop-blur-md">
      <div className="max-w-[60px]">
        <a href="https://education.rajasthan.gov.in" className='z-20' target="_blank"><img className="max-w-full max-h-full" src={Logo} alt="" /></a>
      </div>
      <div className="flex justify-between hover:scale-105 transition-all duration-700 backdrop-blur-md ease-in-out px-2 py-2 shrink-0">
        <a href="/" className='font-extrabold hover:bg-green-100 rounded-lg py-2 px-6 text-2xl text-green-900 z-20'>CODE <span className='text-yellow-600 font-extrabold'>चूरू</span></a>
      </div>
      {!isOpen && (
        <div onClick={openMenu} className="xl:hidden text-green-900 cursor-pointer">
          <TfiMenuAlt size={30} />
        </div>
      )}

      {isOpen ? (
        
      <div className="bg-green-800 fixed z-10 top-16 left-0 w-[400px] xl:hidden lg:w-[500px] opacity-99 rounded-r-3xl h-[calc(100vh-4rem)] flex items-center flex-col gap-10 overflow-y-scroll ease-in duration-700 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none] justify-between">
        <div className="w-full items-center flex flex-col">
          <h1 className="text-6xl font-serif font-bold mr-6 mt-5 mb-4">Menu</h1>
          <div className="w-full h-0.5 bg-green-100"></div>
        <div className="absolute top-12 right-5">
          {isOpen && (
            <div onClick={openMenu} className="xl:hidden text-green-100 cursor-pointer z-20">
              <IoChevronBackCircle size={30} />
            </div>
          )}
        </div>
        </div>
        <div className="flex justify-end items-center flex-col gap-7 text-green-100">

          <div className="flex flex-col gap-7">
          <div className="max-w-fit">
            <a href="/home" className='relative text-2xl md:text-3xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center'><span className="mr-2"><FaHome /></span> HOME</a>
          </div>
          <div className="max-w-fit">
            <a className='relative text-2xl md:text-3xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/yourSchool"><span className="mr-2"><FaSchool /></span>ADMIN PANEL</a>
          </div>
          <div className="max-w-fit">
            <a className='relative text-2xl md:text-3xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/schoolContribution"><span className="mr-2"><FaFileContract /></span> LEADERBOARD</a>
          </div>
          <div className="max-w-fit">
            <a className='relative text-2xl md:text-3xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/initiatives"><span className="mr-2"><PiStepsFill /></span> INITIATIVES</a>
          </div>
          <div className="max-w-fit">
          <a className='relative text-2xl md:text-3xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-700 hover:after:w-full flex items-center' href="/inspiration"><span className="mr-2"><GiInspiration /></span> OUR INSPIRATION</a>
          </div>
          <div className="max-w-fit">
          <a className='relative text-2xl md:text-3xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/developer"><span className="mr-2"><MdDeveloperMode /></span>DEVELOPERs</a>
          </div>
          </div>
        </div>

          <div className="w-full items-center h-80 flex flex-col justify-end">
            <div className="bg-green-100 w-full h-0.5 mb-11"></div>
          <div className="max-w-fit rounded-lg text-green-100 animate-bounce cursor-poin]ter mt-3 mb-0 bg-green-500 py-3 px-7">
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
            <div onClick={openMenu} className="xl:hidden text-green-900 cursor-pointer z-20">
              <IoClose size={35} />
            </div>
          )}

      <div className="hidden xl:flex gap-10 justify-center items-center h-full text-green-900">
              <a href="/home" className='md:text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center'><span className="mr-2"><FaHome /></span> HOME</a>
            <a className='text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center' href="/yourSchool"><span className="mr-1"><FaSchool /></span>ADMIN PANEL</a>
            <a className='text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center' href="/schoolContribution"><span className="mr-1"><FaFileContract /></span> LEADERBOARD</a>
          
          <div className="relative h-full flex items-center justify-center">
            <div onClick={openDropdown} className={`text-2xl font-serif font-semibold h-full flex items-center cursor-pointer ${openDrop ? 'pb-4' : 'hover:pb-4 hover:duration-700'}`}>
              <h1>CONTEXT</h1>
              {openDrop ? <RiArrowDropUpLine size={40} /> : <RiArrowDropDownLine size={40} />}
            </div>
            {openDrop && (
              <div className="bg-green-800 text-green-100 absolute top-16 left-1/2 -translate-x-1/2 w-max rounded-xl flex flex-col gap-7 px-8 py-5 shadow-xl z-50">
              
                <div className="max-w-fit">
                <a className='relative  text-2xl font-serif font-semibold no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-700 hover:after:w-full flex items-center' href="/inspiration"><span className="mr-1"><GiInspiration /></span> OUR INSPIRATION</a>
                </div>
              <div className="max-w-fit">
                <a className='relative  text-2xl font-serif font-semibold no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-700 hover:after:w-full flex items-center' href="/initiatives"><span className="mr-1"><PiStepsFill /></span> INITIATIVES</a>
                </div>
                <div className="max-w-fit">
                <a className='relative  text-2xl font-serif font-semibold no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center' href="/developer"><span className="mr-1"><MdDeveloperMode /></span>DEVELOPERs</a>
              </div>
            </div>
          )}
          </div>
          <div className="flex items-center justify-center">
            <div className="border-3 h-14 max-w-0.5 mr-5 border-green-900"></div>
          <a href="/schoolRegister" className="max-w-fit rounded-lg text-white animate-bounce cursor-pointer mt-4 mb-1 bg-green-800 py-2.5 px-7">
          <h1 className='text-xl font-serif font-semibold flex items-center bg-green-800'><span className="mr-1"><MdAdd /></span> REGISTER</h1>
          </a>
          </div>
        </div>

      </nav>
      <div className="bg-green-900 w-full h-1"></div>
    </header>
    </>
  )
};

export default Slidebar;
