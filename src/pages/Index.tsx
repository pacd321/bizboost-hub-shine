
import React, { useState } from 'react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/dashboard/StatCard';
import { SalesChart } from '../components/dashboard/SalesChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { TopSellingProducts } from '../components/dashboard/TopSellingProducts';
import { RecentSupportTickets } from '../components/dashboard/RecentSupportTickets';
import { DeliveryStatusCard } from '../components/dashboard/DeliveryStatusCard';
import { OnboardingSteps } from '../components/onboarding/OnboardingSteps';
import { 
  mockSalesData, 
  mockTransactions, 
  mockProductAnalytics, 
  mockSupportTickets,
  mockDeliveryOrders
} from '../data/mockData';
import { ArrowUpRight, ShoppingBag, Inbox, CreditCard, TruckIcon } from 'lucide-react';

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  // Calculate some summary statistics
  const totalSales = mockSalesData.reduce((sum, day) => sum + day.revenue, 0);
  const totalProducts = mockProductAnalytics.reduce((sum, product) => sum + product.totalSold, 0);
  const pendingTickets = mockSupportTickets.filter(ticket => ticket.status === 'open').length;
  const pendingDeliveries = mockDeliveryOrders.filter(order => order.status === 'pending' || order.status === 'processing').length;

  if (showOnboarding) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <OnboardingSteps onComplete={() => setShowOnboarding(false)} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={totalSales}
            isCurrency={true}
            icon={<CreditCard className="h-5 w-5" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Products Sold"
            value={totalProducts}
            icon={<ShoppingBag className="h-5 w-5" />}
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Open Tickets"
            value={pendingTickets}
            icon={<Inbox className="h-5 w-5" />}
            trend={{ value: 2.1, isPositive: false }}
          />
          <StatCard
            title="Pending Deliveries"
            value={pendingDeliveries}
            icon={<TruckIcon className="h-5 w-5" />}
            trend={{ value: 5.3, isPositive: true }}
          />
        </div>
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          <SalesChart data={mockSalesData} />
          <RecentTransactions transactions={mockTransactions.slice(0, 3)} />
        </div>
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <TopSellingProducts products={mockProductAnalytics} />
          <div className="grid gap-4 grid-cols-1">
            <RecentSupportTickets tickets={mockSupportTickets.slice(0, 2)} />
            <DeliveryStatusCard deliveries={mockDeliveryOrders.slice(0, 2)} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
