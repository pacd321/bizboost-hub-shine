
import React, { useState, useEffect } from 'react';
import { StorefrontLayout } from '../components/marketplace/StorefrontLayout';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { ProductView } from '../components/marketplace/ProductView';
import { ShoppingCart } from '../components/marketplace/ShoppingCart';
import { Checkout } from '../components/marketplace/Checkout';
import { mockProducts } from '../data/mockData';
import { Product } from '@/types';

const StorefrontPage = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Array<{product: Product, quantity: number}>>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    const existingItemIndex = cartItems.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { product, quantity }]);
    }
    
    setSelectedProduct(null);
  };
  
  const handleRemoveFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.product.id !== productId));
  };
  
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    setCartItems(updatedCart);
  };
  
  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handleBackToShopping = () => {
    setSelectedProduct(null);
    setIsCheckout(false);
  };
  
  const handleProceedToCheckout = () => {
    setIsCheckout(true);
  };
  
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product.price * item.quantity), 
    0
  );

  return (
    <StorefrontLayout cartItemCount={totalItems}>
      {isCheckout ? (
        <Checkout 
          cartItems={cartItems} 
          total={cartTotal}
          onBackToShopping={handleBackToShopping}
        />
      ) : selectedProduct ? (
        <ProductView 
          product={selectedProduct} 
          onAddToCart={handleAddToCart}
          onBackToShopping={handleBackToShopping}
        />
      ) : (
        <div className="container mx-auto py-6 px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h1 className="text-2xl font-bold mb-6">Our Products</h1>
              <ProductGrid 
                products={products} 
                onViewProduct={handleViewProduct}
                onAddToCart={handleAddToCart}
              />
            </div>
            <div>
              <ShoppingCart 
                items={cartItems} 
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveFromCart}
                onCheckout={handleProceedToCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </StorefrontLayout>
  );
};

export default StorefrontPage;
