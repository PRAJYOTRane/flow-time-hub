import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MainLayout } from "./components/layout/MainLayout";
import { AIAssistant } from "./components/AIAssistant";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Timesheets from "./pages/Timesheets";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <MainLayout>
                <Dashboard />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="/projects" element={
              <MainLayout>
                <Projects />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="/tasks" element={
              <MainLayout>
                <Tasks />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="/timesheets" element={
              <MainLayout>
                <Timesheets />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="/reports" element={
              <MainLayout>
                <Reports />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="/settings" element={
              <MainLayout>
                <Settings />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
