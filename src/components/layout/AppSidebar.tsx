import { 
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  BarChart3, 
  Settings, 
  Plus,
  Brain,
  FolderOpen,
  Timer,
  Building2,
  User,
  Bell
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Timer", url: "/timer", icon: Timer },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "ACE", url: "/ace", icon: Brain },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Workspace", url: "/workspace", icon: Building2 },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Notifications", url: "/notifications", icon: Bell },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium" 
      : "hover:bg-accent hover:text-accent-foreground";

  const handleNewTask = () => {
    navigate("/tasks");
    // Add a slight delay to ensure page loads, then trigger new task dialog
    setTimeout(() => {
      const event = new CustomEvent('openNewTaskDialog');
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="pt-4">
        {/* Logo/Brand */}
        <div className="px-4 mb-6">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">TaskFlow</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <Clock className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-4 mb-6">
          <Button 
            className="w-full justify-start gap-2" 
            size={collapsed ? "icon" : "default"}
            onClick={handleNewTask}
          >
            <Plus className="w-4 h-4" />
            {!collapsed && "New Task"}
          </Button>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* AI Assistant */}
        <div className="mt-auto p-4">
          <NavLink to="/ace" className="block">
            <div className={`p-3 rounded-lg bg-accent hover:bg-accent/80 transition-colors ${collapsed ? 'text-center' : ''}`}>
              <Brain className={`w-5 h-5 text-primary ${collapsed ? 'mx-auto' : 'mb-2'}`} />
              {!collapsed && (
                <>
                  <p className="text-sm font-medium">ACE Assistant</p>
                  <p className="text-xs text-muted-foreground">AI-powered insights</p>
                </>
              )}
            </div>
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}