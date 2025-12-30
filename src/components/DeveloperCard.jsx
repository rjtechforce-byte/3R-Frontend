import React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const DeveloperCard = (props) => {
  return (
    <div className={`relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-shadow duration-300 ${props.className || 'w-150 max-w-sm sm:w-[420px] md:w-[500px] lg:w-[550px]'}`}>
    
      
      
      {props.value && (
       <h1 className='font-bold text-red-800 text-5xl mb-10 mt-8 font-serif'>{props.value}</h1>
      )}
      
      
      <div className='flex justify-center'>
         <img 
            src={props.image} 
            alt={props.name}
            className='w-50 rounded-full mb-5'
          />
        </div>
      
      
      <div className='text-center space-y-4'>
       
        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 leading-tight'>
          {props.name}
        </h1>
        
        
        <h2 className='text-base sm:text-lg md:text-xl font-semibold text-emerald-600 tracking-wide'>
          {props.post}
        </h2>
        
        
        <div className='w-20 h-1 bg-linear-to-r from-emerald-400 to-teal-400 mx-auto rounded-full'></div>
      </div>
      
      
      <div className='flex items-center justify-center space-x-4 mt-8 mb-8'>
        {props.github && (
          <a 
            href={props.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className='flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-700 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:border-gray-300'
          >
            <FaGithub className="w-6 h-6 text-gray-700 hover:text-white transition-colors duration-300" />
          </a>
        )}
        {props.linkedin && (
          <a 
            href={props.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className='flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-blue-600 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:border-blue-300'
          >
            <FaLinkedin className="w-6 h-6 text-gray-700 hover:text-white transition-colors duration-300" />
          </a>
        )}
      </div>
      
      
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500'></div>
    </div>
  )
}

export default DeveloperCard;
