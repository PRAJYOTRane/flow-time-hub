import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Send, BarChart3, Clock, Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  dataVisualization?: any;
}

// Analytics Data Structure
interface AnalyticsData {
  projectStats: {
    totalProjects: number;
    completedProjects: number;
    onTrackProjects: number;
    delayedProjects: number;
  };
  timeTracking: {
    totalHours: string;
    billableHours: string;
    averageDaily: string;
    productivityScore: number;
  };
  taskMetrics: {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    completionRate: number;
  };
  teamPerformance: Array<{
    name: string;
    hours: string;
    tasks: number;
    efficiency: string;
  }>;
  projectBreakdown: Array<{
    name: string;
    hours: string;
    percentage: number;
    tasks: number;
    progress: number;
    status: 'on-track' | 'delayed' | 'completed';
  }>;
}

export default function ACE() {
  // Mock Analytics Data - In production, this would come from your database
  const analyticsData: AnalyticsData = {
    projectStats: {
      totalProjects: 4,
      completedProjects: 1,
      onTrackProjects: 2,
      delayedProjects: 1
    },
    timeTracking: {
      totalHours: "156h 45m",
      billableHours: "134h 30m",
      averageDaily: "6h 15m",
      productivityScore: 87
    },
    taskMetrics: {
      totalTasks: 47,
      completedTasks: 35,
      overdueTasks: 5,
      completionRate: 74
    },
    teamPerformance: [
      { name: "John Doe", hours: "42h 30m", tasks: 12, efficiency: "94%" },
      { name: "Jane Smith", hours: "38h 45m", tasks: 10, efficiency: "89%" },
      { name: "Mike Johnson", hours: "35h 20m", tasks: 8, efficiency: "91%" },
      { name: "Sarah Wilson", hours: "40h 10m", tasks: 17, efficiency: "96%" }
    ],
    projectBreakdown: [
      { name: "Website Redesign", hours: "65h 30m", percentage: 42, tasks: 18, progress: 75, status: "on-track" },
      { name: "Mobile App", hours: "48h 15m", percentage: 31, tasks: 14, progress: 60, status: "delayed" },
      { name: "Backend Development", hours: "32h 45m", percentage: 21, tasks: 10, progress: 90, status: "on-track" },
      { name: "Dashboard", hours: "10h 15m", percentage: 6, tasks: 5, progress: 100, status: "completed" }
    ]
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm ACE, your AI Analytics Assistant. I have access to your complete project data including:
      
• ${analyticsData.projectStats.totalProjects} active projects
• ${analyticsData.timeTracking.totalHours} tracked this month
• ${analyticsData.taskMetrics.completedTasks}/${analyticsData.taskMetrics.totalTasks} tasks completed
• Team productivity score: ${analyticsData.timeTracking.productivityScore}%

Ask me anything about your projects, team performance, time allocation, or productivity insights!`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'Which projects are behind schedule?',
    'Show me team productivity analysis',
    'What\'s our time allocation breakdown?',
    'Identify bottlenecks and risks',
    'Compare team member performance',
    'Generate project status report',
    'Show productivity trends',
    'Which tasks are taking too long?'
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput('');
  };

  const generateAIResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    // Project Status Analysis
    if (q.includes('behind') || q.includes('schedule') || q.includes('delayed')) {
      const delayedProjects = analyticsData.projectBreakdown.filter(p => p.status === 'delayed');
      return `📊 **Project Status Analysis**

**Projects Behind Schedule:**
${delayedProjects.map(p => `• ${p.name} - ${p.progress}% complete (${p.hours} logged)`).join('\n')}

**Key Insights:**
• ${analyticsData.projectStats.delayedProjects} out of ${analyticsData.projectStats.totalProjects} projects are delayed
• Mobile App project needs immediate attention (only 60% complete)
• Consider reallocating resources from completed projects

**Recommendations:**
• Focus sprint planning on delayed deliverables
• Review scope and timeline for Mobile App project
• Consider additional resources for critical path items`;
    }

    // Team Performance Analysis
    if (q.includes('team') || q.includes('performance') || q.includes('productivity')) {
      const topPerformer = analyticsData.teamPerformance.reduce((prev, current) => 
        (parseInt(prev.efficiency) > parseInt(current.efficiency)) ? prev : current
      );
      const avgEfficiency = analyticsData.teamPerformance.reduce((sum, member) => 
        sum + parseInt(member.efficiency), 0) / analyticsData.teamPerformance.length;
      
      return `👥 **Team Performance Analysis**

**Top Performer:** ${topPerformer.name} (${topPerformer.efficiency} efficiency)
**Team Average Efficiency:** ${avgEfficiency.toFixed(1)}%

**Individual Breakdown:**
${analyticsData.teamPerformance.map(member => 
  `• ${member.name}: ${member.tasks} tasks, ${member.hours}, ${member.efficiency} efficiency`
).join('\n')}

**Insights:**
• Team is performing above 90% efficiency average
• Sarah Wilson leading with highest task completion
• All team members are meeting productivity targets

**Recommendations:**
• Share Sarah's best practices with the team
• Consider promoting high performers to mentor roles`;
    }

    // Time Allocation Analysis
    if (q.includes('time') || q.includes('allocation') || q.includes('breakdown')) {
      return `⏱️ **Time Allocation Analysis**

**Project Time Distribution:**
${analyticsData.projectBreakdown.map(p => 
  `• ${p.name}: ${p.hours} (${p.percentage}% of total time)`
).join('\n')}

**Key Metrics:**
• Total tracked: ${analyticsData.timeTracking.totalHours}
• Billable hours: ${analyticsData.timeTracking.billableHours} (86% billable ratio)
• Daily average: ${analyticsData.timeTracking.averageDaily}

**Analysis:**
• Website Redesign consuming 42% of resources (appropriate for scope)
• Backend Development highly efficient (21% time, 90% complete)
• Mobile App showing inefficiency (31% time, only 60% complete)

**Optimization Suggestions:**
• Review Mobile App development process
• Consider knowledge transfer from Backend team`;
    }

    // Bottlenecks and Risks
    if (q.includes('bottleneck') || q.includes('risk') || q.includes('problem')) {
      return `⚠️ **Risk & Bottleneck Analysis**

**Critical Issues Identified:**
• ${analyticsData.taskMetrics.overdueTasks} overdue tasks requiring immediate attention
• Mobile App project 2 weeks behind schedule
• ${Math.round((1 - analyticsData.taskMetrics.completionRate/100) * 100)}% of tasks incomplete

**Resource Bottlenecks:**
• Mobile development team potentially understaffed
• Code review process may be causing delays
• Testing phase taking longer than estimated

**Risk Mitigation:**
• Prioritize overdue tasks completion
• Consider hiring additional mobile developers
• Implement parallel testing processes
• Daily standups for at-risk projects`;
    }

    // Project Status Report
    if (q.includes('report') || q.includes('status') || q.includes('overview')) {
      return `📈 **Comprehensive Project Status Report**

**Overall Health:** ${analyticsData.timeTracking.productivityScore}% Productivity Score

**Project Summary:**
${analyticsData.projectBreakdown.map(p => {
  const statusEmoji = p.status === 'completed' ? '✅' : p.status === 'on-track' ? '🟢' : '🔴';
  return `${statusEmoji} ${p.name}: ${p.progress}% complete, ${p.hours} logged`;
}).join('\n')}

**Team Metrics:**
• Total tasks: ${analyticsData.taskMetrics.totalTasks}
• Completed: ${analyticsData.taskMetrics.completedTasks} (${analyticsData.taskMetrics.completionRate}%)
• Team size: ${analyticsData.teamPerformance.length} members

**Time Tracking:**
• This month: ${analyticsData.timeTracking.totalHours}
• Billable: ${analyticsData.timeTracking.billableHours}
• Daily avg: ${analyticsData.timeTracking.averageDaily}

**Next Actions:**
• Address Mobile App project delays
• Review resource allocation
• Celebrate Backend Development completion`;
    }

    // Default intelligent response
    return `🤖 **AI Analysis Complete**

I've analyzed your question against our current project data. Here's what I found:

**Current Status:**
• ${analyticsData.projectStats.totalProjects} active projects (${analyticsData.projectStats.onTrackProjects} on track, ${analyticsData.projectStats.delayedProjects} delayed)
• ${analyticsData.timeTracking.productivityScore}% team productivity score
• ${analyticsData.taskMetrics.completionRate}% task completion rate

Would you like me to dive deeper into any specific area? I can provide detailed analysis on:
• Project timelines and risks
• Team performance metrics
• Resource allocation optimization
• Productivity trends and forecasting`;
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">ACE - AI Assistant</h1>
            <p className="text-muted-foreground">Get intelligent insights from your project data</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask ACE about your projects, team performance, or time tracking..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Insights */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-3"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <div className="text-sm">{question}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data-Driven Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full ${analyticsData.timeTracking.productivityScore >= 85 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    <TrendingUp className="w-3 h-3 text-white m-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Productivity: {analyticsData.timeTracking.productivityScore}%</p>
                    <p className="text-xs text-muted-foreground">Team performing {analyticsData.timeTracking.productivityScore >= 85 ? 'excellently' : 'well'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full ${analyticsData.taskMetrics.completionRate >= 70 ? 'bg-green-500' : 'bg-red-500'}`}>
                    <CheckCircle className="w-3 h-3 text-white m-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Task Completion: {analyticsData.taskMetrics.completionRate}%</p>
                    <p className="text-xs text-muted-foreground">{analyticsData.taskMetrics.completedTasks}/{analyticsData.taskMetrics.totalTasks} tasks done</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500">
                    <Clock className="w-3 h-3 text-white m-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time Tracked: {analyticsData.timeTracking.totalHours}</p>
                    <p className="text-xs text-muted-foreground">86% billable ratio</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full ${analyticsData.projectStats.delayedProjects === 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                    <AlertTriangle className="w-3 h-3 text-white m-1" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{analyticsData.projectStats.delayedProjects} Projects at Risk</p>
                    <p className="text-xs text-muted-foreground">{analyticsData.taskMetrics.overdueTasks} overdue tasks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Health Status */}
          <Card>
            <CardHeader>
              <CardTitle>Project Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.projectBreakdown.map((project, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{project.name}</span>
                      <Badge variant={project.status === 'completed' ? 'default' : project.status === 'on-track' ? 'secondary' : 'destructive'}>
                        {project.status === 'completed' ? '✅' : project.status === 'on-track' ? '🟢' : '🔴'}
                      </Badge>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{project.progress}% complete</span>
                      <span>{project.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>• Real-time project health monitoring</p>
                <p>• Team performance analytics & benchmarking</p>
                <p>• Resource allocation optimization</p>
                <p>• Risk assessment & bottleneck identification</p>
                <p>• Predictive deadline analysis</p>
                <p>• Custom KPI tracking & reporting</p>
                <p>• Time tracking pattern analysis</p>
                <p>• Automated productivity insights</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
