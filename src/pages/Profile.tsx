import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Shield, Clock, Calendar } from "lucide-react";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    title: "Senior Developer",
    department: "Engineering",
    bio: "Passionate developer with 5 years of experience in web development.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    timezone: "PST",
    workingHours: {
      start: "09:00",
      end: "17:00"
    }
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    emailNotifications: true,
    weeklyReports: true,
    autoTracking: false
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileView 
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesView 
            preferences={preferences}
            setPreferences={setPreferences}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecurityView />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ProfileView({ profileData, setProfileData }: any) {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Profile Picture and Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-2xl">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{profileData.name}</h3>
            <p className="text-sm text-muted-foreground">{profileData.title}</p>
            <Badge variant="secondary" className="mt-1">{profileData.department}</Badge>
          </div>
          <Button variant="outline" size="sm">
            Change Photo
          </Button>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input 
                  id="title"
                  value={profileData.title}
                  onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={profileData.department} onValueChange={(value) => setProfileData({...profileData, department: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="HR">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Work Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={profileData.timezone} onValueChange={(value) => setProfileData({...profileData, timezone: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PST">Pacific Standard Time</SelectItem>
                    <SelectItem value="MST">Mountain Standard Time</SelectItem>
                    <SelectItem value="CST">Central Standard Time</SelectItem>
                    <SelectItem value="EST">Eastern Standard Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime"
                  type="time"
                  value={profileData.workingHours.start}
                  onChange={(e) => setProfileData({
                    ...profileData, 
                    workingHours: {...profileData.workingHours, start: e.target.value}
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime"
                  type="time"
                  value={profileData.workingHours.end}
                  onChange={(e) => setProfileData({
                    ...profileData, 
                    workingHours: {...profileData.workingHours, end: e.target.value}
                  })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}

function PreferencesView({ preferences, setPreferences }: any) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Enable dark theme for the application</p>
            </div>
            <Switch 
              checked={preferences.darkMode}
              onCheckedChange={(checked) => setPreferences({...preferences, darkMode: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive email updates for important events</p>
            </div>
            <Switch 
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => setPreferences({...preferences, emailNotifications: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Weekly Reports</h4>
              <p className="text-sm text-muted-foreground">Get weekly productivity reports via email</p>
            </div>
            <Switch 
              checked={preferences.weeklyReports}
              onCheckedChange={(checked) => setPreferences({...preferences, weeklyReports: checked})}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto Time Tracking</h4>
              <p className="text-sm text-muted-foreground">Automatically track time when working on tasks</p>
            </div>
            <Switch 
              checked={preferences.autoTracking}
              onCheckedChange={(checked) => setPreferences({...preferences, autoTracking: checked})}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SecurityView() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable 2FA</h4>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">Setup 2FA</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityView() {
  const mockActivity = [
    { id: 1, action: "Logged in", timestamp: "2024-01-15 09:30 AM", ip: "192.168.1.1" },
    { id: 2, action: "Updated profile", timestamp: "2024-01-14 02:15 PM", ip: "192.168.1.1" },
    { id: 3, action: "Created new project", timestamp: "2024-01-14 10:45 AM", ip: "192.168.1.1" },
    { id: 4, action: "Logged out", timestamp: "2024-01-13 06:00 PM", ip: "192.168.1.1" },
    { id: 5, action: "Password changed", timestamp: "2024-01-12 11:20 AM", ip: "192.168.1.1" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{activity.action}</h4>
                  <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                </div>
                <Badge variant="outline">{activity.ip}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
