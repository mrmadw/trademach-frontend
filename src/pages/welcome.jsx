import React from "react";
import hero from '../../public/hero.png'; // Adjust the path as needed


const myStyle = {
  backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat',
  };



const Welcome = () => {
  return (
     <div className=" flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[320px] md:h-[380px] flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className=" absolute inset-0 bg-cover bg-center"
          style={myStyle}
        ></div>

        {/* Color Overlay */}
        <div className="absolute inset-0 bg-black opacity-40 "></div>

        {/* Content */}
        <div className="relative z-10 text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
            Welcome to <span className="text-white-400">TradeMach</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 animate-fadeIn delay-200">
            Your one-stop online store for machines & parts
          </p>
        </div>


      </div>
    </div>
  );
};

export default Welcome;
