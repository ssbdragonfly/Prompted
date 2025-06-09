import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { About } from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import { useEffect } from "react";
import DifficultySelection from "./pages/DifficultySelection";
import GamePage from "./pages/GamePage";
import DailyChallenge from "./pages/DailyChallenge";
import NewsPage from "./pages/NewsPage";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";

const queryClient = new QueryClient();


const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/play" element={<GamePage />} />
                <Route path="/game" element={<DifficultySelection />} />
                <Route path="/daily" element={<DailyChallenge />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/learn" element={<LearnPage />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
