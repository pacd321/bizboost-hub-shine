import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/website/ProductCard';
import { WebsiteHeader } from '../components/website/WebsiteHeader';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { WebsiteHero } from '../components/website/WebsiteHero';
import { WebsiteFeatures } from '../components/website/WebsiteFeatures';
import { WebsiteTestimonials } from '../components/website/WebsiteTestimonials';
import { WebsiteNewsletter } from '../components/website/WebsiteNewsletter';
import { useToast } from '@/hooks/use-toast';
import { mockProducts } from '../data/mockData';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { WebsiteAuth } from '../components/website/WebsiteAuth';
import { supabase } from '../supabaseClient'; // Add this import

const WebsitePage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string, email: string} | null>(null);
  const { toast } = useToast();

  const recordCustomer = async (customer: { name: string; email: string }) => {
    try {
      // Insert or upsert customer into Supabase
      const { error } = await supabase
        .from('customers')
        .upsert([
          {
            name: customer.name,
            email: customer.email,
            // Add more fields as needed
          }
        ], { onConflict: 'email' }); // Prevent duplicates by email
      if (error) {
        console.error('Supabase error:', error.message);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ name: 'Customer User', email });
    setIsAuthModalOpen(false);
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${email}`,
    });

    // Log customer data to dashboard
    console.log("Customer logged in:", { email });

    // Record customer in Supabase
    await recordCustomer({ name: 'Customer User', email });
  };

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });

    // Update analytics in the backend (simulated)
    console.log("Product added to cart:", product);
  };

  const handlePurchase = (product: Product) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    // Update inventory (decrease stock)
    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p
    );
    setProducts(updatedProducts);

    // Simulate a successful purchase
    toast({
      title: "Purchase Successful",
      description: `You have successfully purchased ${product.name}.`,
    });

    // Log purchase to the dashboard (simulated)
    console.log("Purchase made:", { 
      product,
      customer: currentUser,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteHeader 
        isAuthenticated={isAuthenticated}
        userEmail={currentUser?.email}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogoutClick={() => {
          setIsAuthenticated(false);
          setCurrentUser(null);
          toast({
            title: "Logged out",
            description: "You have been logged out successfully.",
          });
        }}
      />
      
      <main>
        <WebsiteHero />
        
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => handleAddToCart(product)}
                onPurchase={() => handlePurchase(product)}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">View All Products</Button>
          </div>
        </section>
        
        <WebsiteFeatures />
        <WebsiteTestimonials />
        <WebsiteNewsletter />
      </main>
      
      <WebsiteFooter />

      <WebsiteAuth 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
        onRegister={async (name, email, password) => {
          setIsAuthenticated(true);
          setCurrentUser({ name, email });
          setIsAuthModalOpen(false);
          toast({
            title: "Account created",
            description: `Welcome, ${name}!`,
          });

          // Log new customer to dashboard
          console.log("New customer registered:", { name, email });

          // Record customer in Supabase
          await recordCustomer({ name, email });
        }}
      />
    </div>
  );
};

export default WebsitePage;
