
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarHeader 
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { 
  Inbox, 
  BarChart3, 
  ShoppingBag, 
  Users, 
  Warehouse, 
  Settings,
  TrendingUp,
  Truck
} from 'lucide-react';

type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
};

export function AppSidebar() {
  const location = useLocation();
  
  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/', icon: BarChart3, current: location.pathname === '/' },
    { name: 'Inventory', href: '/inventory', icon: ShoppingBag, current: location.pathname.startsWith('/inventory') },
    { name: 'Customers', href: '/customers', icon: Users, current: location.pathname.startsWith('/customers') },
    { name: 'Support', href: '/support', icon: Inbox, current: location.pathname.startsWith('/support') },
    { name: 'Market Intel', href: '/market-intel', icon: TrendingUp, current: location.pathname.startsWith('/market-intel') },
    { name: 'Delivery & Warehouse', href: '/delivery', icon: Truck, current: location.pathname.startsWith('/delivery') },
    { name: 'Settings', href: '/settings', icon: Settings, current: location.pathname.startsWith('/settings') },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-6">
        <Link to="/" className="flex items-center space-x-2">
          <Warehouse className="h-8 w-8 text-white" />
          <span className="text-xl font-bold text-white">BizBoost</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild className={cn(
                    item.current && "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}>
                    <Link to={item.href} className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="px-4 py-5">
        <div className="flex items-center justify-between text-sidebar-foreground/80 text-sm">
          <span>© BizBoost {new Date().getFullYear()}</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
