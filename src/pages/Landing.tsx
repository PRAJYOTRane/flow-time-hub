import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Clock, Users, BarChart3, Brain, Timer, Calendar } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Timer,
      title: "Time Tracking",
      description: "Track time with calendar, list view, and timesheet functionality"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage teams, assign tasks, and collaborate effectively"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Get insights with customizable reports and data visualization"
    },
    {
      icon: Brain,
      title: "AI Assistant (ACE)",
      description: "AI-powered analytics and intelligent project insights"
    },
    {
      icon: Calendar,
      title: "Project Management",
      description: "Organize projects, tasks, and deadlines in one place"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">TaskFlow</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/login")}
              className="text-gray-600 hover:text-gray-900"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Complete Time Management Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Track time, manage projects, collaborate with teams, and get AI-powered insights 
            all in one comprehensive platform designed for modern workplaces.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-3"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="text-lg px-8 py-3"
            >
              Sign In
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 TaskFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
