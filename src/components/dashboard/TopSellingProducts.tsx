
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductAnalytics } from '@/types';
import { formatCurrency } from '@/lib/currency';

interface TopSellingProductsProps {
  products: ProductAnalytics[];
}

export function TopSellingProducts({ products }: TopSellingProductsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Top Selling Products</CardTitle>
        <CardDescription>Your best performing products</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left font-medium">Product</th>
              <th className="p-4 text-right font-medium">Sold</th>
              <th className="p-4 text-right font-medium">Revenue</th>
              <th className="p-4 text-right font-medium">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.slice(0, 5).map((product) => (
              <tr key={product.productId}>
                <td className="p-4 text-left">{product.productName}</td>
                <td className="p-4 text-right">{product.totalSold}</td>
                <td className="p-4 text-right">{formatCurrency(product.revenue)}</td>
                <td className="p-4 text-right text-green-600">{formatCurrency(product.profit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <CardFooter className="pt-3 pb-4 flex justify-center">
        <a href="/inventory" className="text-sm text-primary hover:underline">
          View all products
        </a>
      </CardFooter>
    </Card>
  );
}
