
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/currency';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock data for sales analytics
const salesData = [
  { date: '2023-04-01', revenue: 12500 },
  { date: '2023-04-02', revenue: 8900 },
  { date: '2023-04-03', revenue: 9800 },
  { date: '2023-04-04', revenue: 15600 },
  { date: '2023-04-05', revenue: 11200 },
  { date: '2023-04-06', revenue: 14300 },
  { date: '2023-04-07', revenue: 16800 },
];

// Mock data for top selling products
const topProducts = [
  { name: 'Wireless Earbuds', sales: 127, revenue: 95250 },
  { name: 'Smart Watch', sales: 89, revenue: 133500 },
  { name: 'Laptop Sleeve', sales: 65, revenue: 32500 },
  { name: 'Power Bank', sales: 47, revenue: 23500 },
  { name: 'Phone Case', sales: 38, revenue: 9500 },
];

// Mock data for order status distribution
const orderStatusData = [
  { name: 'Delivered', value: 67, color: '#10b981' },
  { name: 'Shipped', value: 23, color: '#8b5cf6' },
  { name: 'Processing', value: 8, color: '#3b82f6' },
  { name: 'Cancelled', value: 2, color: '#ef4444' },
];

// Mock data for payment method distribution
const paymentMethodData = [
  { name: 'Cash on Delivery', value: 48, color: '#f59e0b' },
  { name: 'UPI', value: 32, color: '#6366f1' },
  { name: 'Credit/Debit Card', value: 20, color: '#ec4899' },
];

export function MarketplaceAnalytics() {
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
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
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
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
