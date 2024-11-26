import React from "react";
import trophy from "../assets/trophy.webp";
import warranty from "../assets/warranty.webp";
import support from "../assets/support.webp";
import Package from "../assets/package.webp";
function Footer() {
  return (<>
   <div className="bg-blue-300 p-8 md:p-16 pb-12 mb-8 mt-8">
        <div className="flex flex-wrap justify-center md:justify-between gap-6">
          {/* High Quality */}
          <div className="flex items-center w-full sm:w-auto md:flex-1">
            <img src={trophy} alt="" className="w-12 h-12" />
            <div className="flex flex-col ml-4">
              <span className="text-[16px] text-black font-extrabold">
                High Quality
              </span>
              <span className="text-[16px] text-[#5e7da3]">
                Crafted from top materials
              </span>
            </div>
          </div>

          {/* Warranty Protection */}
          <div className="flex items-center w-full sm:w-auto md:flex-1">
            <img src={warranty} alt="" className="w-12 h-12" />
            <div className="flex flex-col ml-4">
              <span className="text-[16px] text-black font-extrabold">
                Warranty Protection
              </span>
              <span className="text-[16px] text-[#5e7da3]">Over 1-2 years</span>
            </div>
          </div>

          {/* Free Shipping */}
          <div className="flex items-center w-full sm:w-auto md:flex-1">
            <img src={Package} alt="" className="w-12 h-12" />
            <div className="flex flex-col ml-4">
              <span className="text-[16px] font-extrabold text-black">
                Free Shipping
              </span>
              <span className="text-[16px] text-[#5e7da3]">
                Order over 150 $
              </span>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center w-full sm:w-auto md:flex-1">
            <img src={support} alt="" className="w-12 h-12" />
            <div className="flex flex-col ml-4">
              <span className="text-[16px] font-extrabold text-black">
                24/7 Support
              </span>
              <span className="text-[16px] text-[#5e7da3]">
                Dedicated support
              </span>
            </div>
          </div>
        </div>
      </div>
    <footer className="bg-white text-gray-900 p-8 mt-16">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4 mb-4 space-x-2">
        <span className="text-blue-800 font-extrabold text-lg md:text-2xl">
            Kashif
          </span>
          <span className="text-gray-500 font-extrabold text-lg md:text-2xl">
            Hardware
          </span>
          <p>400 University Drive Suite 200</p>
          <p>Coral Gables, FL 33134 USA</p>
        </div>

        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Links</h3>
          <ul className="space-y-6">
            <li>
              <a href="#" className="hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Home</h3>
          <ul className="space-y-6">
            <li>
              <a href="#" className="hover:text-gray-600">
                Payment Options
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-600">
                Privacy Policies
              </a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/4 mb-4">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Newsletter</h3>
          <p>Enter Your Email Address</p>
          <div className="flex flex-col sm:flex-row mt-4 gap-2">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 flex-1 rounded-l bg-transparent border-b border-black text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-black p-2 rounded-r border-b border-black hover:bg-gray-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-left border-t border-gray-400 pt-4 pl-2">
        <p>&copy; 2024 Kashif Hardware. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;
