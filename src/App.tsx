import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure correct import
import { Heart, ShoppingCart, Gift } from 'lucide-react';
import ProductCard from './components/ProductCard';
import OrderForm from './components/OrderForm';
import Success from './pages/Success';
import { products } from './data/products';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessPage, setIsSuccessPage] = useState(false);

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFormOpen]);

  const handleOrderSubmit = () => {
    setIsFormOpen(false);
    setIsSuccessPage(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-50">
        {isSuccessPage ? (
          <Success />
        ) : (
          <>
            {/* Hero Section */}
            <header className="relative overflow-hidden">
              <div className="absolute inset-0 bg-red-100/30 backdrop-blur-sm"></div>
              <div className="container mx-auto px-4 py-16 relative">
                <div className="text-center animate-fade-in">
                  <Heart className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                  <h1 className="text-5xl font-bold text-red-600 mb-4">Grade 12A Valentine's Day</h1>
                  <h2 className="text-2xl text-gray-700 mb-8">Grassdale High School</h2>
                  <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Place Order <ShoppingCart className="inline-block ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </header>
            {/* Products Section */}
            <section className="py-16 container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                Our Valentine's Specials
                <Gift className="inline-block ml-2 w-8 h-8 text-red-500" />
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} onOrder={() => setIsFormOpen(true)} />
                ))}
              </div>
            </section>
            {/* Order Form Modal */}
            {isFormOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
                <div
                  className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Place Your Order</h3>
                    <button
                      onClick={handleCloseForm}
                      className="text-gray-500 hover:text-gray-700 p-2"
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                  </div>
                  <OrderForm onClose={handleCloseForm} onSubmit={handleOrderSubmit} />
                </div>
              </div>
            )}
            {/* Footer */}
            <footer className="bg-red-600 text-white py-8">
              <div className="container mx-auto px-4 text-center">
                <p className="mb-2">Grassdale High School - Grade 12A</p>
                <p className="text-sm opacity-75">Spreading love and joy this Valentine's Day</p>
                <p className="text-sm opacity-75">Developed By Liam De Wet © All Rights Reserved</p>
              </div>
            </footer>
          </>
        )}
      </div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
