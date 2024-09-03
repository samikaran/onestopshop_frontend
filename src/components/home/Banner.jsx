import React from "react";
import { BsArrowRight } from "react-icons/bs";

const Banner = () => {
  return (
    <>
      <div className="section">
        <div className="grid xl:grid-cols-3 xl:grid-rows-1 gap-8">

          <div className="relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="./images/hero-1.jpg"
              alt="banner image"
            />
            <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Best Yummy Pizza
              </h2>
              <p className="text-gray-500 text-xl pt-4">Starting At</p>
              <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-8">
                $77.7
              </div>
              <div className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] cursor-pointer">
                Shop Now <BsArrowRight />
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="./images/hero-1.jpg"
              alt="banner image"
            />
            <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Best Yummy Pizza
              </h2>
              <p className="text-gray-500 text-xl pt-4">Starting At</p>
              <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-8">
                $77.7
              </div>
              <div className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] cursor-pointer">
                Shop Now <BsArrowRight />
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              className="w-full h-full object-cover rounded-lg"
              src="./images/hero-1.jpg"
              alt="banner image"
            />
            <div className="absolute max-w-[470px] sm:ml-16 ml-8 top-[50%] -translate-y-[50%] sm:space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Best Yummy Chips
              </h2>
              <p className="text-gray-500 text-xl pt-4">Starting At</p>
              <div className="font-medium text-red-600 text-2xl sm:text-4xl pb-8">
                $77.7
              </div>
              <div className="bg-accent hover:bg-accentDark text-white rounded-full w-fit flex items-center gap-4 px-4 py-2 text-[14px] cursor-pointer">
                Shop Now <BsArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
