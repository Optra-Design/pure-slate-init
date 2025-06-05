
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Lab from "./pages/Lab";
import Pulse from "./pages/Pulse";
import Founder from "./pages/Founder";
import Blog from "./pages/Blog";
import Test404 from "./pages/Test404";
import Minigames from "./pages/Minigames";
import BackgroundParticles from "./components/BackgroundParticles";
import EnhancedOptraBot from "./components/EnhancedOptraBot";
import SudoMode from "./components/SudoMode";
import DynamicGradients from "./components/DynamicGradients";
import EasterEggs from "./components/EasterEggs";
import FloatingElements from "./components/FloatingElements";
import MetaverseHUD from "./components/MetaverseHUD";
import ParallaxBackground from "./components/ParallaxBackground";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="relative min-h-screen bg-background overflow-hidden">
            <ParallaxBackground />
            <DynamicGradients />
            <BackgroundParticles />
            <FloatingElements />
            <MetaverseHUD />
            <EasterEggs />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/lab" element={<Lab />} />
              <Route path="/pulse" element={<Pulse />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/minigames" element={<Minigames />} />
              <Route path="/test-404" element={<Test404 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <EnhancedOptraBot />
            <SudoMode />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
