import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
import { FaEdit, FaUserPlus } from 'react-icons/fa';

const Cards = (props) => {
    
    const getStatusBadge = (status) => {
        if (status.toLowerCase() === 'available') {
            return (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    {status}
                </span>
            );
        } else {
            return (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {status}
                </span>
            );
        }
    };

    return (
        <div className="group perspective-1000 w-full max-w-sm">
            <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-gray-100 hover:border-emerald-200 backdrop-blur-sm">
                
                
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-emerald-100/30 to-transparent rounded-full transform translate-x-8 -translate-y-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-teal-100/30 to-transparent rounded-full transform -translate-x-6 translate-y-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150"></div>
                
                
                <div className="relative overflow-hidden rounded-t-3xl">
                    <img 
                        src={props.thumbnail} 
                        alt={props.schoolName || props.title} 
                        className="w-full h-64 object-contain bg-linear-to-br from-gray-50 to-emerald-50/30 p-6 group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    
                    <div className="absolute top-4 right-4">
                        {getStatusBadge(props.availability)}
                    </div>
                </div>
                
               
                <div className="p-6 flex flex-col gap-4">
                   
                    <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                        {props.title}
                    </h3>
                    
                    
                    {props.schoolName && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon icon="mdi:school" className="text-emerald-500" />
                            <span className="font-medium">{props.schoolName}</span>
                        </div>
                    )}
                    
                   
                    <div className="flex flex-col gap-3 pt-2">
                        <a 
                            href={"/productEdit/" + props._id} 
                            className="group/btn relative bg-linear-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            <FaEdit className="relative z-10 group-hover/btn:animate-pulse" />
                            <span className="relative z-10 font-bold">Edit Product</span>
                        </a>
                        
                        <a 
                            href={"/product/" + props._id + "/helpedStudent"} 
                            className="group/btn relative bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 transform -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                            <FaUserPlus className="relative z-10 group-hover/btn:animate-pulse" />
                            <span className="relative z-10 font-bold">Add Helped Student</span>
                        </a>
                    </div>
                </div>
                
                
                <div className="h-1 bg-linear-to-r from-emerald-400 via-green-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
        </div>
    );
};

export default Cards;
