import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import { useEffect, useState } from 'react';
import { Checkout } from '../components/marketplace/Checkout';
import { ProductGrid } from '../components/marketplace/ProductGrid';
import { ProductView } from '../components/marketplace/ProductView';
import { ShoppingCart } from '../components/marketplace/ShoppingCart';
import { StorefrontLayout } from '../components/marketplace/StorefrontLayout';

const StorefrontPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Array<{product: Product, quantity: number}>>([]);
  const [isCheckout, setIsCheckout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        const allProducts = JSON.parse(storedProducts);
        // Filter out hidden products
        const visibleProducts = allProducts.filter((product: Product) => !product.hidden);
        setProducts(visibleProducts);
      }
    };

    loadProducts();

    const handleStorageChange = (event) => {
      if (event.key === 'products') {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
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
