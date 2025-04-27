
import React from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart, Cell, Legend, Bar, Pie, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '@/lib/currency';

const MarketInsightsPage = () => {
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

  const monthlyTrendsData = [
    { month: 'Jan', yourSales: 42000, marketAverage: 38000 },
    { month: 'Feb', yourSales: 45000, marketAverage: 40000 },
    { month: 'Mar', yourSales: 50000, marketAverage: 42000 },
    { month: 'Apr', yourSales: 53000, marketAverage: 45000 },
    { month: 'May', yourSales: 49000, marketAverage: 47000 },
    { month: 'Jun', yourSales: 55000, marketAverage: 48000 },
    { month: 'Jul', yourSales: 60000, marketAverage: 50000 },
    { month: 'Aug', yourSales: 68000, marketAverage: 52000 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Market Insights</h1>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Market Trends</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Growth Analysis</CardTitle>
                <CardDescription>Year-over-Year Growth vs. Market Average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyTrendsData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${value/1000}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="yourSales" 
                        name="Your Sales" 
                        stroke="#2563eb" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="marketAverage" 
                        name="Market Average" 
                        stroke="#db2777" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        strokeDasharray="5 5" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emerging Industry Trends</CardTitle>
                <CardDescription>Latest market developments and opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-medium text-blue-800 mb-2">Sustainable Packaging Trend</h3>
                  <p className="text-blue-700">
                    There is a 45% increase in customer preference for eco-friendly packaging over the last quarter. 
                    Businesses adopting sustainable packaging reported a 28% boost in customer satisfaction ratings.
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Digital Payment Adoption</h3>
                  <p className="text-green-700">
                    UPI and digital wallet payments have increased by 67% year-over-year. Merchants offering 
                    diverse payment options report 34% higher conversion rates compared to cash-only businesses.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-medium text-purple-800 mb-2">Subscription Model Growth</h3>
                  <p className="text-purple-700">
                    Businesses implementing subscription models show 23% higher customer retention. 
                    The recurring revenue model is being adopted across all sectors, not just digital products.
                  </p>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h3 className="font-medium text-amber-800 mb-2">Social Commerce Impact</h3>
                  <p className="text-amber-700">
                    Products featured on social media platforms see a 56% higher purchase rate. 
                    Businesses actively engaging with customers on social channels report 40% higher repeat purchase rates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consumer Behavior Shifts</CardTitle>
                <CardDescription>How purchasing patterns are changing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="font-medium mb-2">Mobile Shopping</h3>
                      <div className="flex items-center justify-between">
                        <span>2023:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                        </div>
                        <span className="text-sm">62%</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span>2024:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-sm">78%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="font-medium mb-2">Research Before Purchase</h3>
                      <div className="flex items-center justify-between">
                        <span>2023:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span className="text-sm">70%</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span>2024:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm">85%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="font-medium mb-2">Eco-Friendly Preference</h3>
                      <div className="flex items-center justify-between">
                        <span>2023:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '48%' }}></div>
                        </div>
                        <span className="text-sm">48%</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span>2024:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                        <span className="text-sm">67%</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg border">
                      <h3 className="font-medium mb-2">Buy Now, Pay Later</h3>
                      <div className="flex items-center justify-between">
                        <span>2023:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm">35%</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span>2024:</span>
                        <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                          <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                        </div>
                        <span className="text-sm">52%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Market Insights</CardTitle>
                <CardDescription>Personalized recommendations based on market analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-800 mb-2">Price Optimization</h3>
                    <p className="text-blue-700">
                      Our AI analysis suggests that increasing the price of "Wireless Headphones" by ₹200 could 
                      increase profit margins without significantly affecting sales volume based on 
                      competitor pricing and customer demand patterns. This adjustment could add approximately
                      ₹15,000 to monthly profits.
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h3 className="font-medium text-green-800 mb-2">Inventory Recommendations</h3>
                    <p className="text-green-700">
                      Demand for "Premium T-Shirts" is projected to increase by 30% in the next month 
                      based on seasonal trends and social media sentiment analysis. Consider increasing your stock level 
                      from current 50 units to at least 75 units to meet the anticipated demand and prevent stockouts.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <h3 className="font-medium text-purple-800 mb-2">Competition Alert</h3>
                    <p className="text-purple-700">
                      A new competitor has entered the market for "Stainless Steel Water Bottles" with aggressive pricing
                      at ₹499 compared to your ₹649. Consider running a limited-time promotion offering a 15% discount
                      or bundling with complementary products to maintain your market share during this period.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                    <h3 className="font-medium text-amber-800 mb-2">Cross-Selling Opportunity</h3>
                    <p className="text-amber-700">
                      Customers who purchase your "Yoga Mats" are 70% more likely to be interested in "Fitness Bands" and
                      "Workout Towels" based on purchase pattern analysis. Consider creating a product bundle with a 10% discount 
                      to increase average order value by an estimated ₹850 per transaction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MarketInsightsPage;
