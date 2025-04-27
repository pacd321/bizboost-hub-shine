
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { Product } from '@/types';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';

interface ProductViewProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onBackToShopping: () => void;
}

export function ProductView({ product, onAddToCart, onBackToShopping }: ProductViewProps) {
  const [quantity, setQuantity] = useState(1);
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Button 
        variant="ghost" 
        onClick={onBackToShopping} 
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to products
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center">
          {/* Product image would go here. Using placeholder for now. */}
          <span className="text-gray-500">Product Image</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline">{product.category}</Badge>
              <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
            </div>
            <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
            <p className="text-2xl font-bold mt-2 text-primary">
              {formatCurrency(product.price)}
            </p>
          </div>
          
          <div className="border-t border-b py-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          <div>
            <p className="mb-2 text-sm font-medium">Quantity</p>
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity} 
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 mx-2 text-center"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity} 
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              <span className="ml-4 text-sm text-muted-foreground">
                {product.stock} available
              </span>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleAddToCart}
                className="w-full"
                size="lg"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
