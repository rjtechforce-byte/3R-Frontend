import React from 'react'
import DeveloperCard from '../components/DeveloperCard';
import Slidebar from "../components/Slidebar";
const photo1 = '/images/pic1.jpg';
const photo2 = '/images/pic2.jpg';
const photo3 = '/images/pic3.jpg';
const photo4 = '/images/pic4.jpg';
const photo5 = '/images/pic5.jpg';
const photo6 = "/images/pic6.jpg";

const Developer = () => {
  return (
  <>
      <Slidebar />
      
      
      <div className='min-h-screen bg-gray-100 pt-10'>
        
        
        <div className='flex flex-col items-center justify-center mb-20 px-4 relative'>
          <h1 className='font-black text-black text-5xl mt-18 font-serif'>Mentor</h1>
          
        </div>
        
        
        <div className='flex justify-center mb-32 px-4'>
          <DeveloperCard name='Gaurav Sharma' post='Computer Instructor' image={photo1} github="/" linkedin="/"/>
        </div>
        
        
        <div className='flex flex-col lg:flex-row items-center justify-center mb-20 px-4 relative'>
          <h1 className='text-black font-black text-5xl mt-18 font-serif'>Our Team</h1>
        
        </div>
        
        
        <div className='flex flex-col xl:flex-row flex-wrap justify-center items-center gap-8 lg:gap-12 p-6 lg:p-10 mb-16 px-4'>
          <DeveloperCard name='Neha Goyal' post='Web Developer' image={photo5} github="/" linkedin="/"/>
          <DeveloperCard name='Mayank Sharma'  post='Web Developer' image={photo2} github="/" linkedin="/"/>
          <DeveloperCard name='Aashish Pareek'   post='Web Developer' image={photo3} github="/" linkedin="/"/>
        </div>
        
        
        <div className='flex flex-col xl:flex-row justify-center items-center gap-8 lg:gap-12 pb-20 p-6 lg:p-10 px-4'>
          <DeveloperCard className="w-150 h-140 max-w-sm sm:w-[460px] md:w-[550px] lg:w-[600px]" name='Mohit Darji' post='Web Developer' image={photo4} github="/" linkedin="/"/>
          <DeveloperCard className="w-150 h-140 max-w-sm sm:w-[460px] md:w-[550px] lg:w-[600px]" name='Tansukh'  post='Web Developer'  image={photo6} github="/" linkedin="/"/>
        </div>
        
      </div>
    </>
  )
}

export default Developer
