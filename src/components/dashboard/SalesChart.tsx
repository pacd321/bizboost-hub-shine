
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { SalesData } from '@/types';
import { formatCurrency } from '@/lib/currency';

interface SalesChartProps {
  data: SalesData[];
}

export function SalesChart({ data }: SalesChartProps) {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Daily revenue for the current period</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => {
                const d = new Date(date);
                return d.getDate() + "/" + (d.getMonth() + 1);
              }}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              width={80}
              tickFormatter={(value) => `₹${value/1000}k`}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(Number(value))}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString('en-IN')}`}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2563eb" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
