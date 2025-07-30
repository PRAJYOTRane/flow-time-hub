import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Clock, 
  Users, 
  Download,
  Trash2,
  Plus
} from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Change Avatar</Button>
                  <p className="text-sm text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@company.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="project-manager">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="project-manager">Project Manager</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="designer">Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-5">EST (UTC-5)</SelectItem>
                      <SelectItem value="utc-8">PST (UTC-8)</SelectItem>
                      <SelectItem value="utc+0">UTC (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you want to receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Task Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified about upcoming task deadlines</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Time Tracking Alerts</p>
                    <p className="text-sm text-muted-foreground">Reminders to start/stop time tracking</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Summary</p>
                    <p className="text-sm text-muted-foreground">Daily productivity summary emails</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Team Updates</p>
                    <p className="text-sm text-muted-foreground">Notifications about team activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Notification Methods</h4>
                
                <div className="space-y-2">
                  <Label>Email Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly summary</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize your interface appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Theme</Label>
                  <p className="text-sm text-muted-foreground mb-3">Choose your preferred theme</p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <div className="w-full h-16 bg-background border rounded mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-accent border-primary">
                      <div className="w-full h-16 bg-background border rounded mb-2"></div>
                      <p className="text-sm font-medium">Auto</p>
                    </div>
                    <div className="p-4 border rounded-lg cursor-pointer hover:bg-accent">
                      <div className="w-full h-16 bg-slate-900 border rounded mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Tracking Settings</CardTitle>
              <CardDescription>Configure your time tracking preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-stop inactive timers</p>
                    <p className="text-sm text-muted-foreground">Stop timers after period of inactivity</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>Inactivity timeout</Label>
                  <Select defaultValue="15">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 minutes</SelectItem>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default project</Label>
                  <Select defaultValue="none">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No default</SelectItem>
                      <SelectItem value="website">Website Redesign</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Round time entries</p>
                    <p className="text-sm text-muted-foreground">Round time to nearest 15 minutes</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Management</CardTitle>
                  <CardDescription>Manage team members and permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", email: "john@company.com", role: "Admin", status: "Active" },
                  { name: "Jane Smith", email: "jane@company.com", role: "Member", status: "Active" },
                  { name: "Mike Johnson", email: "mike@company.com", role: "Member", status: "Pending" },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{member.role}</Badge>
                      <Badge className={member.status === 'Active' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}>
                        {member.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}