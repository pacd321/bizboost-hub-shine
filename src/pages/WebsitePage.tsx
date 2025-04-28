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
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from '../supabaseClient'; // Add this import

const WebsitePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string, email: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { toast } = useToast();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    };

    loadProducts();

    const handleStorageChange = (event) => {
      if (event.key === 'products') {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Setup auth listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      subscription?.unsubscribe();
    };
  }, []);

  const handleAddToCart = (product) => {
    if (!session) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
      });
      return;
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const filteredProducts = products.filter(product => 
    !product.hidden && 
    (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-200" 
                  />
                </div>
                <CardContent className="p-6">
                  <div>
                    <p className="text-sm text-blue-600 mb-2">{product.category}</p>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                      <Button onClick={() => handleAddToCart(product)} size="sm">
                        {/* <ShoppingCart className="h-4 w-4 mr-2" /> */}
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
