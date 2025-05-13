
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import CategoryCarousel from '@/components/CategoryCarousel';
import ProductGrid from '@/components/ProductGrid';
import { CartProvider } from '@/contexts/CartContext';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-marketplace-light to-white">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Discover Amazing Products
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  Shop the latest trends and discover the best deals on our marketplace.
                </p>
                <a 
                  href="#products-section" 
                  className="inline-block px-6 py-3 bg-marketplace-primary text-white font-medium rounded-md hover:bg-marketplace-secondary transition-colors"
                >
                  Shop Now
                </a>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80" 
                  alt="Shopping online" 
                  className="rounded-lg shadow-lg w-full h-auto max-w-lg mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Categories Section */}
        <CategoryCarousel onSelectCategory={handleCategorySelect} />
        
        {/* Products Section */}
        <div id="products-section">
          <ProductGrid selectedCategory={selectedCategory} />
        </div>
        
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">MarketHub</h3>
                <p className="text-gray-400">
                  Your one-stop shop for all your shopping needs.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                  <li><a href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</a></li>
                  <li><a href="/cart" className="text-gray-400 hover:text-white transition-colors">Cart</a></li>
                  <li><a href="/profile" className="text-gray-400 hover:text-white transition-colors">Profile</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400">
                  Email: support@markethub.com<br />
                  Phone: (123) 456-7890
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} MarketHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default Index;
