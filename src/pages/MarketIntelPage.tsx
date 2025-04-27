
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, Cell, Legend, Bar, Pie, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/currency';
import { ArrowRight, BarChart2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Market Share Analysis</span>
                <Button asChild variant="ghost" className="h-8 w-8 p-0">
                  <Link to="/market-insights">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>Top-level market share overview</CardDescription>
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
              <div className="mt-4 flex justify-center">
                <Button asChild>
                  <Link to="/market-insights">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    View Detailed Analysis
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Competitor Pricing</span>
                <Button asChild variant="ghost" className="h-8 w-8 p-0">
                  <Link to="/competitor-pricing">
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardTitle>
              <CardDescription>Sales comparison with competitors</CardDescription>
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
              <div className="mt-4 flex justify-center">
                <Button asChild>
                  <Link to="/competitor-pricing">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Compare Product Prices
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI-Powered Market Insights</CardTitle>
            <CardDescription>Key recommendations based on market analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Price Optimization</h3>
                <p className="text-blue-700">
                  Our AI analysis suggests that increasing the price of "Wireless Headphones" by ₹200 could 
                  increase profit margins without significantly affecting sales volume.
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h3 className="font-medium text-green-800 mb-2">Inventory Recommendations</h3>
                <p className="text-green-700">
                  Demand for "Premium T-Shirts" is projected to increase by 30% in the next month 
                  based on seasonal trends. Consider increasing your stock level.
                </p>
              </div>

              <div className="pt-4 flex justify-center">
                <Button asChild>
                  <Link to="/market-insights?tab=recommendations">
                    See All Insights
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MarketIntelPage;
