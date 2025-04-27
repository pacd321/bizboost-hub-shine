
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
  productId?: string;
  product?: Product;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  customer?: Customer;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface SalesData {
  date: string;
  revenue: number;
}

export interface ProductAnalytics {
  productId: string;
  productName: string;
  totalSold: number;
  revenue: number;
  profit: number;
}

export interface MarketCompetitorData {
  id: string;
  productName: string;
  yourPrice: number;
  amazonPrice?: number;
  flipkartPrice?: number;
  otherPrice?: number;
  recommendedPrice: number;
  lastUpdated: string;
}

export interface DeliveryOrder {
  id: string;
  orderId: string;
  customerId: string;
  customer: Partial<Customer>;
  items: Array<{productId: string, productName: string, quantity: number}>;
  status: 'pending' | 'processing' | 'dispatched' | 'delivered' | 'cancelled';
  deliveryPartner?: string;
  trackingNumber?: string;
  warehouseId: string;
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
}

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  manager: string;
  contact: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  product: Partial<Product>;
  fromWarehouseId: string | null;
  toWarehouseId: string;
  quantity: number;
  reason: string;
  date: string;
}
