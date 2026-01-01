import React from 'react';

const WelcomeCard = (props) => {

    return (
        <div 
          
          className='flex transition-transform duration-500 hover:scale-105 flex-col shrink-0 w-[300px] h-[400px] p-6 bg-green-700 rounded-xl shadow-2xl items-center justify-center text-white gap-5'
        >
          
            <img 
              src={props.image} 
              alt={props.name} 
              className="w-full h-full object-contain mb-4" 
            />
            <p className="text-3xl font-serif text-center font-bold">{props.name}</p> 
        
            <h3 className="text-lg font-bold mb-4">{props.post}</h3>
            
        
            
        </div>
    );
};

export default WelcomeCard;
