import React from "react";
const Image1 = "/images/InspiringCeter.png"

export default function RRRCenter () {
    return (
        <>
        <div className="max-w-5xl mx-auto transform transition-all duration-500  bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:scale-103 hover:shadow-2xl" >
      
      <div className="md:w-1/2">
        <img src={Image1} alt="3-R Center" className="w-full h-full object-cover" />
      </div>
      
        <div className="md:w-1/2 p-8 flex flex-col justify-center bg-green-50 border border-green-200 hover:shadow-2xl transition-all duration-300">
    
    <h1 className="text-3xl font-extrabold mb-3 text-green-800 text-center">
      “आदर्श 3-R Center”
    </h1>

    <h2 className="text-green-700 font-semibold mb-6 text-center text-lg">
      संसाधनों के विवेकपूर्ण उपयोग दर्शाता है।  
      <span className="block mt-1 text-green-600 font-medium">RRR Center, रा.उ.मा.वि.पूलासर, चूरू</span>
    </h2>

    <p className="text-green-900 mb-4 text-base">
      मुख्य जिला शिक्षा अधिकारी डॉ. गोविन्द सिंह राठौड़ के निर्देशानुसार विद्यालय के प्रधानाचार्य श्री मुकुल भाटी द्वारा <span className="font-medium">RRR सेंटर</span> की स्थापना की गयी।
    </p>
    
    <p className="text-green-900 mb-4 text-base">
      RRR सेंटर हेतु प्रभारी नियुक्त किया गया। विद्यार्थियों को <span className="font-medium">RRR CENTER</span> में संसाधनों के संयमित उपयोग, पुनः उपयोग एवं पुनः चक्रण की जानकारी प्रदान की गयी एवं संसाधन संरक्षण, संसाधनों के विवेकपूर्ण उपयोग एवं पुनः उपयोग हेतु प्रोत्साहित किया गया। 
    </p>
    
    <p className="text-green-900 text-base">
      विद्यार्थियों ने इस पहल में उत्साह का परिचय दिया। 3-R सेंटर में छात्रों ने घर से अनुपयोगी सामग्री लाकर सेंटर में जमा करायी ताकि अन्य साथी इसका उपयोग कर सकें।
    </p>
  </div>
    </div>
        </>
    )
}

