import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Pause, Square, Download, Plus, TrendingUp, Users, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");

  const stats = [
    {
      title: "Today's Time",
      value: "6h 32m",
      icon: Clock,
      trend: "+12%",
      description: "vs yesterday"
    },
    {
      title: "This Week",
      value: "28h 15m",
      icon: TrendingUp,
      trend: "+8%",
      description: "vs last week"
    },
    {
      title: "Active Tasks",
      value: "12",
      icon: CheckCircle,
      trend: "3 due today",
      description: "remaining tasks"
    },
    {
      title: "Team Members",
      value: "8",
      icon: Users,
      trend: "2 online",
      description: "team status"
    }
  ];

  const recentTasks = [
    { id: 1, name: "Design landing page", project: "Website Redesign", time: "2h 30m", status: "in-progress" },
    { id: 2, name: "API integration", project: "Mobile App", time: "1h 45m", status: "completed" },
    { id: 3, name: "User testing", project: "Dashboard", time: "3h 15m", status: "paused" },
    { id: 4, name: "Bug fixes", project: "Backend", time: "45m", status: "in-progress" },
  ];

  const projects = [
    { name: "Website Redesign", progress: 75, timeSpent: "45h 30m", deadline: "2 days" },
    { name: "Mobile App", progress: 60, timeSpent: "32h 15m", deadline: "1 week" },
    { name: "Dashboard", progress: 40, timeSpent: "18h 45m", deadline: "3 days" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your productivity overview.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Timer Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Session</h3>
              <div className="text-3xl font-mono font-bold text-primary">{currentTime}</div>
              <p className="text-sm text-muted-foreground mt-1">Working on: Design System Updates</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="lg"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="gap-2"
              >
                {isTimerRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Start
                  </>
                )}
              </Button>
              <Button size="lg" variant="outline">
                <Square className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success font-medium">{stat.trend}</span> {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest activity and time tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="font-medium">{task.name}</p>
                    <p className="text-sm text-muted-foreground">{task.project}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{task.time}</p>
                    <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                      task.status === 'completed' ? 'bg-success/10 text-success' :
                      task.status === 'in-progress' ? 'bg-info/10 text-info' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {task.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
            <CardDescription>Overview of your current projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{project.name}</p>
                    <span className="text-sm text-muted-foreground">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Time: {project.timeSpent}</span>
                    <span>Due in {project.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}