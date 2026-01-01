import React from 'react'

const InspirationCard = (props) => {
  return (
    <div className='flex justify-center '>
    <div className='flex flex-col items-center mt-7 p-4 bg-green-400 mb-6 w-200 border-2 border-black shadow-lg shadow-black rounded-2xl transition-transform duration-500 hover:scale-105'>
      <h1 className='font-bold text-red-800 text-5xl mb-10 mt-8 font-serif'>{props.value}</h1>
      <img className='w-50 rounded-full mb-5' src={props.image} alt="" />
      <h1 className='font-bold text-blue-900 text-4xl mb-3'>{props.name}</h1>
      <h2 className='font-bold text-green-800 text-2xl mb-1'>{props.post}</h2>
     
    </div>
    </div>
  )
}

export default InspirationCard;
