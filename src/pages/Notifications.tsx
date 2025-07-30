import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Mail, Users as TeamsIcon, Settings, ExternalLink, Clock } from "lucide-react";

export default function Notifications() {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    desktop: false,
    tasks: true,
    projects: true,
    mentions: true
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Manage your notifications and integrations</p>
        </div>
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="outlook" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Outlook
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-2">
            <TeamsIcon className="w-4 h-4" />
            Teams
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <NotificationsView 
            settings={notificationSettings}
            setSettings={setNotificationSettings}
          />
        </TabsContent>

        <TabsContent value="outlook">
          <OutlookView />
        </TabsContent>

        <TabsContent value="teams">
          <TeamsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationsView({ settings, setSettings }: any) {
  const mockNotifications = [
    {
      id: '1',
      type: 'task',
      title: 'Task deadline approaching',
      message: 'Design landing page mockups is due in 2 hours',
      timestamp: '5 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'project',
      title: 'Project status update',
      message: 'Website Redesign project moved to review phase',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'mention',
      title: 'You were mentioned',
      message: 'John Doe mentioned you in Mobile App Development',
      timestamp: '2 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'team',
      title: 'New team member',
      message: 'Sarah Wilson joined your organization',
      timestamp: '1 day ago',
      read: true,
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'task': return <Clock className="w-4 h-4" />;
      case 'project': return <Bell className="w-4 h-4" />;
      case 'mention': return <Mail className="w-4 h-4" />;
      case 'team': return <TeamsIcon className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Notifications List */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 border rounded-lg ${notification.read ? 'bg-muted/50' : 'bg-background'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-xs text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch 
                checked={settings.email}
                onCheckedChange={(checked) => setSettings({...settings, email: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch 
                checked={settings.push}
                onCheckedChange={(checked) => setSettings({...settings, push: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Desktop Notifications</p>
                <p className="text-xs text-muted-foreground">System desktop notifications</p>
              </div>
              <Switch 
                checked={settings.desktop}
                onCheckedChange={(checked) => setSettings({...settings, desktop: checked})}
              />
            </div>

            <hr />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Task Updates</p>
                <p className="text-xs text-muted-foreground">Deadlines and assignments</p>
              </div>
              <Switch 
                checked={settings.tasks}
                onCheckedChange={(checked) => setSettings({...settings, tasks: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Project Updates</p>
                <p className="text-xs text-muted-foreground">Status changes and milestones</p>
              </div>
              <Switch 
                checked={settings.projects}
                onCheckedChange={(checked) => setSettings({...settings, projects: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mentions</p>
                <p className="text-xs text-muted-foreground">When you're mentioned</p>
              </div>
              <Switch 
                checked={settings.mentions}
                onCheckedChange={(checked) => setSettings({...settings, mentions: checked})}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OutlookView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Microsoft Outlook Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            {!isConnected ? (
              <div className="space-y-4">
                <Mail className="w-16 h-16 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium">Connect your Outlook account</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Sync your tasks and deadlines with Outlook calendar, and receive notifications 
                  via email for important updates.
                </p>
                <Button onClick={() => setIsConnected(true)}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect Outlook
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium">Outlook Connected</h3>
                <p className="text-muted-foreground">
                  Your TaskFlow account is successfully connected to Outlook.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">✓ Calendar sync enabled</p>
                  <p className="text-sm">✓ Email notifications active</p>
                  <p className="text-sm">✓ Task reminders scheduled</p>
                </div>
                <Button variant="outline" onClick={() => setIsConnected(false)}>
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TeamsView() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TeamsIcon className="w-5 h-5" />
            Microsoft Teams Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            {!isConnected ? (
              <div className="space-y-4">
                <TeamsIcon className="w-16 h-16 text-muted-foreground mx-auto" />
                <h3 className="text-lg font-medium">Connect your Teams account</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Get TaskFlow notifications directly in Teams, share project updates, 
                  and collaborate seamlessly with your team.
                </p>
                <Button onClick={() => setIsConnected(true)}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect Teams
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <TeamsIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium">Teams Connected</h3>
                <p className="text-muted-foreground">
                  Your TaskFlow account is successfully connected to Microsoft Teams.
                </p>
                <div className="space-y-2">
                  <p className="text-sm">✓ Channel notifications enabled</p>
                  <p className="text-sm">✓ Bot integration active</p>
                  <p className="text-sm">✓ Project updates shared</p>
                </div>
                <Button variant="outline" onClick={() => setIsConnected(false)}>
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
