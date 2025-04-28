import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/currency';
import { storage } from '@/lib/storage';
import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Order {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  createdAt: string;
  warehouseId: string;
  notes?: string;
}

export function MarketplaceAnalytics() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [salesData, setSalesData] = useState<{ date: string; revenue: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; sales: number; revenue: number }[]>([]);
  const [orderStatusData, setOrderStatusData] = useState<{ name: string; value: number; color: string }[]>([]);
  const [paymentMethodData, setPaymentMethodData] = useState<{ name: string; value: number; color: string }[]>([]);

  useEffect(() => {
    const storedOrders = storage.getOrders();
    setOrders(storedOrders);
  }, []);

  useEffect(() => {
    if (orders.length === 0) return;

    // Calculate sales data for the last 7 days
    const today = new Date();
    const salesByDate = new Map<string, number>();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      salesByDate.set(dateStr, 0);
    }

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      if (salesByDate.has(orderDate)) {
        salesByDate.set(orderDate, salesByDate.get(orderDate)! + order.totalAmount);
      }
    });

    setSalesData(Array.from(salesByDate.entries()).map(([date, revenue]) => ({ date, revenue })));

    // Calculate top products
    const productSales = new Map<string, { name: string; sales: number; revenue: number }>();
    
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!productSales.has(item.productId)) {
          productSales.set(item.productId, { name: item.productName, sales: 0, revenue: 0 });
        }
        const product = productSales.get(item.productId)!;
        product.sales += item.quantity;
        product.revenue += item.price * item.quantity;
      });
    });

    setTopProducts(Array.from(productSales.values())
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5));

    // Calculate order status distribution
    const statusCounts = new Map<string, number>();
    orders.forEach(order => {
      statusCounts.set(order.status, (statusCounts.get(order.status) || 0) + 1);
    });

    const statusColors = {
      'delivered': '#10b981',
      'shipped': '#8b5cf6',
      'processing': '#3b82f6',
      'pending': '#f59e0b',
      'cancelled': '#ef4444'
    };

    setOrderStatusData(Array.from(statusCounts.entries()).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: statusColors[name as keyof typeof statusColors] || '#6b7280'
    })));

    // Calculate payment method distribution
    const paymentCounts = new Map<string, number>();
    orders.forEach(order => {
      paymentCounts.set(order.paymentMethod, (paymentCounts.get(order.paymentMethod) || 0) + 1);
    });

    const paymentColors = {
      'Cash on Delivery': '#f59e0b',
      'UPI': '#6366f1',
      'Credit/Debit Card': '#ec4899',
      'Net Banking': '#3b82f6'
    };

    setPaymentMethodData(Array.from(paymentCounts.entries()).map(([name, value]) => ({
      name,
      value,
      color: paymentColors[name as keyof typeof paymentColors] || '#6b7280'
    })));
  }, [orders]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Sales Revenue (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value).replace('₹', '₹ ')}
                />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), "Revenue"]}
                  labelFormatter={(label) => new Date(label as string).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`${value} units`, "Sales"]}
                />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" name="Units Sold" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} orders`, "Count"]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} orders`, "Count"]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
