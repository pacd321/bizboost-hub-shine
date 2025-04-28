import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockWarehouses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/currency';
import { storage } from '@/lib/storage';
import { Product } from '@/types';
import { ArrowLeft, Check } from 'lucide-react';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface CheckoutProps {
  cartItems: Array<{product: Product, quantity: number}>;
  total: number;
  onBackToShopping: () => void;
}

export function Checkout({ cartItems, total, onBackToShopping }: CheckoutProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
    warehouseId: mockWarehouses[0]?.id || '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (!formData.name || !formData.email || !formData.address || !formData.city || !formData.phone) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    
    // Create order data
    const orderId = uuidv4();
    const now = new Date().toISOString();
    
    // Create customer data
    const customer = {
      id: uuidv4(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      createdAt: now
    };
    
    // Create delivery order
    const deliveryOrder = {
      id: uuidv4(),
      orderId,
      customer,
      items: cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      status: 'pending' as const,
      warehouseId: formData.warehouseId,
      paymentMethod: formData.paymentMethod,
      totalAmount: total,
      createdAt: now,
      updatedAt: now
    };
    
    // Create transaction
    const transaction = {
      id: uuidv4(),
      orderId,
      amount: total,
      type: 'income',
      category: 'sales',
      description: `Order #${orderId} - ${cartItems.map(item => item.product.name).join(', ')}`,
      date: now,
      paymentMethod: formData.paymentMethod
    };
    
    // Save all data to localStorage
    storage.saveCustomer(customer);
    storage.saveOrder({
      ...deliveryOrder,
      customerId: customer.id // Add required customerId field
    });
    storage.saveTransaction({
      ...transaction,
      type: 'income' as 'income' | 'expense' // Fix type to be union type
    });
    
    setOrderPlaced(true); 
    setLoading(false);
    
    toast({
      title: "Order placed successfully!",
      description: "Your order has been placed and will be processed shortly."
    });
  };

  // Order success screen
  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto my-12 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Thank you for your order. We have received your order and will process it shortly.
          You will receive an email confirmation with order details.
        </p>
        <Button onClick={onBackToShopping}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <Button 
        variant="ghost" 
        onClick={onBackToShopping} 
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to cart
      </Button>
      
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address*</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City*</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State*</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pincode">PIN Code*</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange('paymentMethod', value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-grow">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-grow">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-grow">Credit/Debit Card</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Delivery Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="warehouse">Select Shipping Warehouse</Label>
                  <Select 
                    value={formData.warehouseId}
                    onValueChange={(value) => handleSelectChange('warehouseId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select warehouse" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockWarehouses.map(warehouse => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name} ({warehouse.city})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll ship your order from the selected warehouse for faster delivery
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(({product, quantity}) => (
                <div key={product.id} className="flex justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <p className="font-medium">{formatCurrency(product.price * quantity)}</p>
                </div>
              ))}
              
              <div className="pt-2">
                <div className="flex justify-between text-sm py-1">
                  <span>Subtotal</span>
                  <span>{formatCurrency(total * 0.82)}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span>GST (18%)</span>
                  <span>{formatCurrency(total * 0.18)}</span>
                </div>
                <div className="flex justify-between text-sm py-1">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
