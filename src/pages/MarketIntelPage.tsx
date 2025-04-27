
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CompetitorPricing } from '../components/market/CompetitorPricing';
import { mockMarketData } from '../data/mockData';
import { BarChart, PieChart, Cell, Legend, Bar, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/currency';

const MarketIntelPage = () => {
  // Sample data for the charts
  const categoryData = [
    { name: 'Electronics', value: 35, color: '#2563eb' },
    { name: 'Apparel', value: 25, color: '#7c3aed' },
    { name: 'Beauty', value: 15, color: '#db2777' },
    { name: 'Kitchenware', value: 15, color: '#ea580c' },
    { name: 'Fitness', value: 10, color: '#16a34a' },
  ];
  
  const competitorData = [
    { name: 'Your Store', sales: 68000, color: '#2563eb' },
    { name: 'Amazon', sales: 120000, color: '#7c3aed' },
    { name: 'Flipkart', sales: 98000, color: '#db2777' },
    { name: 'Other', sales: 45000, color: '#ea580c' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Market Intelligence</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Share by Category</CardTitle>
              <CardDescription>Analysis of market share across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales Comparison</CardTitle>
              <CardDescription>Your sales compared to competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={competitorData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar dataKey="sales">
                      {competitorData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <CompetitorPricing data={mockMarketData} />

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Market Insights</CardTitle>
            <CardDescription>Recommendations based on market analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Price Optimization</h3>
                <p className="text-blue-700">
                  Our AI analysis suggests that increasing the price of "Wireless Headphones" by ₹200 could 
                  increase profit margins without significantly affecting sales volume based on 
                  competitor pricing and customer demand patterns.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800 mb-2">Inventory Recommendations</h3>
                <p className="text-green-700">
                  Demand for "Premium T-Shirts" is projected to increase by 30% in the next month 
                  based on seasonal trends. Consider increasing your stock level to meet the anticipated demand.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="font-medium text-purple-800 mb-2">Competition Alert</h3>
                <p className="text-purple-700">
                  A new competitor has entered the market for "Stainless Steel Water Bottles" with aggressive pricing. 
                  Consider running a limited-time promotion to maintain your market share.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketIntelPage;
