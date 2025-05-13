
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    toast.success("Checkout process initiated!");
    // In a real app, this would navigate to checkout page
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <ShoppingBag size={64} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products yet.</p>
          <Button asChild className="bg-marketplace-primary hover:bg-marketplace-secondary">
            <a href="/">Explore Products</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {cart.map(item => (
              <Card key={item.id} className="mb-4">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <AspectRatio ratio={1/1} className="bg-gray-100 rounded-md overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="object-contain w-full h-full"
                        />
                      </AspectRatio>
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium text-base line-clamp-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="mt-2 font-semibold">${item.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex flex-col items-end justify-between">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={18} className="text-gray-500 hover:text-red-500" />
                      </Button>
                      
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 p-0"
                          onClick={() => addToCart(item)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="mt-4"
            >
              Clear Cart
            </Button>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(getCartTotal() + 5 + getCartTotal() * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-marketplace-primary hover:bg-marketplace-secondary"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
