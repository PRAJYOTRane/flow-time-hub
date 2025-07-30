import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Calendar, FileSpreadsheet, FileText, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function Reports() {
  const [dateRange, setDateRange] = useState("this-month");
  const [selectedProject, setSelectedProject] = useState("all");

  const reportData = {
    totalHours: "156h 45m",
    billableHours: "134h 30m",
    totalTasks: 47,
    completedTasks: 35,
    averageDaily: "6h 15m",
    productivityScore: 87
  };

  const projectBreakdown = [
    { name: "Website Redesign", hours: "65h 30m", percentage: 42, tasks: 18 },
    { name: "Mobile App", hours: "48h 15m", percentage: 31, tasks: 14 },
    { name: "Backend", hours: "32h 45m", percentage: 21, tasks: 10 },
    { name: "Dashboard", hours: "10h 15m", percentage: 6, tasks: 5 }
  ];

  const teamPerformance = [
    { name: "John Doe", hours: "42h 30m", tasks: 12, efficiency: "94%" },
    { name: "Jane Smith", hours: "38h 45m", tasks: 10, efficiency: "89%" },
    { name: "Mike Johnson", hours: "35h 20m", tasks: 8, efficiency: "91%" },
    { name: "Sarah Wilson", hours: "40h 10m", tasks: 17, efficiency: "96%" }
  ];

  const exportFormats = [
    { format: "CSV", icon: FileSpreadsheet, description: "Spreadsheet format" },
    { format: "PDF", icon: FileText, description: "Document format" },
    { format: "Excel", icon: FileSpreadsheet, description: "Excel workbook" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Analyze your productivity and generate insights</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Customize your report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Project</Label>
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  <SelectItem value="website">Website Redesign</SelectItem>
                  <SelectItem value="mobile">Mobile App</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>From Date</Label>
              <Input type="date" />
            </div>
            
            <div className="space-y-2">
              <Label>To Date</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.totalHours}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+12%</span> from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.billableHours}</div>
            <p className="text-xs text-muted-foreground">
              86% billable ratio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reportData.completedTasks}/{reportData.totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              74% completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Project Breakdown</CardTitle>
            <CardDescription>Time distribution across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectBreakdown.map((project, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-sm text-muted-foreground">{project.hours}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${project.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{project.tasks} tasks</span>
                    <span>{project.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Individual productivity metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.tasks} tasks completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{member.hours}</p>
                    <p className="text-sm text-success">{member.efficiency} efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Report</CardTitle>
          <CardDescription>Download your report in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exportFormats.map((format, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <format.icon className="h-8 w-8 text-primary" />
                  <div>
                    <h4 className="font-medium">{format.format}</h4>
                    <p className="text-sm text-muted-foreground">{format.description}</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export {format.format}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}