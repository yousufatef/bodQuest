import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    X,
    LogOut,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Posts', href: '/dashboard/posts', icon: FileText },
    { name: 'Users', href: '/dashboard/users', icon: Users },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        onClose();
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="lg:hidden"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={onClose}
                                className={cn(
                                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t p-4">
                    <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-primary-foreground">
                                {user?.username?.[0]?.toUpperCase()}
                            </span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{user?.username}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </>
    );
}