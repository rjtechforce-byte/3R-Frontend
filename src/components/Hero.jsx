import React, { useContext, useRef, useState } from "react";
import { AllProductsData } from "../context/AllProducts";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"; 

const Video = "/images/new.webm"

const Hero = () => {
  const { contextSafe } = useGSAP();
  const handleClick = contextSafe(() => {
    console.log("Button Clicked");
    const tl = gsap.timeline();
    tl.to(".welcomePage", {
      duration: 1,
      ease: "power2.inOut",
      y: "full",
      display: "none",
      rotateX: 90,
      pointerEvents: "none",
    });
    tl.to(".schoolselecter", {
      duration: 1,
      rotateZ: 0,
      ease: "power2.inOut",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
    });
  });

  return (
    <><div className='flex justify-around h-screen flex-col md:flex-row items-center'>
      <div className='w-sm  md:w-xl h-full flex items-center justify-center xl:w-3xl pb-5 md:p-7'>
    <video className='shadow-xl shadow-green-800 rounded-2xl w-full transition-transform duration-500 hover:scale-105' src={Video} loop muted autoplay="autoplay"></video>
    </div>
      <div className='w-[400px] md:w-2xl h-full xl:w-5xl flex gap-10 flex-col items-center justify-center md:p-5'>
    <h1 className='  text-white xl:text-7xl md:text-5xl text-[33px] font-serif font-bold transition-transform duration-500 hover:scale-105'>
      Welcome To RRR Portal 💐
    </h1>
    <p className='text-white xl:text-4xl text-center md:text-left'>
      This is our RRR (Reduce, Recycle, Reuse) website, where everyone helps each other. Students in each school can submit useful items for other students to take and use.
    </p>
    <button onClick={handleClick} className='animate-bounce hover:animate-in hover:bg-linear-to-r outline-none hover:from-green-800 hover:to-green-400 shadow-xl shadow-green-800 cursor-pointer bg-linear-to-r from-green-400 to-green-800 text-white p-3 w-sm rounded-full text-xl transition duration-500 ease-in-out hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-md xl:text-4xl font-serif active:shadow-black hover:scale-105 '>
      Get Started
    </button>
    </div>

    </div>
    
    </>
  )
}

export default Hero
