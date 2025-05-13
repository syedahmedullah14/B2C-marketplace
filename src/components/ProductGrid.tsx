
import React, { useState, useEffect } from 'react';
import { Product } from '@/contexts/CartContext';
import ProductCard from './ProductCard';
import { fetchProducts, fetchProductsByCategory } from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  selectedCategory: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        let fetchedProducts;

        if (selectedCategory && selectedCategory !== 'all') {
          fetchedProducts = await fetchProductsByCategory(selectedCategory);
        } else {
          fetchedProducts = await fetchProducts();
        }

        setProducts(fetchedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center p-8 bg-red-50 rounded-lg">
          <p className="text-red-500">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-marketplace-primary text-white rounded hover:bg-marketplace-secondary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {selectedCategory && selectedCategory !== 'all' 
          ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` 
          : 'All Products'}
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-48 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
