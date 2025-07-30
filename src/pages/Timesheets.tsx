import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Play, 
  Pause, 
  Square,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { format } from "date-fns";

interface TimeEntry {
  id: string;
  date: string;
  task: string;
  project: string;
  startTime: string;
  endTime: string;
  duration: string;
  description: string;
  status: "completed" | "running" | "paused";
}

export default function Timesheets() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week">("week");
  const [isRunning, setIsRunning] = useState(false);
  const [currentSession, setCurrentSession] = useState("00:00:00");

  const timeEntries: TimeEntry[] = [
    {
      id: "1",
      date: "2024-01-15",
      task: "Design mockups",
      project: "Website Redesign",
      startTime: "09:00",
      endTime: "11:30",
      duration: "2h 30m",
      description: "Created landing page wireframes",
      status: "completed"
    },
    {
      id: "2",
      date: "2024-01-15",
      task: "Code review",
      project: "Mobile App",
      startTime: "14:00",
      endTime: "15:45",
      duration: "1h 45m",
      description: "Reviewed authentication module",
      status: "completed"
    },
    {
      id: "3",
      date: "2024-01-16",
      task: "API implementation",
      project: "Backend",
      startTime: "10:00",
      endTime: "12:30",
      duration: "2h 30m",
      description: "Implemented user endpoints",
      status: "completed"
    },
    {
      id: "4",
      date: "2024-01-16",
      task: "Testing",
      project: "Mobile App",
      startTime: "15:30",
      endTime: "",
      duration: "1h 15m",
      description: "Running integration tests",
      status: "running"
    }
  ];

  const weeklyStats = {
    totalHours: "32h 45m",
    billableHours: "28h 30m",
    overtime: "2h 45m",
    avgDaily: "6h 33m"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "running": return "bg-info text-info-foreground";
      case "paused": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Timesheets</h1>
          <p className="text-muted-foreground">Track and manage your time entries</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Select value={viewMode} onValueChange={(value: "day" | "week") => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day View</SelectItem>
              <SelectItem value="week">Week View</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Timer */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Current Session</h3>
              <div className="text-3xl font-mono font-bold text-primary mb-1">{currentSession}</div>
              <p className="text-sm text-muted-foreground">Testing - Mobile App</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="lg"
                variant={isRunning ? "destructive" : "default"}
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 mr-2" />
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

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.totalHours}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.billableHours}</div>
            <p className="text-xs text-muted-foreground">87% billable</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.overtime}</div>
            <p className="text-xs text-muted-foreground">Above 40h/week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyStats.avgDaily}</div>
            <p className="text-xs text-muted-foreground">Per working day</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {viewMode === "week" ? "Week View" : "Day View"} - {format(selectedDate, "MMMM yyyy")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {format(selectedDate, "MMM dd, yyyy")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <Button variant="outline" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {timeEntries.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{entry.task}</h4>
                    <Badge variant="outline">{entry.project}</Badge>
                    <Badge className={getStatusColor(entry.status)}>
                      {entry.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{entry.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{entry.startTime} - {entry.endTime || "Running"}</span>
                    <span>{format(new Date(entry.date), "MMM dd, yyyy")}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold">{entry.duration}</div>
                  {entry.status === "running" && (
                    <div className="flex gap-1 mt-2">
                      <Button size="sm" variant="outline">
                        <Pause className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Square className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}