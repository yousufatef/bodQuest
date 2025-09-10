import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePosts } from '@/hooks/usePosts';
import { useUsers } from '@/hooks/useUsers';
import { FileText, Users, Activity, TrendingUp } from 'lucide-react';

export function Dashboard() {
    const { posts, pagination } = usePosts();
    const { users } = useUsers();

    const stats = [
        {
            title: 'Total Posts',
            value: pagination.total,
            icon: FileText,
            description: 'Published articles',
        },
        {
            title: 'Total Users',
            value: users.length,
            icon: Users,
            description: 'Registered users',
        },
        {
            title: 'Active Posts',
            value: posts.length,
            icon: Activity,
            description: 'Currently showing',
        },
        {
            title: 'Growth Rate',
            value: '12.5%',
            icon: TrendingUp,
            description: 'Monthly increase',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <Badge variant="secondary">Admin Panel</Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {posts.slice(0, 3).map((post) => (
                                <div key={post.id} className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                        <FileText className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">
                                            {post.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            by {post.user?.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Posts per User</span>
                                <Badge variant="outline">
                                    {users.length > 0 ? (pagination.total / users.length).toFixed(1) : 0}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Average Title Length</span>
                                <Badge variant="outline">
                                    {posts.length > 0
                                        ? Math.round(
                                            posts.reduce((acc, post) => acc + post.title.length, 0) /
                                            posts.length
                                        )
                                        : 0}{' '}
                                    chars
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm">System Status</span>
                                <Badge variant="secondary">Online</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}