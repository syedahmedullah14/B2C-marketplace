
import React, { useRef } from 'react';

// Define the category interface
interface Category {
  id: string;
  name: string;
  image: string;
}

// Hardcoded categories with images from Unsplash
const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "jewelry",
    name: "Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "men's clothing",
    name: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "women's clothing",
    name: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "home",
    name: "Home Decor",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "beauty",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "sports",
    name: "Sports",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: "books",
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60",
  }
];

interface CategoryCarouselProps {
  onSelectCategory: (category: string) => void;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ onSelectCategory }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Browse Categories</h2>
        
        <div className="relative">
          {/* Scroll left button */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none hidden md:block"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Categories container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide space-x-4 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <div 
                key={category.id}
                className="flex-none cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => onSelectCategory(category.id)}
              >
                <div className="w-32 md:w-40 rounded-lg overflow-hidden shadow-md bg-white">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500" 
                    />
                  </div>
                  <div className="p-2 text-center">
                    <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll right button */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 focus:outline-none hidden md:block"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;
