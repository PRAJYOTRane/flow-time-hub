import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTasks, useCreateTask, type Task } from "@/hooks/useTasks";
import { useProjects } from "@/hooks/useProjects";
import { toast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  Filter, 
  Clock,
  Calendar,
  User,
  Loader2
} from "lucide-react";

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Database hooks
  const { data: tasks, isLoading: tasksLoading, error: tasksError } = useTasks();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const createTaskMutation = useCreateTask();

  // Form state for new task
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    project_id: "",
    priority: "medium" as "low" | "medium" | "high",
    status: "todo" as "todo" | "in-progress" | "completed",
    due_date: "",
    estimated_hours: ""
  });

  // Listen for sidebar new task event
  useEffect(() => {
    const handleOpenNewTaskDialog = () => {
      setIsCreateDialogOpen(true);
    };

    window.addEventListener('openNewTaskDialog', handleOpenNewTaskDialog);
    return () => {
      window.removeEventListener('openNewTaskDialog', handleOpenNewTaskDialog);
    };
  }, []);

  // Handle create task
  const handleCreateTask = async () => {
    if (!newTask.title.trim() || !newTask.project_id) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createTaskMutation.mutateAsync({
        title: newTask.title,
        description: newTask.description || null,
        project_id: newTask.project_id,
        priority: newTask.priority,
        status: newTask.status,
        due_date: newTask.due_date || null,
        estimated_hours: newTask.estimated_hours ? parseFloat(newTask.estimated_hours) : null,
      });

      toast({
        title: "Success",
        description: "Task created successfully",
      });

      // Reset form
      setNewTask({
        title: "",
        description: "",
        project_id: "",
        priority: "medium",
        status: "todo",
        due_date: "",
        estimated_hours: ""
      });
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  };

  // Loading and error states
  if (tasksLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (tasksError) {
    return (
      <div className="text-center text-red-500">
        Error loading tasks: {tasksError.message}
      </div>
    );
  }

  // Filter tasks
  const filteredTasks = (tasks || []).filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProject = selectedProject === "all" || task.project_id === selectedProject;
    return matchesSearch && matchesProject;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500 text-white";
      case "medium": return "bg-yellow-500 text-white";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500 text-white";
      case "in-progress": return "bg-blue-500 text-white";
      case "todo": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Task title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Task description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Project *</Label>
                <Select value={newTask.project_id} onValueChange={(value) => setNewTask({ ...newTask, project_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects?.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newTask.status} onValueChange={(value: any) => setNewTask({ ...newTask, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="estimatedHours">Estimated Hours</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    value={newTask.estimated_hours}
                    onChange={(e) => setNewTask({ ...newTask, estimated_hours: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask} disabled={createTaskMutation.isPending}>
                {createTaskMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[200px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Projects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            {projects?.map((project) => (
              <SelectItem key={project.id} value={project.id}>
                {project.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">No tasks found</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first task
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    {task.description && (
                      <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status.replace("-", " ")}
                    </Badge>
                    {task.project?.name && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {task.project.name}
                      </div>
                    )}
                    {task.due_date && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(task.due_date).toLocaleDateString()}
                      </div>
                    )}
                    {task.estimated_hours && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {task.estimated_hours}h estimated
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
