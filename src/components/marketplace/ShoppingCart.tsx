
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/currency';
import { Trash, Plus, Minus } from 'lucide-react';

interface ShoppingCartProps {
  items: Array<{product: Product, quantity: number}>;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.18; // Assuming 18% GST
  const total = subtotal + tax;
  
  const handleQuantityChange = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onUpdateQuantity(productId, value);
    }
  };
  
  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full">
            Continue Shopping
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopping Cart ({items.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {items.map(({product, quantity}) => (
          <div key={product.id} className="flex gap-3 py-3 border-b last:border-0">
            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
            <div className="flex-grow">
              <h4 className="font-medium line-clamp-1">{product.name}</h4>
              <div className="text-sm text-muted-foreground">{formatCurrency(product.price)}</div>
              <div className="flex items-center mt-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(product.id, e)}
                  className="w-10 h-7 mx-1 text-center p-1"
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-7 w-7 text-red-500 ml-auto"
                  onClick={() => onRemoveItem(product.id)}
                >
                  <Trash className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        <div className="space-y-2 pt-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (18% GST)</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between text-base font-medium pt-1 border-t">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onCheckout} className="w-full">
          Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
}
