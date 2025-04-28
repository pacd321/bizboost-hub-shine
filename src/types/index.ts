// Export all the types here

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  hidden?: boolean;
  inStock?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  createdAt: string;
};

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  productId?: string;
};

export type SupportTicket = {
  id: string;
  customerId: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
};

export type SalesData = {
  date: string;
  revenue: number;
};

export type ProductAnalytics = {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
  profit: number;
};

export type MarketCompetitorData = {
  id: string;
  productName: string;
  yourPrice: number;
  amazonPrice: number;
  flipkartPrice: number;
  otherPrice: number;
  recommendedPrice: number;
  lastUpdated: string;
};

export type DeliveryOrder = {
  id: string;
  orderId: string;
  customerId: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
  }>;
  status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  deliveryPartner?: string;
  trackingNumber?: string;
  warehouseId: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
};

export type Warehouse = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  manager: string;
  contact: string;
};

export type StockMovement = {
  id: string;
  productId: string;
  product: {
    name: string;
    sku: string;
  };
  fromWarehouseId: string | null;
  toWarehouseId: string | null;
  quantity: number;
  reason: string;
  date: string;
};

export type Order = {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'delivered' | 'shipped' | 'processing' | 'pending' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  warehouseId: string;
  notes?: string;
};
