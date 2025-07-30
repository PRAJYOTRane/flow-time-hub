import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, List, FileText, Play, Pause, Square } from "lucide-react";

export default function Timer() {
  const [activeTimer, setActiveTimer] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("00:00:00");

  const handleStartTimer = (taskId: string) => {
    setActiveTimer(taskId);
    // Timer logic would go here
  };

  const handlePauseTimer = () => {
    setActiveTimer(null);
    // Pause logic would go here
  };

  const handleStopTimer = () => {
    setActiveTimer(null);
    setCurrentTime("00:00:00");
    // Stop and save logic would go here
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Timer</h1>
          <p className="text-muted-foreground">Track your time across different views</p>
        </div>
      </div>

      <Tabs defaultValue="calendar" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            List View
          </TabsTrigger>
          <TabsTrigger value="timesheet" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Timesheet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar">
          <CalendarView 
            activeTimer={activeTimer}
            currentTime={currentTime}
            onStartTimer={handleStartTimer}
            onPauseTimer={handlePauseTimer}
            onStopTimer={handleStopTimer}
          />
        </TabsContent>

        <TabsContent value="list">
          <ListView 
            activeTimer={activeTimer}
            currentTime={currentTime}
            onStartTimer={handleStartTimer}
            onPauseTimer={handlePauseTimer}
            onStopTimer={handleStopTimer}
          />
        </TabsContent>

        <TabsContent value="timesheet">
          <TimesheetView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Calendar View Component
function CalendarView({ activeTimer, currentTime, onStartTimer, onPauseTimer, onStopTimer }: any) {
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Calendar View</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-8 gap-2">
          {/* Time column */}
          <div className="space-y-2">
            <div className="h-8"></div> {/* Header spacer */}
            {timeSlots.map((time) => (
              <div key={time} className="h-12 text-xs text-muted-foreground flex items-center">
                {time}
              </div>
            ))}
          </div>

          {/* Days columns */}
          {weekDays.map((day) => (
            <div key={day} className="space-y-2">
              <div className="h-8 font-medium text-center border-b pb-2">{day}</div>
              {timeSlots.map((time) => (
                <div key={`${day}-${time}`} className="h-12 border border-gray-200 rounded hover:bg-gray-50 cursor-pointer">
                  {/* Task slots would be rendered here */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// List View Component
function ListView({ activeTimer, currentTime, onStartTimer, onPauseTimer, onStopTimer }: any) {
  const mockTasks = [
    { id: '1', title: 'Design landing page', project: 'Website Redesign', timeSpent: '2h 30m' },
    { id: '2', title: 'Code authentication', project: 'Mobile App', timeSpent: '1h 45m' },
    { id: '3', title: 'Write documentation', project: 'API Project', timeSpent: '3h 15m' },
  ];

  return (
    <div className="space-y-4">
      {/* Active Timer Display */}
      {activeTimer && (
        <Card className="border-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Currently Tracking</h3>
                <p className="text-sm text-muted-foreground">Task: {mockTasks.find(t => t.id === activeTimer)?.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-mono">{currentTime}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={onPauseTimer}>
                    <Pause className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={onStopTimer}>
                    <Square className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Task Log</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <p className="text-sm text-muted-foreground">{task.project} • {task.timeSpent}</p>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => onStartTimer(task.id)}
                  disabled={activeTimer === task.id}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {activeTimer === task.id ? 'Running' : 'Start'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Timesheet View Component
function TimesheetView() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timesheet & Audit</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Timesheet Audit</h3>
          <p className="text-muted-foreground mb-4">
            View detailed time logs and audit trails for all activities
          </p>
          <Button>View Audit Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
