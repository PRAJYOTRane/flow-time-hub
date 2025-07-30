import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useProjects, useCreateProject } from "@/hooks/useProjects";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Clock,
  MoreHorizontal,
  FolderOpen,
  Target,
  TrendingUp,
  Loader2
} from "lucide-react";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    status: "planning" | "active" | "on-hold" | "completed";
    priority: "low" | "medium" | "high";
    start_date: string;
    end_date: string;
    budget: string;
  }>({
    name: "",
    description: "",
    status: "planning",
    priority: "medium",
    start_date: "",
    end_date: "",
    budget: "",
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const { data: projects, isLoading, error } = useProjects();
  const createProject = useCreateProject();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error loading projects: {error.message}
      </div>
    );
  }

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "planning": return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "on-hold": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "completed": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create projects",
        variant: "destructive",
      });
      return;
    }

    try {
      await createProject.mutateAsync({
        ...newProject,
        created_by: user.id,
      });
      
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      
      setIsCreateDialogOpen(false);
      setNewProject({
        name: "",
        description: "",
        status: "planning",
        priority: "medium",
        start_date: "",
        end_date: "",
        budget: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    }
  };

  const projectStats = {
    total: projects?.length || 0,
    active: projects?.filter(p => p.status === "active").length || 0,
    completed: projects?.filter(p => p.status === "completed").length || 0,
    onTrack: projects?.filter(p => p.progress >= 50 && p.status === "active").length || 0
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your projects, track progress, and coordinate teams</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input 
                    id="projectName" 
                    placeholder="Enter project name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={newProject.priority} 
                    onValueChange={(value: "low" | "medium" | "high") => 
                      setNewProject({...newProject, priority: value})
                    }
                  >
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Project description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={newProject.status} 
                    onValueChange={(value: "planning" | "active" | "on-hold" | "completed") => 
                      setNewProject({...newProject, status: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={newProject.start_date}
                    onChange={(e) => setNewProject({...newProject, start_date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={newProject.end_date}
                    onChange={(e) => setNewProject({...newProject, end_date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input 
                  id="budget" 
                  placeholder="e.g., $50,000"
                  value={newProject.budget}
                  onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createProject.isPending}>
                  {createProject.isPending ? "Creating..." : "Create Project"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.active}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.completed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Track</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.onTrack}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(project.priority)}>
                  {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                {project.start_date && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(project.start_date).toLocaleDateString()}</span>
                  </div>
                )}
                {project.budget && (
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Budget:</span>
                    <span>{project.budget}</span>
                  </div>
                )}
              </div>
              
              {project.project_members && project.project_members.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.project_members.slice(0, 3).map((member, index) => (
                      <Avatar key={index} className="h-6 w-6 border-2 border-background">
                        <AvatarImage src={member.profiles?.avatar_url} />
                        <AvatarFallback className="text-xs">
                          {member.profiles?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.project_members.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                        +{project.project_members.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search or filters" 
              : "Create your first project to get started"}
          </p>
        </div>
      )}
    </div>
  );
}
