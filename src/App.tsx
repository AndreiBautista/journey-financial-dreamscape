
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import { useIsMobile } from "./hooks/use-mobile";
import Phase1 from "./pages/Phase1";
import Phase2 from "./pages/Phase2";
import Phase3 from "./pages/Phase3";
import Calculator from "./pages/Calculator";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex">
            <Sidebar isMobile={isMobile} />
            <div className={`flex-1 transition-all duration-300 ${!isMobile ? "ml-64" : ""}`}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/phase1" element={<Phase1 />} />
                <Route path="/phase2" element={<Phase2 />} />
                <Route path="/phase3" element={<Phase3 />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
