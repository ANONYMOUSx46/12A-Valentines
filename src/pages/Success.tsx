import React, { useEffect } from 'react';

const Success: React.FC = () => {
  useEffect(() => {
    // Redirect to the main site after 3 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-8">Your order has been successfully submitted.</p>
        <p className="text-xl text-gray-700">You will be redirected to the main site shortly.</p>
      </div>
    </div>
  );
};

export default Success;
