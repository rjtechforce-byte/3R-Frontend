import React from "react";
import { ImCross } from "react-icons/im";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DetailCard = ({ detailCard }) => {
  gsap.registerPlugin(useGSAP);
  const { contextSafe } = useGSAP();

  

  const fun = contextSafe(() => {
    
     document.body.classList.remove("no-scroll");

    gsap.to(".cardOfDetailProduct", {
      display: "none",
      opacity: 0,
    });
  });
  return (
    <div className={`hidden fixed top-0 bottom-0 right-0 left-0 lg:top-[5vh] lg:left-[5vw] lg:bottom-[5vh] lg:right-0 xl:left-[14vh] 2xl:left-[25vh] min-h-3/4 opacity-0 max-w-6xl cardOfDetailProduct lg:w-[80vw] lg:min-w-96 border-0 rounded-3xl bg-white shadow-2xl flex-col lg:flex-row overflow-hidden z-50`}>
      
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50/30 via-green-50/10 to-teal-50/30 backdrop-blur-sm"></div>
      
      
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={fun}
          className="group p-2.5 bg-white/95 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm"
        >
          <ImCross className="text-gray-500 group-hover:text-red-600 transition-colors duration-300" size={18} />
        </button>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row h-full">
       
        <div className="lg:w-3/5 bg-linear-to-br from-gray-50 to-emerald-50/10 p-8 flex flex-col justify-start items-center gap-6 overflow-y-auto">
         
          <div className="relative group bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-md">
            <img 
              src={`${detailCard.imgUrl}`} 
              className="w-full h-80 object-contain rounded-lg" 
              alt="Product thumbnail" 
            />
            <div className="absolute inset-0 bg-linear-to-t from-emerald-100/20 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          
          {detailCard.imgUrl2 && (
            <div className="relative group bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-sm">
              <img 
                src={`${detailCard.imgUrl2}`} 
                className="w-full h-48 object-contain rounded-md" 
                alt="Product image" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-emerald-100/20 via-transparent to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}
        </div>

        
        <div className="lg:w-2/5 p-8 overflow-y-auto bg-white">
          <div className="space-y-6">
            
            <div className="sticky top-0 bg-white pb-4 border-b border-gray-100">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                Product Details
              </h1>
              <div className="w-24 h-1 bg-linear-to-r from-emerald-500 to-green-500 rounded-full"></div>
            </div>

            
            <div className="space-y-4">
             
              <div className="bg-white border-2 border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Product Name</div>
                <div className="text-xl font-bold text-gray-900">{detailCard.name}</div>
              </div>

             
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl hover:bg-emerald-100 transition-colors duration-200">
                <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-1">Category</div>
                <div className="text-lg font-bold text-emerald-800">{detailCard.category}</div>
              </div>

              
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">Donor</div>
                  <div className="text-base font-bold text-blue-800">{detailCard.donor}</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg hover:bg-purple-100 transition-colors duration-200">
                  <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">Donor's Class</div>
                  <div className="text-base font-bold text-purple-800">{detailCard.donorClass}</div>
                </div>
              </div>

             
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-lg border transition-colors duration-200 ${
                  detailCard.availability 
                    ? 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100' 
                    : 'bg-red-50 border-red-200 hover:bg-red-100'
                }`}>
                  <div className={`text-xs font-semibold uppercase tracking-wide mb-1 ${
                    detailCard.availability ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    Status
                  </div>
                  <div className={`text-sm font-bold ${
                    detailCard.availability ? 'text-emerald-800' : 'text-red-800'
                  }`}>
                    {detailCard.availability ? "Available" : "Unavailable"}
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg hover:bg-amber-100 transition-colors duration-200">
                  <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mb-1">Condition</div>
                  <div className="text-sm font-bold text-amber-800">{detailCard.condition}</div>
                </div>
              </div>

             
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">About Product</div>
                <p className="text-gray-700 leading-relaxed text-sm">{detailCard.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
