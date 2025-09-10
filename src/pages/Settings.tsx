import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Shield, Database, Palette } from 'lucide-react';

export function Settings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <p className="text-muted-foreground">
                        Configure your application preferences
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">General Settings</CardTitle>
                        <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Application Name</span>
                            <Badge variant="secondary">Admin Panel</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Version</span>
                            <Badge variant="outline">1.0.0</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Environment</span>
                            <Badge variant="secondary">Development</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Security</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Authentication</span>
                            <Badge variant="secondary">JWT Mock</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Session Timeout</span>
                            <Badge variant="outline">30 min</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Protected Routes</span>
                            <Badge variant="secondary">Enabled</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">Data Source</CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">API Provider</span>
                            <Badge variant="secondary">JSONPlaceholder</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Connection Status</span>
                            <Badge variant="secondary">Connected</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Cache Strategy</span>
                            <Badge variant="outline">None</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">UI Preferences</CardTitle>
                        <Palette className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Theme</span>
                            <Badge variant="secondary">System</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Components</span>
                            <Badge variant="outline">shadcn/ui</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Responsive Design</span>
                            <Badge variant="secondary">Enabled</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}