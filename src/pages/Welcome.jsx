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
      console.log(data);
    });
  }, []);

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

        <div className="schoolselecter origin-bottom hidden rotate-z-90 top-0 z-999 min-h-screen w-screen overflow-hidden items-center justify-around flex-col p-24 bg-[#D9E4DD]">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center flex-col m-2 xl:m-15">
              <h3 className="text-green-900 text-xl xl:text-4xl font-serif font-semibold">
                Want to see your school's items!
              </h3>
              <h1 className="text-green-900 text-xl xl:text-6xl font-serif font-bold">
                Please select your school
              </h1>
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
              className="mt- p-4 text-green-900 max-w-full rounded-lg bg-white text-2xl xl:text-3xl font-serif hover:bg-green-400 font-bold outline-none"
            >
              <option value="default">Select Your School</option>
              {schoolData && schoolData.length > 0 && schoolData.map((school, index) => (
                <option key={school._id || index} value={school.schoolName}>
                  {String(school.schoolName)}
                </option>
              ))}
            </select>
          </div>

          <div className="border-4 border-green-900 w-full"></div>

          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center flex-col m-2 xl:m-15">
              <h3 className="text-green-900 text-xl xl:text-4xl font-serif font-semibold">
                Not registered your school yet!
              </h3>
              <h1 className="text-green-900 text-2xl xl:text-6xl font-serif font-bold">
                Please register your school first
              </h1>
            </div>
            <a
              href="/schoolRegister"
              className="max-w-fit rounded-lg transition-all duration-1000 hover:text-green-900 hover:bg-white text-white cursor-pointer mt-4 mb-1 bg-green-800 py-5 px-27"
            >
              <h1 className="text-2xl xl:text-3xl font-serif font-semibold flex items-center">
                <span className="mr-1">
                  <MdAdd />
                </span>{" "}
                REGISTER
              </h1>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
