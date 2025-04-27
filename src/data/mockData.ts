
import { 
  Product, 
  Customer, 
  Transaction, 
  SupportTicket, 
  SalesData,
  ProductAnalytics,
  MarketCompetitorData,
  DeliveryOrder,
  Warehouse,
  StockMovement
} from '@/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium T-Shirt',
    description: 'High quality cotton t-shirt',
    category: 'Apparel',
    price: 1999,
    cost: 800,
    stock: 45,
    sku: 'TS001',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-08-20T14:45:00Z',
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'Noise cancelling bluetooth headphones',
    category: 'Electronics',
    price: 4999,
    cost: 2500,
    stock: 17,
    sku: 'WH002',
    createdAt: '2023-05-10T09:15:00Z',
    updatedAt: '2023-09-01T11:20:00Z',
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    description: '750ml insulated water bottle',
    category: 'Kitchenware',
    price: 1499,
    cost: 600,
    stock: 62,
    sku: 'WB003',
    createdAt: '2023-07-22T13:45:00Z',
    updatedAt: '2023-08-15T10:10:00Z',
  },
  {
    id: '4',
    name: 'Organic Face Cream',
    description: 'Natural ingredients face moisturizer',
    category: 'Beauty',
    price: 2499,
    cost: 900,
    stock: 38,
    sku: 'FC004',
    createdAt: '2023-06-05T16:20:00Z',
    updatedAt: '2023-09-10T15:30:00Z',
  },
  {
    id: '5',
    name: 'Yoga Mat',
    description: 'Non-slip exercise yoga mat',
    category: 'Fitness',
    price: 1899,
    cost: 750,
    stock: 29,
    sku: 'YM005',
    createdAt: '2023-08-03T11:25:00Z',
    updatedAt: '2023-09-12T09:40:00Z',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    phone: '+91-9876543210',
    address: '42 Park Avenue',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    createdAt: '2023-05-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    phone: '+91-8765432109',
    address: '15 Green Street',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    createdAt: '2023-06-18T14:30:00Z',
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.k@example.com',
    phone: '+91-7654321098',
    address: '78 Lake View',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    createdAt: '2023-07-25T09:15:00Z',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 4999,
    description: 'Sale of Wireless Headphones',
    category: 'Product Sale',
    date: '2023-09-15T14:30:00Z',
    productId: '2',
  },
  {
    id: '2',
    type: 'income',
    amount: 3998,
    description: 'Sale of 2x Premium T-Shirt',
    category: 'Product Sale',
    date: '2023-09-14T11:45:00Z',
    productId: '1',
  },
  {
    id: '3',
    type: 'expense',
    amount: 15000,
    description: 'Inventory Restock',
    category: 'Inventory',
    date: '2023-09-12T09:20:00Z',
  },
  {
    id: '4',
    type: 'expense',
    amount: 5000,
    description: 'Office Rent',
    category: 'Rent',
    date: '2023-09-01T10:00:00Z',
  },
  {
    id: '5',
    type: 'income',
    amount: 2998,
    description: 'Sale of 2x Stainless Steel Water Bottle',
    category: 'Product Sale',
    date: '2023-09-10T16:15:00Z',
    productId: '3',
  },
];

export const mockSupportTickets: SupportTicket[] = [
  {
    id: '1',
    customerId: '1',
    subject: 'Defective Product Received',
    description: 'I received a damaged wireless headphone. The right earpiece is not working.',
    status: 'open',
    priority: 'high',
    createdAt: '2023-09-14T10:30:00Z',
    updatedAt: '2023-09-14T10:30:00Z',
  },
  {
    id: '2',
    customerId: '2',
    subject: 'Request for Refund',
    description: 'I would like to request a refund for my recent purchase as it was not as described.',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2023-09-13T15:45:00Z',
    updatedAt: '2023-09-14T09:20:00Z',
    assignedTo: 'Sanjay',
  },
  {
    id: '3',
    customerId: '3',
    subject: 'Shipping Delay',
    description: 'My order was supposed to be delivered yesterday but I have not received it yet.',
    status: 'resolved',
    priority: 'low',
    createdAt: '2023-09-12T14:10:00Z',
    updatedAt: '2023-09-13T11:30:00Z',
    assignedTo: 'Neha',
  },
];

export const mockSalesData: SalesData[] = [
  { date: '2023-09-12', revenue: 24500 },
  { date: '2023-09-13', revenue: 18700 },
  { date: '2023-09-14', revenue: 32600 },
  { date: '2023-09-15', revenue: 28900 },
  { date: '2023-09-16', revenue: 34500 },
  { date: '2023-09-17', revenue: 42100 },
  { date: '2023-09-18', revenue: 38200 },
];

