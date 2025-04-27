
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/currency';
import { Product } from '@/types';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onViewProduct, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden flex flex-col h-full">
          <div className="aspect-square bg-gray-100 relative overflow-hidden">
            {/* Product image would go here. Using placeholder for now. */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">Product Image</span>
            </div>
            
            <Badge 
              variant="secondary" 
              className="absolute top-3 right-3"
            >
              {product.category}
            </Badge>
          </div>
          
          <CardContent className="pt-6 flex-grow">
            <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-baseline justify-between">
              <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
              {product.stock > 0 ? (
                <span className="text-xs text-green-600">{product.stock} in stock</span>
              ) : (
                <span className="text-xs text-red-600">Out of stock</span>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => onViewProduct(product)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              disabled={product.stock === 0}
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
