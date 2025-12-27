import React, { useContext, useRef, useState, useEffect } from "react";
import { AllProductsData } from "../context/AllProducts";
import { useGSAP } from "@gsap/react";
import { getAllSchool } from "../components/form/api";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import Hero from "../components/Hero";
import WelcomeCard from "../components/WelcomeCard";
import Slides from "../components/Slides";
import { MdAdd } from "react-icons/md";

const Recycle = "/images/recycle.png";
const WelcomeBg = "/images/bg.jpg";
const Reduse = "/images/reduce2.png";
const Reuse = "/images/reuse.png";
const TechBg = "/images/techbg.jpg";

const cardData = [
  {
    id: 1,
    image: Recycle,
    name: "Reduce",
    post: "Minimize your consumption at the source; the best waste is the one never created.",
  },
  {
    id: 2,
    image: Recycle,
    name: "Recycle",
    post: "Give every item a second, third, and fourth life to extend its utility.",
  },
  {
    id: 3,
    image: Reuse,
    name: "Reuse",
    post: "Close the loop by processing materials into new products to save energy and resources.",
  },
  {
    id: 4,
    image: Reuse,
    name: "Reuse",
    post: "Close the loop by processing materials into new products to save energy and resources.",
  },
  {
    id: 5,
    image: Reduse,
    name: "Reuse",
    post: "Close the loop by processing materials into new products to save energy and resources.",
  },
  {
    id: 6,
    image: Reduse,
    name: "Reuse",
    post: "Close the loop by processing materials into new products to save energy and resources.",
  },
];

export default function Welcome() {
  const products = useContext(AllProductsData);
  const [selectedSchool, setselectedSchool] = useState("default");
  const val = useRef(true);
  const schoolName = useRef([]);
  console.log(products);
  gsap.registerPlugin(useGSAP);

  products.forEach((item) => {
    if (!schoolName.current.includes(item.schoolName)) {
      schoolName.current.push(item.schoolName);
    }
  });
  console.log(schoolName);
  val.current = false;

  const [schoolData, setSchoolData] = useState([]);
  useEffect(() => {
    getAllSchool().then((data) => {
      setSchoolData(data);
      console.log('data',data);
    }).catch((error) => {
      console.error('Error fetching school data:', error);
    });
  }, []);
console.log('school data',schoolData);
  return (
    <>
      <div className="relative">
        <div className="flex w-full items-center justify-center h-3vh bg-[#f0f8ef]">
          <div
            className="w-full bg-no-repeat bg-cover bg-center shadow-md shadow-green-800"
            style={{ backgroundImage: `url(${WelcomeBg})` }}
          >
            <Hero></Hero>

<div className='flex justify-around p-20 flex-col min-h-screen items-center gap-8 lg:flex-row bg-linear-to-b from-green-400 to-green-700'>
     <WelcomeCard image={Reduse}
                 name='Reduce'
                  post='Minimize your consumption at the source; the best waste is the one never created.'
                 />
                 <WelcomeCard image={Recycle}
                 name='Recycle'
                  post='Give every item a second, third, and fourth life to extend its utility.'
                 />
                 <WelcomeCard image={Reuse}
                 name='Reuse'
                  post='Close the loop by processing materials into new products to save energy and resources.'
                 />
                 
</div>
            <div className='flex justify-around items-center min-h-screen p-20 flex-col lg:flex-row bg-no-repeat w-full bg-cover' style={{ backgroundImage: `url(${TechBg})` }}>
               
            
                
                <div className="w-full max-w-5xl h-[500px] mx-auto">
                    <Swiper
                       
                        modules={[EffectCoverflow, Autoplay, Navigation]} 
                        
                        slidesPerView={3}         
                        effect={'coverflow'}      
                        centeredSlides={true}     
                        loop={true}                              
                        autoplay={{ delay: 2000, disableOnInteraction: false }} 
                        
                        
                        navigation={true} 
                        
                      
                        coverflowEffect={{
                            rotate: 0, 
                            depth: 100, 
                            modifier: 2.5,
                            slideShadows: true,
                        }}
                        
                       
                        className="py-12" 
                    >
                        {cardData.map((card) => (
                            <SwiperSlide key={card.id}>
                                
                                <div className="w-full h-full flex justify-center items-center"> 
                                    <Slides
                                        image={card.image}
                                        name={card.name}
                                        post={card.post}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
          </div>
        </div>

        <div className="schoolselecter origin-bottom hidden top-0 z-999 min-h-screen w-screen overflow-y-auto items-center justify-center flex-col lg:flex-col p-6 bg-[#eef5f1] gap-10">
          
          
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 w-full max-w-xl text-center flex flex-col justify-center transform transition-transform duration-500 hover:scale-105">
            <div className="mb-6">
              <h3 className="text-gray-900 text-3xl md:text-4xl font-bold font-sans">
                Find Your School
              </h3>
              <p className="text-gray-600 text-lg font-sans mt-3">
                Select your school to see its contributions.
              </p>
            </div>

            <select
              ref={val}
              value={selectedSchool}
              onChange={(e) => {
                setselectedSchool(e.target.value);
                localStorage.removeItem("schoolName");
                localStorage.setItem("schoolName", JSON.stringify(e.target.value));
                window.location.href = "/home";
              }}
              className="mt-4 p-4 text-gray-700 max-w-md w-full rounded-lg bg-gray-100 border-2 border-gray-200 text-xl font-sans font-semibold outline-none focus:ring-4 focus:ring-green-300 focus:border-green-400 transition-all duration-300 appearance-none"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fill-rule="evenodd"></path></svg>')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="default">Select Your School</option>
              {schoolData && schoolData.length > 0 && schoolData.map((school, index) => (
                <option key={school._id || index} value={school.schoolName}>
                  {String(school.schoolName)}
                </option>
              ))}
            </select>
          </div>

          
          <div className="lg:hidden border-t-2 border-green-300 w-full max-w-md"></div>

         
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 w-full max-w-xl text-center flex flex-col justify-center transform transition-transform duration-500 hover:scale-105">
            <div className="mb-6">
              <h3 className="text-gray-900 text-3xl md:text-4xl font-bold font-sans">
                Join Our Network
              </h3>
              <p className="text-gray-600 text-lg font-sans mt-3">
                Is your school not listed? Register now!
              </p>
            </div>
            <a
              href="/schoolRegister"
              className="inline-block rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl text-white cursor-pointer bg-linear-to-r from-green-500 to-green-700 shadow-lg py-4 px-10"
            >
              <div className="text-2xl font-sans font-bold flex items-center justify-center">
                <span className="mr-3">
                  <MdAdd size="1.3em" />
                </span>
                REGISTER SCHOOL
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