export const mockProductAnalytics: ProductAnalytics[] = [
  {
    productId: '1',
    productName: 'Premium T-Shirt',
    totalSold: 45,
    revenue: 89955,
    profit: 53955
  },
  {
    productId: '2',
    productName: 'Wireless Headphones',
    totalSold: 28,
    revenue: 139972,
    profit: 69972
  },
  {
    productId: '3',
    productName: 'Stainless Steel Water Bottle',
    totalSold: 67,
    revenue: 100433,
    profit: 60133
  },
  {
    productId: '4',
    productName: 'Organic Face Cream',
    totalSold: 32,
    revenue: 79968,
    profit: 51168
  },
  {
    productId: '5',
    productName: 'Yoga Mat',
    totalSold: 22,
    revenue: 41778,
    profit: 25278
  }
];

export const mockMarketData: MarketCompetitorData[] = [
  {
    id: '1',
    productName: 'Premium T-Shirt',
    yourPrice: 1999,
    amazonPrice: 2499,
    flipkartPrice: 2199,
    otherPrice: 1899,
    recommendedPrice: 2099,
    lastUpdated: '2023-09-18T10:30:00Z'
  },
  {
    id: '2',
    productName: 'Wireless Headphones',
    yourPrice: 4999,
    amazonPrice: 5499,
    flipkartPrice: 4899,
    otherPrice: 5299,
    recommendedPrice: 5199,
    lastUpdated: '2023-09-18T10:30:00Z'
  },
  {
    id: '3',
    productName: 'Stainless Steel Water Bottle',
    yourPrice: 1499,
    amazonPrice: 1699,
    flipkartPrice: 1599,
    otherPrice: 1549,
    recommendedPrice: 1599,
    lastUpdated: '2023-09-18T10:30:00Z'
  }
];

export const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    name: 'Mumbai Central Warehouse',
    address: '123 Industrial Area, Andheri East',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400069',
    manager: 'Vikram Singh',
    contact: '+91-9876543210'
  },
  {
    id: '2',
    name: 'Delhi Distribution Center',
    address: '456 Logistics Park, Gurgaon',
    city: 'Delhi NCR',
    state: 'Haryana',
    pincode: '122001',
    manager: 'Anjali Mehta',
    contact: '+91-8765432109'
  },
  {
    id: '3',
    name: 'Bangalore Fulfillment Hub',
    address: '789 Tech Park, Whitefield',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560066',
    manager: 'Ravi Kumar',
    contact: '+91-7654321098'
  }
];

export const mockDeliveryOrders: DeliveryOrder[] = [
  {
    id: '1',
    orderId: 'ORD-2023-001',
    customerId: '1',
    customer: {
      name: 'Rahul Sharma',
      phone: '+91-9876543210',
      address: '42 Park Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
    },
    items: [
      {productId: '1', productName: 'Premium T-Shirt', quantity: 2},
      {productId: '3', productName: 'Stainless Steel Water Bottle', quantity: 1}
    ],
    status: 'dispatched',
    deliveryPartner: 'BlueDart',
    trackingNumber: 'BD123456789',
    warehouseId: '1',
    createdAt: '2023-09-16T09:30:00Z',
    updatedAt: '2023-09-17T14:20:00Z',
    deliveryDate: '2023-09-19T00:00:00Z'
  },
  {
    id: '2',
    orderId: 'ORD-2023-002',
    customerId: '2',
    customer: {
      name: 'Priya Patel',
      phone: '+91-8765432109',
      address: '15 Green Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
    items: [
      {productId: '2', productName: 'Wireless Headphones', quantity: 1}
    ],
    status: 'processing',
    warehouseId: '2',
    createdAt: '2023-09-17T11:45:00Z',
    updatedAt: '2023-09-17T15:30:00Z'
  },
  {
    id: '3',
    orderId: 'ORD-2023-003',
    customerId: '3',
    customer: {
      name: 'Amit Kumar',
      phone: '+91-7654321098',
      address: '78 Lake View',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560001',
    },
    items: [
      {productId: '4', productName: 'Organic Face Cream', quantity: 1},
      {productId: '5', productName: 'Yoga Mat', quantity: 1}
    ],
    status: 'delivered',
    deliveryPartner: 'Delhivery',
    trackingNumber: 'DL987654321',
    warehouseId: '3',
    createdAt: '2023-09-15T10:15:00Z',
    updatedAt: '2023-09-18T11:10:00Z',
    deliveryDate: '2023-09-18T09:45:00Z'
  }
];

export const mockStockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    product: { name: 'Premium T-Shirt', sku: 'TS001' },
    fromWarehouseId: null,
    toWarehouseId: '1',
    quantity: 50,
    reason: 'Initial Stock',
    date: '2023-09-10T09:30:00Z'
  },
  {
    id: '2',
    productId: '2',
    product: { name: 'Wireless Headphones', sku: 'WH002' },
    fromWarehouseId: '1',
    toWarehouseId: '2',
    quantity: 15,
    reason: 'Stock Transfer',
    date: '2023-09-12T14:45:00Z'
  },
  {
    id: '3',
    productId: '3',
    product: { name: 'Stainless Steel Water Bottle', sku: 'WB003' },
    fromWarehouseId: null,
    toWarehouseId: '3',
    quantity: 30,
    reason: 'New Inventory',
    date: '2023-09-14T10:15:00Z'
  }
];
