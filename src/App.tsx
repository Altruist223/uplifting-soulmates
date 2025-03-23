
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { AuthProvider } from "./contexts/AuthContext";

import Index from "./pages/Index";
import Breathe from "./pages/Breathe";
import Mood from "./pages/Mood";
import JournalPage from "./pages/JournalPage";
import ResourcesPage from "./pages/ResourcesPage";
import WellnessQuiz from "./pages/WellnessQuiz";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/breathe" element={<Breathe />} />
              <Route path="/mood" element={<Mood />} />
              <Route path="/journal" element={<JournalPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/wellness-quiz" element={<WellnessQuiz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </MotionConfig>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
