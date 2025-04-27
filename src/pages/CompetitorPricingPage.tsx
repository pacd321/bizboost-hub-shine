
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketCompetitorData } from '@/types';
import { mockMarketData } from '../data/mockData';
import { formatCurrency } from '@/lib/currency';

const CompetitorPricingPage = () => {
  const [data, setData] = useState<MarketCompetitorData[]>(mockMarketData);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl font-bold">Competitor Price Analysis</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Product to Track
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="opportunities">Price Opportunities</TabsTrigger>
            <TabsTrigger value="risks">Price Risks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <PriceComparisonTable data={filteredData} />
          </TabsContent>
          
          <TabsContent value="opportunities">
            <PriceComparisonTable 
              data={filteredData.filter(item => item.recommendedPrice > item.yourPrice)} 
            />
          </TabsContent>
          
          <TabsContent value="risks">
            <PriceComparisonTable 
              data={filteredData.filter(item => 
                (item.amazonPrice && item.amazonPrice < item.yourPrice) || 
                (item.flipkartPrice && item.flipkartPrice < item.yourPrice) ||
                (item.otherPrice && item.otherPrice < item.yourPrice)
              )} 
            />
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Pricing Insights</CardTitle>
            <CardDescription>AI-generated recommendations based on competitor pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-800 mb-2">Premium Opportunity</h3>
              <p className="text-blue-700">
                Your "Wireless Earbuds" are priced 15% below market average despite having higher customer ratings. 
                Consider a price increase of ₹350-500 to maximize revenue while remaining competitive.
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
              <h3 className="font-medium text-amber-800 mb-2">Competitive Threat</h3>
              <p className="text-amber-700">
                "Smartphone Accessories" category has seen 3 new competitors enter the market in the last 30 days, 
                with prices averaging 12% lower than yours. Consider bundling accessories or offering volume discounts.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <h3 className="font-medium text-green-800 mb-2">Seasonal Strategy</h3>
              <p className="text-green-700">
                Based on historical data, "Fitness Equipment" prices typically increase by 8-10% in January. 
                Planning your inventory and pricing strategy now could yield a 15% higher profit margin in Q1.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

interface PriceComparisonTableProps {
  data: MarketCompetitorData[];
}

function PriceComparisonTable({ data }: PriceComparisonTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full divide-y">
            <thead>
              <tr className="bg-muted/50">
                <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Product</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Your Price</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Amazon</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Flipkart</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Other</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 px-4 text-sm">{item.productName}</td>
                    <td className="py-3 px-4 text-sm text-right font-medium">{formatCurrency(item.yourPrice)}</td>
                    <td className="py-3 px-4 text-sm text-right">
                      {item.amazonPrice ? (
                        <div className="flex items-center justify-end">
                          {formatCurrency(item.amazonPrice)}
                          <PriceDifferenceBadge yourPrice={item.yourPrice} competitorPrice={item.amazonPrice} />
                        </div>
                      ) : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {item.flipkartPrice ? (
                        <div className="flex items-center justify-end">
                          {formatCurrency(item.flipkartPrice)}
                          <PriceDifferenceBadge yourPrice={item.yourPrice} competitorPrice={item.flipkartPrice} />
                        </div>
                      ) : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      {item.otherPrice ? (
                        <div className="flex items-center justify-end">
                          {formatCurrency(item.otherPrice)}
                          <PriceDifferenceBadge yourPrice={item.yourPrice} competitorPrice={item.otherPrice} />
                        </div>
                      ) : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-sm text-right">
                      <div className="flex items-center justify-end">
                        <Badge 
                          variant="outline" 
                          className={item.recommendedPrice > item.yourPrice ? 
                            "bg-green-100 text-green-800 border-green-200" : 
                            "bg-yellow-100 text-yellow-800 border-yellow-200"}
                        >
                          {formatCurrency(item.recommendedPrice)}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-muted-foreground">
                    No products found matching your search
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function PriceDifferenceBadge({ yourPrice, competitorPrice }: { yourPrice: number, competitorPrice: number }) {
  const difference = competitorPrice - yourPrice;
  const percentDifference = Math.round((difference / yourPrice) * 100);
  
  if (Math.abs(percentDifference) < 1) return null;
  
  if (percentDifference > 0) {
    // Your price is lower (good)
    return (
      <Badge variant="outline" className="ml-2 bg-green-100 text-green-800 border-green-200 flex items-center">
        <TrendingDown className="h-3 w-3 mr-1" />
        {Math.abs(percentDifference)}%
      </Badge>
    );
  } else {
    // Your price is higher (potential issue)
    return (
      <Badge variant="outline" className="ml-2 bg-red-100 text-red-800 border-red-200 flex items-center">
        <TrendingUp className="h-3 w-3 mr-1" />
        {Math.abs(percentDifference)}%
      </Badge>
    );
  }
}

export default CompetitorPricingPage;
