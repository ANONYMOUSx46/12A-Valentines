import React from 'react';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-8">Your order has been successfully submitted.</p>
        <button
          onClick={() => window.history.back()}
          className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;