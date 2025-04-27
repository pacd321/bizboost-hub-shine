
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Package,
  Users,
  LineChart,
  BarChart2,
  Truck,
  CreditCard,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import { useToast } from '@/hooks/use-toast';

export function AppSidebar() {
  const { pathname } = useLocation();
  const { toast } = useToast();
  
  const routes = [
    {
      name: 'Dashboard',
      href: '/',
      icon: Home,
    },
    {
      name: 'Inventory',
      href: '/inventory',
      icon: Package,
    },
    {
      name: 'Marketplace',
      href: '/marketplace',
      icon: Globe,
    },
    {
      name: 'Customers',
      href: '/customers',
      icon: Users,
    },
    {
      name: 'Market Intel',
      href: '/market-intel',
      icon: LineChart,
    },
    {
      name: 'Market Insights',
      href: '/market-insights',
      icon: BarChart2,
    },
    {
      name: 'Delivery',
      href: '/delivery',
      icon: Truck,
    },
    {
      name: 'Transactions',
      href: '/transactions',
      icon: CreditCard,
    },
    {
      name: 'Support',
      href: '/support',
      icon: MessageSquare,
    }
  ];

  return (
    <Sidebar className="border-r bg-background">
      <div className="flex flex-col gap-2 p-4">
        <div className="flex h-12 items-center px-2 font-semibold mb-4">
          <span className="text-lg">BizBoost Hub</span>
        </div>
        
        {routes.map((route) => {
          const Icon = route.icon;
          const isActive = pathname === route.href;
          
          return (
            <Button
              key={route.href}
              variant="ghost"
              className={cn(
                "justify-start gap-2",
                isActive && "bg-accent"
              )}
              asChild
            >
              <Link to={route.href}>
                <Icon className="h-5 w-5" />
                <span>{route.name}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </Sidebar>
  );
}
