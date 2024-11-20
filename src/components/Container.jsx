import React from 'react';
import bgPic from "../assets/download.webp";
import Sanitary from "../assets/sanitary.jpg";
import Electrics from "../assets/electrics.jpg";
import Paints from "../assets/paints.jpg";


function Container() {
  return (
    <>
      <div className="relative mt-16 h-screen w-full">
        <img
          src={bgPic}
          alt="Background"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      
        <div className="absolute p-6 top-24 right-32 flex flex-col max-w-sm" style={{ backgroundColor: 'rgba(248, 241, 232, 0.75)' }}>
          <span className="text-[16px]">New Arrival</span>
          <span className="text-[36px] font-bold text-[#c28c2b]">Discover Our</span>
          <span className="text-[36px] font-bold text-[#c28c2b]">New Collection</span>
          <span className="text-[16px]">
            Transform your home with our new furniture collection, filled with vibrant designs.
          </span>
          <span className="text-[16px] mb-3">
            Each piece is crafted to enhance your style and comfort.
          </span>
         <button className="bg-[#c28c2b] text-white py-2 px-4 mt-4">Buy Now</button>
        </div>
      </div>

      <div className='flex flex-col items-center text-center mt-16'>
        <h1 className='text-3xl font-bold mb-4 text-blue-800'>Browse The Range</h1>
        <span className='text-lg mb-8 text-gray-500'>
        Quality Tools & Materials for Every Project - Build with Confidence.
        </span>

        <div className='flex flex-col md:flex-row gap-6 md:gap-10'>
         
          <div className='flex flex-col items-center'>
            <div className='rounded-lg overflow-hidden shadow-md w-64 h-96 md:w-72 md:h-96'>
              <img src={Sanitary} alt="Sanitary" className='w-full h-full object-cover' />
            </div>
            <span className='mt-2 text-gray-500'>Plumbing & Sanitary</span>
          </div>

          
          <div className='flex flex-col items-center'>
            <div className='rounded-lg overflow-hidden shadow-md w-64 h-96 md:w-72 md:h-96'>
              <img src={Electrics} alt="Electrics" className='w-full h-full object-cover' />
            </div>
            <span className='mt-2 text-gray-500'>Electrical Supplies</span>
          </div>

     
          <div className='flex flex-col items-center'>
            <div className='rounded-lg overflow-hidden shadow-md w-64 h-96 md:w-72 md:h-96'>
              <img src={Paints} alt="Paints" className='w-full h-full object-cover' />
            </div>
            <span className='mt-2 text-gray-500'>Paints & Finishing</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Container;
