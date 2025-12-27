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

const Logo = "/images/Logo.png"

function NavbarWel () {
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
            <a href="/" className='relative text-2xl md:text-4xl font-serif font-semibold text-green-100 no-underline after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-green-100 after:transition-all after:duration-500 hover:after:w-full flex items-center'><span className="mr-2"><FaHome /></span> HOME</a>
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

      <div className="hidden 2xl:flex gap-10 justify-center items-center h-full text-green-900">
              <a href="/" className='md:text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center'><span className="mr-2"><FaHome /></span> HOME</a>
            <a className='text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center' href="/schoolContribution"><span className="mr-1"><FaFileContract /></span> LEADERBOARD</a>
          
          {!openDrop && (
            <div onClick={openDropdown} className="text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center cursor-pointer">
              <h1>CONTEXT</h1>
              <RiArrowDropDownLine size={40} />
            </div>
          )}
            {openDrop ? (
            <div className="bg-green-500">
              <div className="bg-green-800 text-green-100 overflow-y-hidden fixed z-0 top-16 w-fit lg:w-fit right-auto opacity-99 rounded-xl h-fit flex items-center flex-col gap-7 px-8 tracking-tighter py-5 ease-in duration-1000">
              
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
            </div>
          ) : (
            <div className="bg-green-800 overflow-y-hidden fixed z-10 top-[-1500%] w-fit flex items-center justify-center flex-col gap-10 ease-in duration-1000"></div>
          )}

          {openDrop && (
            <div onClick={openDropdown} className="text-2xl font-serif font-semibold pb-4 h-full hover:duration-700 flex items-center cursor-pointer">
              <h1>CONTEXT</h1>
              <RiArrowDropUpLine size={40} />
            </div>
          )}

          <div className="max-w-fit">
          <a className='text-2xl font-serif font-semibold hover:pb-4 h-full hover:duration-700 flex items-center cursor-pointer' href="/contact"><span className="mr-1"><MdContactMail /></span> CONTACT Us</a>
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

export default NavbarWel;
