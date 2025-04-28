import { CreditCard, Inbox, ShoppingBag, TruckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DeliveryStatusCard } from '../components/dashboard/DeliveryStatusCard';
import { RecentSupportTickets } from '../components/dashboard/RecentSupportTickets';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { SalesChart } from '../components/dashboard/SalesChart';
import { StatCard } from '../components/dashboard/StatCard';
import { TopSellingProducts } from '../components/dashboard/TopSellingProducts';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { OnboardingSteps } from '../components/onboarding/OnboardingSteps';

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [supportTickets, setSupportTickets] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    setShowOnboarding(!onboardingCompleted);

    // Load data from localStorage
    const loadData = () => {
      const storedTransactions = localStorage.getItem('bizboost_transactions');
      const storedOrders = localStorage.getItem('bizboost_orders');
      const storedTickets = localStorage.getItem('bizboost_support_tickets');
      const storedProducts = localStorage.getItem('products');

      if (storedTransactions) setTransactions(JSON.parse(storedTransactions));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
      if (storedTickets) setSupportTickets(JSON.parse(storedTickets));
      if (storedProducts) setProducts(JSON.parse(storedProducts));
    };

    loadData();

    // Listen for storage changes
    const handleStorageChange = (event) => {
      if (event.key === 'bizboost_transactions' || 
          event.key === 'bizboost_orders' || 
          event.key === 'bizboost_support_tickets' ||
          event.key === 'products') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate real statistics
  const totalRevenue = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalProductsSold = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + o.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);

  const pendingTickets = supportTickets
    .filter(ticket => ticket.status === 'open').length;

  const pendingDeliveries = orders
    .filter(order => order.status === 'pending' || order.status === 'processing').length;

  // Generate sales data for the last 7 days
  const generateSalesData = () => {
    const salesData = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayRevenue = transactions
        .filter(t => t.type === 'income' && t.date.startsWith(dateStr))
        .reduce((sum, t) => sum + t.amount, 0);
      
      salesData.push({
        date: dateStr,
        revenue: dayRevenue
      });
    }
    
    return salesData;
  };

  // Get top selling products
  const getTopSellingProducts = () => {
    const productSales = {};
    
    orders.forEach(order => {
      if (order.status === 'delivered') {
        order.items.forEach(item => {
          if (!productSales[item.productId]) {
            productSales[item.productId] = {
              id: item.productId,
              name: item.productName,
              totalSold: 0,
              revenue: 0
            };
          }
          productSales[item.productId].totalSold += item.quantity;
          productSales[item.productId].revenue += item.price * item.quantity;
        });
      }
    });
    
    return Object.values(productSales)
      .sort((a, b) => b.totalSold - a.totalSold)
      .slice(0, 5);
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <OnboardingSteps onComplete={handleOnboardingComplete} />
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
            value={totalRevenue}
            isCurrency={true}
            icon={<CreditCard className="h-5 w-5" />}
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Products Sold"
            value={totalProductsSold}
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
          <SalesChart data={generateSalesData()} />
          <RecentTransactions transactions={transactions.slice(0, 3)} />
        </div>
        
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <TopSellingProducts products={getTopSellingProducts()} />
          <div className="grid gap-4 grid-cols-1">
            <RecentSupportTickets tickets={supportTickets.slice(0, 2)} />
            <DeliveryStatusCard deliveries={orders.slice(0, 2)} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
