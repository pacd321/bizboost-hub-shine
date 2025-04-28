import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { WebsiteAbout } from '../components/website/WebsiteAbout';
import { WebsiteAuth } from '../components/website/WebsiteAuth';
import { WebsiteContact } from '../components/website/WebsiteContact';
import { WebsiteFeatures } from '../components/website/WebsiteFeatures';
import { WebsiteFooter } from '../components/website/WebsiteFooter';
import { WebsiteHeader } from '../components/website/WebsiteHeader';
import { WebsiteHero } from '../components/website/WebsiteHero';
import { WebsiteNewsletter } from '../components/website/WebsiteNewsletter';
import { WebsiteTestimonials } from '../components/website/WebsiteTestimonials';
import { supabase } from '../supabaseClient';

const WebsitePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{name: string, email: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  const { theme } = useTheme();
  const location = useLocation();

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
      const { error } = await supabase
        .from('customers')
        .upsert([
          {
            name: customer.name,
            email: customer.email,
          }
        ], { onConflict: 'email' });
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

    console.log("Customer logged in:", { email });
    await recordCustomer({ name: 'Customer User', email });
  };

  const handlePurchase = (product: Product) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    const updatedProducts = products.map(p => 
      p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 1) } : p
    );
    setProducts(updatedProducts);

    toast({
      title: "Purchase Successful",
      description: `You have successfully purchased ${product.name}.`,
    });

    console.log("Purchase made:", { 
      product,
      customer: currentUser,
      timestamp: new Date().toISOString()
    });
  };

  const HomeContent = () => (
    <>
      <WebsiteHero />
      <section className="py-16" style={{ backgroundColor: theme.backgroundColor }}>
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
                    <p className="text-sm" style={{ color: theme.primaryColor }}>{product.category}</p>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold">${product.price}</p>
                      <Button 
                        onClick={() => handleAddToCart(product)} 
                        size="sm"
                        style={{ 
                          backgroundColor: theme.primaryColor,
                          borderRadius: theme.buttonStyle === 'rounded' ? '0.375rem' : 
                                    theme.buttonStyle === 'pill' ? '9999px' : '0'
                        }}
                      >
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
    </>
  );

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: theme.backgroundColor,
      color: theme.textColor,
      fontFamily: theme.fontFamily
    }}>
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
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/about" element={<WebsiteAbout />} />
          <Route path="/contact" element={<WebsiteContact />} />
          <Route path="*" element={<HomeContent />} />
        </Routes>
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

          console.log("New customer registered:", { name, email });
          await recordCustomer({ name, email });
        }}
      />
    </div>
  );
};

export default WebsitePage;
