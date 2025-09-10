import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUsers } from '@/hooks/useUsers';
import { Mail, Phone, Globe } from 'lucide-react';
import LoadingState from '@/components/shared/LoadingState';
import EmptyState from '@/components/shared/EmptyState';

export function Users() {
  const { users, isLoading } = useUsers();

  // Users list
  const renderUsers = users.map((user) => (
    <TableRow key={user.id}>
      <TableCell>
        <Badge variant="outline">{user.id}</Badge>
      </TableCell>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell>@{user.username}</TableCell>
      <TableCell>
        <div className="flex flex-col space-y-1 text-sm">
          <div className="flex items-center">
            <Mail className="h-3 w-3 mr-1" />
            {user.email}
          </div>
          <div className="flex items-center">
            <Phone className="h-3 w-3 mr-1" />
            {user.phone}
          </div>
          <div className="flex items-center">
            <Globe className="h-3 w-3 mr-1" />
            {user.website}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <p className="font-medium">{user.company.name}</p>
        <p className="text-xs text-muted-foreground">{user.company.catchPhrase}</p>
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <p>{user.address.city}</p>
          <p className="text-muted-foreground">
            {user.address.street}, {user.address.suite}
          </p>
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <header>
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-muted-foreground">View and manage registered users</p>
      </header>

      {/* Users table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading
                  ? <LoadingState loadingMessage="Loading users..." />
                  : users.length === 0
                    ? <EmptyState emptyMessage="No users found" />
                    : renderUsers}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
