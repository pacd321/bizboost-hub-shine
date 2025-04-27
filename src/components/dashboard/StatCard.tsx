
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/currency';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isCurrency?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon, trend, isCurrency = false, className }: StatCardProps) {
  const formattedValue = isCurrency ? formatCurrency(Number(value)) : value;
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{formattedValue}</h3>
          {trend && (
            <p className={cn(
              "text-xs flex items-center mt-2",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-muted-foreground ml-1">vs last month</span>
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-full text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
