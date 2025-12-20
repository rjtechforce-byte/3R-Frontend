import React from 'react';
import { Link } from 'react-router-dom';


const Cards = (props) => {

    return (
        <>
        <div className="gap-5 sm:m-5 border border-gray-100 w-[350px] bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-110 m-5 transform  hover:-translate-y-0.5 font-serif transition-all duration-700 h-fit flex justify-center flex-col items-center">
          
            <img 
              src={props.thumbnail} 
              alt={props.schoolName} 
              className="sm:p-5 w-full min-h-64 max-h-64 object-contain bg-gray-50 rounded-xl"
            />
            <p className="text-3xl font-serif text-center font-bold text-green-800">{props.title}</p> 
            <h3 className="text-3xl font-serif text-center font-bold text-green-800">{props.availability}</h3>
            <a href={"/productEdit/" + props._id} className='bg-green-800 justify-center cursor-pointer text-white px-8 py-2 m-2 shadow-xl inline-flex gap-2 font-semibold hover:border hover:border-green-900 text-center min-w-2xs text-2xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-green-800 hover:bg-white'>Edit Product</a>
            <a href={"/product/" + props._id + "/helpedStudent"} className='bg-green-800 text-center min-w-2xs cursor-pointer text-white px-8 py-2 m-2 mb-5 shadow-xl inline-flex hover:border hover:border-green-900 gap-2 font-semibold text-2xl font-serif items-center transition-all duration-700 rounded-[9px] group hover:text-green-800 hover:bg-white'>Add Helped Student</a>
        </div>
        </>
    );
};

export default Cards;
