
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface StorefrontLayoutProps {
  children: React.ReactNode;
  cartItemCount?: number;
}

export function StorefrontLayout({ children, cartItemCount = 0 }: StorefrontLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality would go here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/storefront" className="text-2xl font-bold text-primary">
              BizBoost Shop
            </Link>
            
            <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Account</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Cart</span>
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs rounded-full">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
          
          {/* Category navigation */}
          <nav className="flex items-center space-x-6 mt-4 overflow-x-auto pb-2">
            <Link to="/storefront" className="text-sm font-medium hover:text-primary whitespace-nowrap">
              All Products
            </Link>
            <Link to="/storefront?category=Electronics" className="text-sm font-medium hover:text-primary whitespace-nowrap">
              Electronics
            </Link>
            <Link to="/storefront?category=Apparel" className="text-sm font-medium hover:text-primary whitespace-nowrap">
              Apparel
            </Link>
            <Link to="/storefront?category=Beauty" className="text-sm font-medium hover:text-primary whitespace-nowrap">
              Beauty
            </Link>
            <Link to="/storefront?category=Kitchenware" className="text-sm font-medium hover:text-primary whitespace-nowrap">
              Kitchenware
            </Link>
            <Link to="/storefront?category=Fitness" className="text-sm font-medium hover:text-primary whitespace-nowrap">
              Fitness
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BizBoost Shop</h3>
              <p className="text-sm">
                Quality products for businesses and individuals.
                Fast delivery, excellent customer service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white">About Us</a></li>
                <li><a href="#" className="text-sm hover:text-white">Contact</a></li>
                <li><a href="#" className="text-sm hover:text-white">Shipping Policy</a></li>
                <li><a href="#" className="text-sm hover:text-white">Returns & Refunds</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-sm not-italic">
                123 Business Park<br />
                Delhi, India<br />
                <a href="mailto:info@bizboost.in" className="hover:text-white">info@bizboost.in</a><br />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-center">
            &copy; {new Date().getFullYear()} BizBoost Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
