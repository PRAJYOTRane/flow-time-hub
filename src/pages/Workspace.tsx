import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  UserPlus, 
  Download, 
  Search, 
  Filter,
  Shield,
  Clock,
  Activity,
  FileText,
  Mail
} from "lucide-react";

export default function Workspace() {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workspace</h1>
          <p className="text-muted-foreground">Manage your organization and view audit logs</p>
        </div>
      </div>

      <Tabs defaultValue="organization" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Audit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization">
          <OrganizationView 
            isInviteDialogOpen={isInviteDialogOpen}
            setIsInviteDialogOpen={setIsInviteDialogOpen}
            inviteEmail={inviteEmail}
            setInviteEmail={setInviteEmail}
            inviteRole={inviteRole}
            setInviteRole={setInviteRole}
          />
        </TabsContent>

        <TabsContent value="audit">
          <AuditView />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function OrganizationView({ 
  isInviteDialogOpen, 
  setIsInviteDialogOpen, 
  inviteEmail, 
  setInviteEmail, 
  inviteRole, 
  setInviteRole 
}: any) {
  const mockMembers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@company.com',
      role: 'Admin',
      avatar: '',
      status: 'active',
      lastActive: '2 min ago',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@company.com',
      role: 'Manager',
      avatar: '',
      status: 'active',
      lastActive: '1 hour ago',
      joinedDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'Member',
      avatar: '',
      status: 'away',
      lastActive: '3 hours ago',
      joinedDate: '2024-02-01'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      role: 'Member',
      avatar: '',
      status: 'active',
      lastActive: '30 min ago',
      joinedDate: '2024-02-10'
    }
  ];

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) return;
    
    // Handle invite logic here
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    
    // Reset form
    setInviteEmail('');
    setInviteRole('member');
    setIsInviteDialogOpen(false);
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'bg-red-500 text-white';
      case 'manager': return 'bg-blue-500 text-white';
      case 'member': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Invite Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Organization Members</h2>
          <p className="text-sm text-muted-foreground">{mockMembers.length} members</p>
        </div>
        
        <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select value={inviteRole} onValueChange={setInviteRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteMember}>
                <Mail className="w-4 h-4 mr-2" />
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search members..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[150px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="member">Member</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Members Grid */}
      <div className="grid gap-4">
        {mockMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className={getRoleColor(member.role)}>
                    {member.role}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm">Joined</p>
                    <p className="text-xs text-muted-foreground">{member.joinedDate}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Shield className="w-4 h-4 mr-2" />
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AuditView() {
  const mockAuditLogs = [
    {
      id: '1',
      action: 'Project Created',
      user: 'John Doe',
      target: 'Website Redesign Project',
      timestamp: '2024-07-30 14:30:25',
      details: 'Created new project with deadline 2024-08-15'
    },
    {
      id: '2',
      action: 'Task Assigned',
      user: 'Jane Smith',
      target: 'Design landing page mockups',
      timestamp: '2024-07-30 13:45:12',
      details: 'Assigned task to Mike Johnson'
    },
    {
      id: '3',
      action: 'Time Entry',
      user: 'Mike Johnson',
      target: 'User authentication system',
      timestamp: '2024-07-30 12:15:30',
      details: 'Logged 2.5 hours of work'
    },
    {
      id: '4',
      action: 'Member Invited',
      user: 'John Doe',
      target: 'sarah@company.com',
      timestamp: '2024-07-30 11:20:45',
      details: 'Invited new member with Manager role'
    },
    {
      id: '5',
      action: 'Project Status',
      user: 'Jane Smith',
      target: 'Mobile App Development',
      timestamp: '2024-07-30 10:30:18',
      details: 'Changed status from Planning to Active'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Export */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Audit Trail</h2>
          <p className="text-sm text-muted-foreground">Track all organization activities</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search audit logs..."
            className="pl-10"
          />
        </div>
        <Select defaultValue="all-actions">
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-actions">All Actions</SelectItem>
            <SelectItem value="project">Project Changes</SelectItem>
            <SelectItem value="task">Task Changes</SelectItem>
            <SelectItem value="member">Member Changes</SelectItem>
            <SelectItem value="time">Time Entries</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all-users">
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-users">All Users</SelectItem>
            <SelectItem value="john">John Doe</SelectItem>
            <SelectItem value="jane">Jane Smith</SelectItem>
            <SelectItem value="mike">Mike Johnson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{log.action}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {log.timestamp}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">{log.user}</span> • {log.target}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
