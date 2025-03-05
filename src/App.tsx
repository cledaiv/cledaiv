
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Browse from "./pages/Browse";
import FreelancerDetail from "./pages/FreelancerDetail";
import HowItWorksPage from "./pages/HowItWorks";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import ChatBot from "./pages/ChatBot";
import BlockchainAPI from "./pages/BlockchainAPI";
import Payment from "./pages/Payment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectView from "./pages/ProjectView";
import Profile from "./pages/Profile";
import CookieConsent from "./components/common/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/freelancers/:id" element={<FreelancerDetail />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/chatbot" element={<ChatBot />} />
            <Route path="/blockchain-api" element={<BlockchainAPI />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<NewProject />} />
            <Route path="/projects/:id" element={<ProjectView />} />
            <Route path="/profile" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
