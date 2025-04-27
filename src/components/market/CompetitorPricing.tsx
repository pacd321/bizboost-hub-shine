
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MarketCompetitorData } from '@/types';
import { formatCurrency } from '@/lib/currency';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompetitorPricingProps {
  data: MarketCompetitorData[];
}

export function CompetitorPricing({ data }: CompetitorPricingProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Competitor Pricing Analysis</CardTitle>
          <CardDescription>Compare your prices with major marketplaces</CardDescription>
        </CardHeader>
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
                {data.map((item) => (
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
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
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
