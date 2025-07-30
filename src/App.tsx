import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { MainLayout } from "./components/layout/MainLayout";
import { AIAssistant } from "./components/AIAssistant";
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Timer from "./pages/Timer";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import ACE from "./pages/ACE";
import Reports from "./pages/Reports";
import Workspace from "./pages/Workspace";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Timesheets from "./pages/Timesheets";
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
            {/* Landing Page */}
            <Route path="/" element={<Landing />} />
            
            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Main Application Routes */}
            <Route path="/dashboard" element={
              <MainLayout>
                <Dashboard />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Timer with subpages */}
            <Route path="/timer" element={
              <MainLayout>
                <Timer />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Projects */}
            <Route path="/projects" element={
              <MainLayout>
                <Projects />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Tasks */}
            <Route path="/tasks" element={
              <MainLayout>
                <Tasks />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* ACE AI Assistant */}
            <Route path="/ace" element={
              <MainLayout>
                <ACE />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Reports */}
            <Route path="/reports" element={
              <MainLayout>
                <Reports />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Workspace */}
            <Route path="/workspace" element={
              <MainLayout>
                <Workspace />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Profile */}
            <Route path="/profile" element={
              <MainLayout>
                <Profile />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Notifications */}
            <Route path="/notifications" element={
              <MainLayout>
                <Notifications />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* Legacy routes - keeping for backward compatibility */}
            <Route path="/timesheets" element={
              <MainLayout>
                <Timesheets />
                <AIAssistant />
              </MainLayout>
            } />
            <Route path="/settings" element={
              <MainLayout>
                <Settings />
                <AIAssistant />
              </MainLayout>
            } />
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
