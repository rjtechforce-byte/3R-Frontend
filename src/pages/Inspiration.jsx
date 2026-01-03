import React from 'react';
import InspirationCard from '../components/InspirationCard';
import Slidebar from "../components/Slidebar";
import Text from '../components/Text';
const photo1 = "/images/photo1.png"
const photo2 = "/images/pictac2.jpg"
const photo3 = "/images/pictac3.jpg"
const photo4 = "/images/pictac4.png"

const Inspiration = () => {
  return (
    <>
        <Slidebar />
        <div className='bg-green-100'>
<div className='flex  justify-center'>
       <h1 className='font-bold text-red-800 text-5xl  mt-18 font-serif'>- - Our Inspiration - -</h1>
     </div>
    <div className='flex flex-col justify-around'>
    <InspirationCard  name='ABHISHEK SURANA ( I.A.S. )' image={photo1} post='District Collector and District Magistrate (DM),Churu'/>
    <InspirationCard  name='Dr.Santosh Kumar Maharshi' image={photo3} post='Chief District Education Officer(CDEO),Churu'/>
    
    </div>
    <div className='flex  justify-center mt-30 mb-10'>
    <h1 className='text-red-800 font-bold text-5xl font-serif'>
    - - The Man Who Inspired Us  - -
    </h1>
    </div>
    <div>
      <Text image={photo4} >

      </Text>
    </div>
    </div>
     
    </>
  )
}

export default Inspiration;
