import React from "react";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white flex flex-col justify-center items-center py-32 px-4 text-center relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
          Welcome to <span className="text-yellow-400">TradeMach</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-fadeIn delay-200">
          Your one-stop online store for machines & parts
        </p>
        <a
          href="/machines"
          className="bg-red-400 text-white-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:bg-red-300 transition"
        >
          Explore Machines
        </a>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full opacity-10 animate-pulse"></div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose TradeMach?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Quality Machines</h3>
            <p>Only the best machines and parts sourced from trusted manufacturers.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Fast Delivery</h3>
            <p>Get your machines delivered quickly and safely to your doorstep.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Easy to Use</h3>
            <p>Browse, compare, and purchase machines effortlessly with our platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
