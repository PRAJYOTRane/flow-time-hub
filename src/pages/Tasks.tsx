import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Play, 
  Pause, 
  MoreHorizontal, 
  Clock,
  Calendar,
  User,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  project: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  assignee: string;
  dueDate: string;
  timeSpent: string;
  isRunning: boolean;
  subtasks?: Task[];
  isExpanded?: boolean;
}

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Design landing page mockups",
      description: "Create wireframes and high-fidelity mockups for the new landing page",
      project: "Website Redesign",
      priority: "high",
      status: "in-progress",
      assignee: "John Doe",
      dueDate: "2024-01-15",
      timeSpent: "3h 45m",
      isRunning: true,
      subtasks: [
        {
          id: "1-1",
          title: "Create wireframes",
          description: "Basic layout wireframes",
          project: "Website Redesign",
          priority: "medium",
          status: "completed",
          assignee: "John Doe",
          dueDate: "2024-01-12",
          timeSpent: "1h 30m",
          isRunning: false
        },
        {
          id: "1-2",
          title: "Design high-fidelity mockups",
          description: "Detailed visual designs",
          project: "Website Redesign",
          priority: "high",
          status: "in-progress",
          assignee: "John Doe",
          dueDate: "2024-01-15",
          timeSpent: "2h 15m",
          isRunning: false
        }
      ],
      isExpanded: true
    },
    {
      id: "2",
      title: "Implement user authentication",
      description: "Set up login, registration, and password reset functionality",
      project: "Mobile App",
      priority: "high",
      status: "todo",
      assignee: "Jane Smith",
      dueDate: "2024-01-20",
      timeSpent: "0h 0m",
      isRunning: false,
      subtasks: [
        {
          id: "2-1",
          title: "Setup authentication middleware",
          description: "Configure JWT authentication",
          project: "Mobile App",
          priority: "high",
          status: "todo",
          assignee: "Jane Smith",
          dueDate: "2024-01-18",
          timeSpent: "0h 0m",
          isRunning: false
        }
      ],
      isExpanded: false
    },
    {
      id: "3",
      title: "Write API documentation",
      description: "Document all API endpoints and examples",
      project: "Backend",
      priority: "medium",
      status: "completed",
      assignee: "Mike Johnson",
      dueDate: "2024-01-10",
      timeSpent: "4h 20m",
      isRunning: false
    }
  ]);

  const toggleTaskTimer = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isRunning: !task.isRunning }
        : { ...task, isRunning: false }
    ));
  };

  const toggleTaskExpansion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isExpanded: !task.isExpanded }
        : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-info text-info-foreground";
      case "todo": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const TaskCard = ({ task, isSubtask = false }: { task: Task; isSubtask?: boolean }) => (
    <Card className={`${isSubtask ? 'ml-8 border-l-4 border-l-muted' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {task.subtasks && task.subtasks.length > 0 && !isSubtask && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => toggleTaskExpansion(task.id)}
              >
                {task.isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Badge className={getStatusColor(task.status)}>
              {task.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{task.description}</p>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {task.assignee}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {task.timeSpent}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{task.project}</span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={task.isRunning ? "destructive" : "default"}
              onClick={() => toggleTaskTimer(task.id)}
            >
              {task.isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Start
                </>
              )}
            </Button>
            <Button size="sm" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === "all" || task.project === selectedProject;
    return matchesSearch && matchesProject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks and projects</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" placeholder="Enter task title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project">Project</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website Redesign</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter task description" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign to" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)}>
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="Website Redesign">Website Redesign</SelectItem>
            <SelectItem value="Mobile App">Mobile App</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id}>
            <TaskCard task={task} />
            {task.isExpanded && task.subtasks && (
              <div className="mt-2 space-y-2">
                {task.subtasks.map((subtask) => (
                  <TaskCard key={subtask.id} task={subtask} isSubtask />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}