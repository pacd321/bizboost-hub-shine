
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import InventoryPage from "./pages/InventoryPage";
import SupportPage from "./pages/SupportPage";
import CustomersPage from "./pages/CustomersPage";
import MarketIntelPage from "./pages/MarketIntelPage";
import DeliveryPage from "./pages/DeliveryPage";
import TransactionsPage from "./pages/TransactionsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/market-intel" element={<MarketIntelPage />} />
          <Route path="/delivery" element={<DeliveryPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
