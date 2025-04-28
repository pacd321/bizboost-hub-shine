import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext';
import CompetitorPricingPage from "./pages/CompetitorPricingPage";
import CustomersPage from "./pages/CustomersPage";
import DeliveryPage from "./pages/DeliveryPage";
import Index from "./pages/Index";
import InventoryPage from "./pages/InventoryPage";
import MarketInsightsPage from "./pages/MarketInsightsPage";
import MarketIntelPage from "./pages/MarketIntelPage";
import MarketplacePage from "./pages/MarketplacePage";
import NotFound from "./pages/NotFound";
import StorefrontPage from "./pages/StorefrontPage";
import SupportPage from "./pages/SupportPage";
import TransactionsPage from "./pages/TransactionsPage";
import WebsitePage from "./pages/WebsitePage";
import YourWebsitePage from "./pages/YourWebsitePage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
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
            <Route path="/market-insights" element={<MarketInsightsPage />} />
            <Route path="/competitor-pricing" element={<CompetitorPricingPage />} />
            <Route path="/delivery" element={<DeliveryPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/storefront" element={<StorefrontPage />} />
            <Route path="/your-website" element={<YourWebsitePage />} />
            <Route path="/website/*" element={<WebsitePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
