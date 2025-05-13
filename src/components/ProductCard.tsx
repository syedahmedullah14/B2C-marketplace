
import React from 'react';
import { Product, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain p-4 transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="flex-grow p-4">
        <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10">{product.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="font-bold text-lg text-marketplace-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-marketplace-primary hover:bg-marketplace-secondary transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
